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

import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import PageHeading from "../components/PageHeading";
import BackLink from "../components/BackLink";
import { useRouter } from "next/router";

interface Props {
  usdcAmount: number;
  tokenAmount: number;
}

const Test: NextPage = (props) => {
  // console.log(usdcAmount);
  // console.log(tokenAmount);

  // Show the QR code
  const searchParams = new URLSearchParams();
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  searchParams.append("reference", reference.toString());

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

  const qrRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col items-center gap-8">
      <BackLink href="/test">Cancel</BackLink>
      <PageHeading>Checkout {}</PageHeading>
      <div ref={qrRef} />
    </div>
  );
};

export default Test;
