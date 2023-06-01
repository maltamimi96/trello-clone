"use client"
import { XCircleIcon } from "@heroicons/react/24/solid"
import React, { useState, useEffect } from "react"
import { useBoardStore } from "@/store/BoardStore"
import { useUpdateModalStore } from "@/store/UpdateModalStore"

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd"
import getUrl from "@/lib/getUrl"
import Image from "next/image"
import { storage } from "@/appwrite"
import UpdateModal from "./UpdateModal"
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
  const [openModal, closeModal] = useUpdateModalStore((state) => [
    state.openModal,
    state.closeModal,
  ])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [bucketId, setBucketID] = useState<string>("")

  const [fileId, setFileId] = useState<string>("")

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const { image } = todo
        if (!image) return
        const url = await getUrl(JSON.parse(image!))
        setBucketID(JSON.parse(image!).bucketId)
        setFileId(JSON.parse(image!).fileId)
        console.log("url", url)
        if (url) setImageUrl(url.toString())
      }

      fetchImage()
    }
  }, [todo])
  return (
    <div
      className="bg-white dark:bg-gray-900 dark:text-cyan-500  rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className="flex justify-between items-center p-5 rounded-sm">
        <p className="font-semibold text-sm bg  ">
          <button className="hover:scale-105 " onClick={openModal}>
            {todo.title}
          </button>
        </p>

        <button
          className=""
          onClick={() => deleteTask(index, todo, id, bucketId, fileId)}>
          <XCircleIcon className="ml-5 w-8 h-8 text-red-500 hover:text-red-600" />
        </button>
      </div>

      {/* // goes here */}
      {imageUrl && (
        <div className=" w-full h-full  rounded-b-md">
          <Image
            src={imageUrl}
            alt="task image"
            width={400}
            height={100}
            className="w-full object-contain rounded-b-sm"
          />
        </div>
      )}
      <UpdateModal todo={todo} tdImg={imageUrl} />
    </div>
  )
}

export default TodoCard
