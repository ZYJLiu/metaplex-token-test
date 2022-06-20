import { FC, useState, useEffect } from "react";
import { Checkout } from "../../components/Mint";
import { QrCode } from "../../components/QrCodeNft";
import { useWallet } from "@solana/wallet-adapter-react";

export const MintView: FC = ({}) => {
  const { publicKey } = useWallet();
  const [wallet, setWallet] = useState("");
  const [checkout, setCheckout] = useState(false);

  console.log(checkout);
  // console.log("USDC", usdcAmount);
  // console.log("Token", tokenAmount);

  useEffect(() => {
    if (publicKey) {
      setWallet(publicKey.toString());
    }
  }, [publicKey]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Checkout
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          {checkout ? (
            <QrCode wallet={wallet} setCheckout={setCheckout} />
          ) : (
            <Checkout
              // submitTarget="/checkout"
              setCheckout={setCheckout}
              setWallet={setWallet}
              publickey={publicKey}
            />
          )}
        </div>
      </div>
    </div>
  );
};
