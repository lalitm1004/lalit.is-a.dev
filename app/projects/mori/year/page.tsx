"use client";
import { useEffect, useState } from "react"

export default function Year() {
  
  const [msPassed, setMsPassed] = useState<number | null>(null);
  const [msTotal, setMsTotal] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const currentDate = new Date().getTime();
    const startOfYear = new Date(currentYear, 0, 1).getTime();
    setMsPassed(currentDate - startOfYear);

    const nextYear = currentYear + 1;
    const endOfYear = new Date(nextYear, 0, 1).getTime();
    setMsTotal(endOfYear - startOfYear);
  }, [])

  useEffect(() => {
    if (msPassed && msTotal) {
        const updateIntervalMs = 1;
        const intervalId = setInterval(() => {
          setPercentage((msPassed / msTotal) * 100)
          setMsPassed(prev => prev! + updateIntervalMs);
        }, updateIntervalMs)
        return () => clearInterval(intervalId);
    }
  }, [msPassed, msTotal])

  return (
    <main>
      <div className={`bg-mori-cream font-khojki w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-2 text-xl`}>
        <p>The year is</p>
        <p className={`${percentage ? "text-left" : "text-center"} w-[200px]`}>{(percentage) ? percentage : "----------"}</p>
        <p>% over</p>
      </div>  
    </main>
  )    
}