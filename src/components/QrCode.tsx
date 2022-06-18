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
import PageHeading from "./PageHeading";
import BackLink from "./BackLink";
import { FC, useCallback, useState } from "react";

interface Props {
  usdcAmount: string;
  tokenAmount: string;
}

export const QrCode: FC<Props> = ({ usdcAmount, tokenAmount }) => {
  console.log("USDC", usdcAmount);
  console.log("Token", tokenAmount);

  // Show the QR code
  const searchParams = new URLSearchParams();
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  searchParams.append("reference", reference.toString());
  searchParams.append("USDC", usdcAmount.toString());
  searchParams.append("Token", tokenAmount.toString());

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
      {/* <BackLink href="/test">Cancel</BackLink> */}
      {/* <PageHeading>Checkout {}</PageHeading> */}
      <div ref={qrRef} />
    </div>
  );
};
