import { FC, useCallback, useState, useRef } from "react";

interface Props {
  submitTarget: string;
  setUsdcAmount: (string) => void;
  setTokenAmount: (string) => void;
}

export const Checkout: FC<Props> = ({
  submitTarget,
  setUsdcAmount,
  setTokenAmount,
}) => {
  // const formRef = useRef<HTMLFormElement>(null);

  // const onClick = useCallback(async (form) => {
  //   submitTarget;
  // });

  return (
    // <form method="get" action={submitTarget}>
    <div className="my-6">
      <input
        type="number"
        className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="USDC"
        onChange={(e) => setUsdcAmount(e.target.value)}
      />
      <input
        type="number"
        className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Reward Token"
        onChange={(e) => setTokenAmount(e.target.value)}
      />

      {/* <button className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ...">
        <span>Pay</span>
      </button> */}
    </div>
    // </form>
  );
};
