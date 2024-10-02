'use client'
import PercentComplete from "./PercentComplete.js";
import Calendar from "./calendar.js"

export default function Home() {
  return (
    <main className="">
      <div className="h-screen flex flex-col items-center">
        <Calendar/>
      </div>
    </main>
  );
}