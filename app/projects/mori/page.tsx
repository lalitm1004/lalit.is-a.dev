"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { MoriProgress } from "@/components/mori/ui/moriProgress";
import { MoriInput } from "@/components/mori/ui/moriInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skull } from "lucide-react";
import Link from "next/link";
import Calendar from "@/components/mori/ui/calendar";

export default function Mori() {

  const [input, setInput] = useState<string>("");
  const [validInput, setValidInput] = useState<boolean | null>(null);

  const [weeksLived, setWeeksLived] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [allRects, setAllRects] = useState<HTMLCollectionOf<SVGRectElement> | null>(null);

  useEffect(() => {
    const allRects = document.getElementsByTagName("rect");
    setAllRects(allRects);
  }, [])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkValidity = (dateString: string): boolean | null => {
      const dateFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

      if (!dateFormat.test(dateString)) {
        return (validInput === null) ? null : false;
      }

      let [, day, month, year] = dateString.match(dateFormat)!;
      day = parseInt(day, 10).toString();
      month = parseInt(month, 10).toString();
      year = parseInt(year, 10).toString();

      if (day === "0" || month === "0") {
        return null;
      }

      const today = new Date();
      if (parseInt(year, 10) > today.getFullYear()) {
        return null;
      }

      if (parseInt(year, 10) === today.getFullYear()) {
        if (parseInt(month, 10) > today.getMonth() + 1) {
          return null;
        } else if (parseInt(month, 10) === today.getMonth() + 1) {
          if (parseInt(day, 10) > today.getDate()) {
            return null;
          }
        }
      }

      if (parseInt(year, 10) < today.getFullYear() - 79) {
        return null;
      }

      const daysInMonth = new Date(parseInt(year, 10), parseInt(month, 10), 0).getDate();
      if (parseInt(day, 10) > daysInMonth) {
        return null;
      }
      return true;
    }
    setInput(event.target.value)
    setValidInput(checkValidity(event.target.value))
  }

  const handleClick = () => {
    const weeksPassedSince = (dateString: string): number => {
      const [day, month, year] = dateString.split("/").map(part => parseInt(part, 10))
      const inputDate = new Date(year, month-1, day);
      const differenceMs = Date.now() - inputDate.getTime();
      const weeksPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 7));
      return weeksPassed;
    }

    setShowProgress(true);
    setWeeksLived(0);
    setTimeout(() => setWeeksLived(weeksPassedSince(input)), 1);
  }

  useEffect(() => {

    const setCalendar = (weeksLived: number) => {
      if (allRects) {
        for (let i = 0; i < allRects.length; i++)
          allRects![i].style.fill = "#EBE7B8";

        for (let i = 0; i < weeksLived; i++) {
          const rect = allRects[i];
          rect.style.fill = "#000000";
        }
        setProgress(weeksLived);
      }
    }

    (async () => {
      const stepSize = 8;
      for (let i = 0; i <= weeksLived; i += ((weeksLived - i > stepSize) ? stepSize : 1)) {
        await new Promise(r => setTimeout(r, 1));
        setCalendar(i);
        setProgress(i);
      }
    })();
  }, [weeksLived])

  return (
    <div className={`w-full overflow-x-hidden bg-mori-cream font-khojki`}>
      <div className={`flex flex-col justify-center items-center`}>
        <h1 className={`text-7xl text-center mb-5 mt-5`}>Memento Mori</h1>
        <motion.div
            className="sex w-full flex flex-col justify-center items-center"
            animate={{
              scaleY: [0.2 , (showProgress) ? 1 : 0.2],
              translateY: (showProgress) ? [0, 5] : [0]
            }}
            transition={{
              ease: "easeInOut"
            }}
          >
            <MoriProgress
              className="w-[75%] md:w-[40%] h-[10px]"
              value={(showProgress) ? progress / (52 * 80) * 100 : 100}
            />
          </motion.div>
          <motion.div
              className={`w-[75%] md:w-[40%] px-1 flex justify-between`}
              animate={{
                translateY: (showProgress) ? [0,5] : [0]
              }}
              transition={{
                ease: "easeInOut"
              }}
            >
              <div className={`w-1/3 flex justify-center items-center`}>
                <Link href={"/projects/mori/year"} className="opacity-85 hover:opacity-50">Year</Link>
              </div>
              <div className={`w-1/3 flex justify-center items-center`}>
                <Link href={"https://github.com/lalitm1004/lalit.is-a.dev"} target="_blank" className="opacity-85 hover:opacity-50">Github</Link>
              </div>
          </motion.div>
      </div>

      <motion.div
        className={`w-full flex flex-row justify-center items-center mt-4`}
        initial={{translateX: 56/2}}
        animate={{
          translateX: (validInput) ? [56/2, 0] : ((validInput == null) ? [56/2] : [0, 56/2])
        }}
      >
        <div className="flex h-full flex-col items-center">
          <Label htmlFor="birthday" className='text-left w-full ml-2 mb-1'>Enter your birthday</Label>
          <MoriInput
            id="birthday"
            className="h-[65px] w-[200px] z-20 bg-mori-cream opacity-100 border border-black mr-2 text-xl"
            placeholder="DD/MM/YYYY"
            onChange={handleInput}
          />
        </div>
        <motion.div
            className="border mt-[16px] h-full border-black rounded-full z-10"
            initial={{translateX: -70}}
            animate={{
              translateX: (validInput) ? [-70, 0] : ((validInput == null) ? [-70] : [0, -70])
            }}
          >
            <Button
              id="submit-button"
              className="bg-inherit h-[56px] w-[56px] hover:bg-inherit hover:opacity-30 active:opacity-20 flex justify-center items-center"
              onClick={handleClick}
              disabled={(progress !== 0) && (progress !== weeksLived)}
            >
              <Skull color="#000000"/>
            </Button>
          </motion.div>
      </motion.div>
      <div className={`flex justify-center w-full`}>
        <Calendar />
      </div>
    </div>
  )
}