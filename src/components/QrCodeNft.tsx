import type { NextPage } from "next";
import Head from "next/head";
import { MintView } from "../views";
import { useEffect, useMemo, useRef } from "react";

import {
  createQR,
  createQROptions,
  encodeURL,
  TransferRequestURLFields,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
  TransactionRequestURLFields,
} from "@solana/pay";

import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import PageHeading from "./PageHeading";
import BackLink from "./BackLink";
import { FC, useCallback, useState } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import BigNumber from "bignumber.js";

import { usdcAddress } from "../lib/addresses";

import { useRouter } from "next/router";

interface Props {
  wallet: string;
  setWallet: (string) => void;
}

export const QrCode: FC<Props> = ({ wallet, setWallet }) => {
  const router = useRouter();

  // Get a connection to Solana devnet
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);
  const { publicKey } = useWallet();

  //QR code
  const searchParams = new URLSearchParams();

  if (publicKey) {
    searchParams.append("wallet", publicKey.toString());
    console.log("QR pubkey", publicKey.toString());
  } else {
    searchParams.append("wallet", wallet.toString());
    console.log("QR wallet", wallet.toString());
  }

  const reference = useMemo(() => Keypair.generate().publicKey, []);
  searchParams.append("reference", reference.toString());

  const [size, setSize] = useState(() =>
    typeof window === "undefined"
      ? 400
      : Math.min(window.screen.availWidth - 10, 512)
  );
  useEffect(() => {
    const listener = () =>
      setSize(Math.min(window.screen.availWidth - 10, 512));

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { location } = window;
    const apiUrl = `${location.protocol}//${
      location.host
    }/api/makeTransactionNft?${searchParams.toString()}`;
    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl), // testing placeholder
      label: "Test",
      message: "Test Message",
    };
    const solanaUrl = encodeURL(urlParams);
    const qr = createQR(solanaUrl, size, "white");

    qrRef.current.innerHTML = "";
    qr.append(qrRef.current);
  });

  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        });
        // // Validate that the transaction has the expected recipient, amount and SPL token
        // await validateTransfer(
        //   connection,
        //   signatureInfo.signature,
        //   {
        //     recipient: new PublicKey(wallet),
        //     amount: new BigNumber(0),
        //     splToken: usdcAddress,
        //     reference,
        //   },
        //   { commitment: "confirmed" }
        // );
        router.push("/confirmedNft");
        // console.log("confirmed");
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return;
        }
        if (e instanceof ValidateTransferError) {
          // Transaction is invalid
          console.error("Transaction is invalid", e);
          return;
        }
        console.error("Unknown error", e);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      {/* <BackLink href="/SolanaPay">Cancel</BackLink> */}
      {/* <PageHeading>Checkout {}</PageHeading> */}
      <div ref={qrRef} />
      <button
        className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={async () => setWallet("")}
      >
        <span> Cancel </span>
      </button>
    </div>
  );
};
