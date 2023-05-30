import Board from "@/components/Board"
import Header from "@/components/Header"
import Image from "next/image"

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="px-2 md:p-0">
        <Board />
      </div>
    </main>
  )
}
