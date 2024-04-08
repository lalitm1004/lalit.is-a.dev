"use client";

import { useEffect, useState } from "react";

export default function Coin() {

  const [isTails, setIsTails] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  useEffect(() => {
    if (isFlipping) {
      setTimeout(() => {
        setIsFlipping(false);
      }, 1000)
    }
  }, [isFlipping])

  return (
    <div className={`h-screen w-screen bg-ping-blacker flex justify-center items-center`}>
      <div className={`h-[90%] lg:w-[30%] w-[90%] bg-ping-black border-2 border-neutral-800 rounded-xl flex flex-col`}>
        <div className={`bg-gradient-to-br from-ping-red to-ping-yellow bg-clip-text text-transparent`}>
          <h1 className={`text-center text-5xl lg:text-6xl mt-4 font-chintzy-semibold`}>{"{"} Coin Flip {"}"}</h1>
        </div>

        <div className={`flex flex-grow justify-center items-center text-ping-white font-chintzy-regular text-4xl`}>
          <p>
            {isFlipping ? ("flipping...") : (isTails ? "Tails" : "Heads")}
          </p>
        </div>

        <div className={`flex justify-center items-center py-4`}>
          <div className={`${!isFlipping && "hover:opacity-80 active:opacity-70"} flex justify-center items-center font-chintzy-semibold text-3xl`}>
            <button
              disabled={isFlipping}
              onClick={() => {setIsTails(false); setIsFlipping(true)}}
              className={`bg-ping-gray w-[100px] h-[90px] text-transparent rounded-l-lg disabled:opacity-60`}
              >
              flip
            </button>

            <button
              disabled={isFlipping}
              onClick={() => {setIsTails(Math.floor(Math.random() * 2) === 0); setIsFlipping(true)}}
              className={`bg-ping-gray w-[100px] h-[90px] disabled:opacity-60`}
              >
                Flip
            </button>

            <button
              disabled={isFlipping}
              onClick={() => {setIsTails(true); setIsFlipping(true)}}
              className={`bg-ping-gray w-[100px] h-[90px] text-transparent rounded-r-lg disabled:opacity-60`}
            >
              flip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}