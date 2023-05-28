"use client"
import { XCircleIcon } from "@heroicons/react/24/solid"
import React from "react"
import { useBoardStore } from "@/store/BoardStore"
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd"

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
    </div>
  )
}

export default TodoCard
