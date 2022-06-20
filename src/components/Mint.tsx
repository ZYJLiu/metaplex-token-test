import { FC, useCallback, useState, useRef } from "react";
import { PublicKey } from "@solana/web3.js";

interface Props {
  // submitTarget: string;
  // setCheckout: (string) => void;
  setWallet: (string) => void;
  publickey: PublicKey;
}

export const Checkout: FC<Props> = ({ setWallet, publickey }) => {
  const [address, setAddress] = useState(null);

  return (
    <div className="my-6">
      {publickey ? (
        <div />
      ) : (
        <input
          type="string"
          className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Wallet Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      )}

      <button
        className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={() => setWallet(address)}
      >
        <span>Mint</span>
      </button>
    </div>
  );
};
