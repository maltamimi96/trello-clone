import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoCard from "./TodoCard"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useBoardStore } from "@/store/BoardStore"
import { useModalStore } from "@/store/ModalStore"

type Props = {
  id: TypedColumn
  todos: Todo[]
  index: number
}

const idToColumnText: {
  [key in TypedColumn]: string
} = { todo: "ToDo", inprogress: "In Progress", done: "Done" }

const Column = ({ id, todos, index }: Props) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ])
  const [openModal] = useModalStore((state) => [state.openModal])
  const handleAddTodo = () => {
    setNewTaskType(id)
    openModal()
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver
                    ? "bg-green-200 dark:bg-gray-400"
                    : "bg-white/50 dark:bg-gray-600"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}>
                <h2 className="flex justify-between  tracking-widest md:ml-4 text-xl dark:text-gray-200 mb-2 ">
                  {idToColumnText[id]}
                  <span className="text-gray-500   dark:text-red-500    text-sm font-semibold">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2 ">
                  {todos.length < 1 ? (
                    <div className="text-gray-500 dark:text-gray-300 text-center text-xl tracking-widest">
                      No tasks
                    </div>
                  ) : (
                    todos.map((todo, index) => {
                      if (
                        searchString &&
                        todo.title
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      ) {
                        return null
                      }

                      return (
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}>
                          {(provided) => (
                            <TodoCard
                              todo={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      )
                    })
                  )}
                  <div>
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={handleAddTodo}>
                      <PlusCircleIcon className="w-10 h-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column
