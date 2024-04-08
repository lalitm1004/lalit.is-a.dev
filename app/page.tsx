import Link from "next/link";

export default function Home() {
  return (
    <div className={`flex justify-center items-center overflow-hidden h-screen w-screen bg-ping-black`}>
      <div className={`flex flex-col justify-center items-center bg-tv-black h-[200px] w-[400px] rounded-xl`}>
        <div className={`h-full flex flex-shrink items-center bg-gradient-to-r from-tv-light-blue to-tv-light-pink bg-clip-text text-transparent`}>
          <p className={`text-9xl font-chintzy-semibold`}>lalit</p>
        </div>
        <div className={`flex justify-between items-center w-full text-ping-white px-4 pb-5`}>
          <Link href={"/projects/coin"} className={`hover:border-b-2 h-[20px]`}>coin</Link>
          <Link href={"/projects/mori"} className={`hover:border-b-2 h-[20px]`}>mori</Link>
        </div>
      </div>
    </div>
  )
}