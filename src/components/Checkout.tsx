import { FC, useCallback, useState, useRef } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

interface Props {
  submitTarget: string;
}

export const Checkout: FC<Props> = ({ submitTarget }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [decimals, setDecimals] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  // const onClick = useCallback(async (form) => {
  //   submitTarget;
  // });

  return (
    <form method="get" action={submitTarget} ref={formRef}>
      <div className="my-6">
        <input
          type="number"
          className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="USDC"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Reward Token"
          onChange={(e) => setDecimals(e.target.value)}
        />

        <button
          className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
          onClick={() =>
            // onClick({
            //   decimals: Number(decimals),
            //   amount: Number(amount),
            // })
            submitTarget
          }
        >
          <span>Pay</span>
        </button>
      </div>
    </form>
  );
};
