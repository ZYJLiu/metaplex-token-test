import { Nft } from "@metaplex-foundation/js";
import type { NextPage } from "next";
import Head from "next/head";
import { NftView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Solana Scaffold" />
      </Head>
      <NftView />
    </div>
  );
};

export default Home;
