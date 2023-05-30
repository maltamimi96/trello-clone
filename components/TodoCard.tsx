"use client"
import { XCircleIcon } from "@heroicons/react/24/solid"
import React, { useState, useEffect } from "react"
import { useBoardStore } from "@/store/BoardStore"
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd"
import getUrl from "@/lib/getUrl"
import Image from "next/image"
import { storage } from "@/appwrite"
type Props = {
  todo: Todo
  index: number
  id: TypedColumn
  innerRef: (element: HTMLElement | null) => void
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

const TodoCard = ({
  todo,
  index,
  innerRef,
  id,
  draggableProps,
  dragHandleProps,
}: Props) => {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const { image } = todo
        if (!image) return
        const url = await getUrl(JSON.parse(image!))
        console.log("url", url)
        if (url) setImageUrl(url.toString())
      }

      fetchImage()
    }
  }, [todo])

  return (
    <div
      className="bg-white rounded-sm space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className="flex justify-between items-center p-5 rounded-sm">
        <p className="font-semibold text-sm  ">{todo.title}</p>
        <button className="" onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className="ml-5 w-8 h-8 text-red-500 hover:text-red-600" />
        </button>
      </div>

      {/* // goes here */}
      {imageUrl && (
        <div className=" w-full h-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-sm"
          />
        </div>
      )}
    </div>
  )
}

export default TodoCard
