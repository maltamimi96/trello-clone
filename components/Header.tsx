import Image from "next/image"
import React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
type Props = {}

const Header = (props: Props) => {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-xl">
        <Image
          src="http://links.papareact.com/c2cdd5"
          alt="Trello logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex">
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6  text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 rounded-md p-2 outline-none"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header
