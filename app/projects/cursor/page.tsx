"use client";
import { MoveUp } from "lucide-react";
import { useEffect } from "react";

export default function Cursor() {

  const rowCount = 15;
  const columnCount = 35;
  const grid: Array<Array<null>> = Array(rowCount).fill(Array(columnCount).fill(null))
  const boxDimensionPx = 40;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
          const cell = document.getElementById(`cell-${i}-${j}`)!.children[0] as HTMLElement;

          const cellRect = cell.getBoundingClientRect();
          const cellCenterX = cellRect.left + cellRect.width / 2;
          const cellCenterY = cellRect.top + cellRect.width / 2;

          const angle = Math.atan2((mouseY - cellCenterY), (mouseX - cellCenterX)) * 180 / Math.PI;
          cell.style.transform = `rotate(${90 + angle}deg)`;
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`w-screen h-screen bg-tv-black flex justify-center items-center `}>
      <div className={`parent-container flex flex-col gap-4 justify-center items-center`}>
        {grid.map((rowValue, rowIndex) => (
          <div key={rowIndex} className={`flex gap-4`}>
            {rowValue.map((cellValue, cellIndex) => (
              <div
                key={cellIndex} id={`cell-${rowIndex}-${cellIndex}`}
                className={`h-[${boxDimensionPx}px] w-[${boxDimensionPx}px]`}
              >
                <MoveUp color="#E7E8E9"/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}