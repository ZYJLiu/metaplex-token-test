import { FC } from "react";
import { Checkout } from "../../components/Checkout";

export const TestView: FC = ({}) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Checkout
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <Checkout submitTarget="/checkout" />
          {/* <SendTransaction /> */}
        </div>
      </div>
    </div>
  );
};
