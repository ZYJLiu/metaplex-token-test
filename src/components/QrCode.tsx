import type { NextPage } from "next";
import Head from "next/head";
import { SolanaPayView } from "../views";
import { useEffect, useMemo, useRef } from "react";

import {
  createQR,
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

import BigNumber from "bignumber.js";

import { usdcAddress } from "../lib/addresses";

import { useRouter } from "next/router";

interface Props {
  usdcAmount: string;
  tokenAmount: string;
}

export const QrCode: FC<Props> = ({ usdcAmount, tokenAmount }) => {
  console.log("USDC", usdcAmount);
  console.log("Token", tokenAmount);

  const router = useRouter();

  // Get a connection to Solana devnet
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);

  // Show the QR code
  const searchParams = new URLSearchParams();
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  searchParams.append("reference", reference.toString());
  searchParams.append("USDC", usdcAmount.toString());
  searchParams.append("Token", tokenAmount.toString());

  //test placeholder
  const publicKey = new PublicKey(
    "4B65V1ySBG35UbStDTUDvBTXRfxh6v5tRbLnVrVLpYD2"
  );

  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { location } = window;
    const apiUrl = `${location.protocol}//${
      location.host
    }/api/makeTransaction?${searchParams.toString()}`;
    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl), // testing placeholder
      label: "Test",
      message: "Test Message",
    };
    const solanaUrl = encodeURL(urlParams);
    const qr = createQR(solanaUrl, 512, "white");

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
        // Validate that the transaction has the expected recipient, amount and SPL token
        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: publicKey,
            amount: new BigNumber(usdcAmount),
            splToken: usdcAddress,
            reference,
          },
          { commitment: "confirmed" }
        );
        console.log("confirmed");
        router.push("/confirmed");
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
    <div className="flex flex-col items-center gap-8">
      {/* <BackLink href="/test">Cancel</BackLink> */}
      {/* <PageHeading>Checkout {}</PageHeading> */}
      <div ref={qrRef} />
    </div>
  );
};
