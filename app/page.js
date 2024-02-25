"use client";
import { motion, useAnimate } from "framer-motion";
import localfont from "next/font/local";
import { useEffect, useState } from "react";

const GothamUltra = localfont({
  src: "../public/fonts/GothamUltra.otf"
});

export default function Home() {

  const [scope, animate] = useAnimate();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setLoading(false);
  }, [])

  useEffect(() => {
    if (!loading) {

      animate(
        ".title",
        { x: [width, 0] },
        { duration: 0.5, ease: "easeInOut"}
      );

      animate(
        ".links",
        { opacity: [0, 100] },
        { duration: 0.5, delay: 0.5, ease: "easeInOut" }
      )

    }
  }, [loading])

  return (
    <main>
      <div ref={scope} className={`h-screen w-screen bg-off-black flex justify-center items-center overflow-hidden`}>
        <motion.div
          className={`${loading && "opacity-0"} title`}
        >
          <div>
            <div className="bg-gradient-to-l from-tvgirl-lightpink to-tvgirl-lightblue p-10 rounded-xl shadow-xl shadow-off-gray">
                <p className={`${GothamUltra.className} text-9xl`}>
                  Lalit
                </p>
            </div>
            <motion.div
              className="links w-full flex justify-around my-8 text-off-gray"
            >
              <a
                className="hover:text-off-white underline underline-offset-[2px] transition delay-10"
                target="_current"
                href="/projects"
              >
                Projects
              </a>
              <a 
                className="hover:text-off-white underline underline-offset-[2px] transition delay-10"
                target="_blank"
                href="https://github.com/lalitm1004"
              >
                Github
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}