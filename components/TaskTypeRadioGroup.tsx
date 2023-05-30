"use client"
import React from "react"
import { RadioGroup } from "@headlessui/react"
import { useBoardStore } from "@/store/BoardStore"
import { CheckIcon } from "@heroicons/react/24/solid"
type Props = {}

const types = [
  {
    id: "todo",
    name: "To Do",
    color: "bg-red-400",
    description: "A new task to complete",
  },
  {
    id: "inprogress",
    name: "In Progress",
    color: "bg-yellow-500",
    description: "A  task being worked on",
  },
  {
    id: "done",
    name: "done",
    color: "bg-green-500",
    description: "A  task completed",
  },
]
const TaskTypeRadioGroup = (props: Props) => {
  const [setNewTaskType, newTaskType] = useBoardStore((state) => [
    state.setNewTaskType,
    state.newTaskType,
  ])
  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newTaskType}
          onChange={(e) => {
            setNewTaskType(e)
          }}>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `active:border-none transition ease-in-out duration-200 ${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-sky-300  ring-white ring-opacity-60 active:border-none transition ease-in-out duration-200"
                      : ""
                  }
                            ${
                              checked
                                ? `${type.color} "bg-opacity-75 text-white active:border-none transition ease-in-out duration-200"`
                                : "bg-white active:border-none transition ease-in-out duration-200"
                            }
                            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none active:border-none transition ease-in-out duration-200`
                }>
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}>
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}>
                            <span>{type.description}</span>{" "}
                          </RadioGroup.Description>
                        </div>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default TaskTypeRadioGroup
