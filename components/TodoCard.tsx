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
        const url = await getUrl(todo.image)

        setImageUrl(url.toString())
      }
      fetchImage()
    }
  }, [todo.image])

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
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt="task image"
            width={100}
            height={100}
            className="object-contain w-full rounded-b-sm"
          />
        </div>
      )}
    </div>
  )
}

export default TodoCard
