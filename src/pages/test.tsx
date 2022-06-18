import type { NextPage } from "next";
import Head from "next/head";
import { SolanaPayView } from "../views";

const SolanaPay: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Solana Scaffold" />
      </Head>
      <SolanaPayView />
    </div>
  );
};

export default SolanaPay;
