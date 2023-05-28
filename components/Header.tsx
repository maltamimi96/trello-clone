"use client"
import Image from "next/image"
import React from "react"
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Avatar from "react-avatar"
import { useBoardStore } from "@/store/BoardStore"
type Props = {}

const Header = (props: Props) => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ])
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-xl">
        <div
          className="absolute top-0 left-0 h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter
        blur-3xl opacity-50 w-full -z-50"
        />
        <Image
          src="http://links.papareact.com/c2cdd5"
          alt="Trello logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6  text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 rounded-md p-2 outline-none"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Mohammad" round color="#0055D1" size="50" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm bg-white  max-w-3xl italic drop-shadow-lg rounded-full px-4 py-2 ">
          <UserCircleIcon className="inline-block h-10 w-10  text-[#0055D1] mr-1" />
          gpt is summarizing your tasks....
        </p>
      </div>
    </header>
  )
}

export default Header
