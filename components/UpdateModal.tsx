"use client"
import { useState, Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useModalStore } from "@/store/ModalStore"
import { useBoardStore } from "@/store/BoardStore"
import TaskTypeRadioGroup from "./TaskTypeRadioGroup"
import Image from "next/image"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { useUpdateModalStore } from "@/store/UpdateModalStore"
type Props = {
  todo: Todo
  tdImg: string | null
}

const UpdateModal = ({ todo, tdImg }: Props) => {
  const [isOpen, closeModal] = useUpdateModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ])
  const [newTaskInput, setNewTaskInput, image, setImage, addTask, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.addTask,
      state.newTaskType,
    ])
  const imagePickerRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newTaskInput) return
    addTask(newTaskInput, newTaskType, image)
    setImage(null)
    closeModal()
  }
  const handleCancel = () => {
    newTaskInput && setNewTaskInput("")
    setImage(null)
    closeModal()
  }
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className={"relative z-10"}
        onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-auto  ">
          <div className="flex min-h-full items-center justify-center p-6 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-700 dark:text-red-500 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className={"text-md font-medium leading-6 text-gray-900"}>
                  Add New Task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter Task Name..."
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm  dark:bg-gray-600 placeholder:dark:text-gray-300 active:dark:bg-gray-600 dark:text-red-400 appearance-none focus:outline-none active:outline-none focus:ring-1 focus:ring-blue-500 focus:border-m sm:text-sm"
                    value={todo.title}
                  />
                </div>
                <TaskTypeRadioGroup />
                <div className="mt-4">
                  {image && (
                    <Image
                      src={URL.createObjectURL(image!) || todo.image!}
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter
                  hover:grayscale transition-all duration-150 cursor-not-allowed"
                      alt="uploaded-image"
                      onClick={() => setImage(null)}
                    />
                  )}
                  {tdImg && !image && (
                    <Image
                      src={tdImg!}
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter
                  hover:grayscale transition-all duration-150 cursor-not-allowed"
                      alt="uploaded-image"
                      onClick={() => setImage(null)}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => imagePickerRef.current?.click()}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    <PhotoIcon className="w-6 h-6 inline-block mr-2 text-gray-600" />
                    Upload Image
                  </button>
                  <input
                    type="file"
                    hidden
                    ref={imagePickerRef}
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return

                      setImage(e.target.files![0])
                    }}
                  />
                </div>
                <div className="mt-4 space-x-2">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-800  px-4 py-2 text-sm dark:text-red-500 font-semibold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-slate-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                    Update Task
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm dark:text-cyan-500 font-semibold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-slate-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateModal
