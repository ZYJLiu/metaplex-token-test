import type { NextPage } from "next";
import Head from "next/head";
import { TestView } from "../views";

const Test: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Solana Scaffold" />
      </Head>
      <TestView />
    </div>
  );
};

export default Test;
