"use client"
import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useModalStore } from "@/store/ModalStore"
import { useBoardStore } from "@/store/BoardStore"
import { relative } from "path"
type Props = {}

const Modal = (props: Props) => {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ])
  const [newTaskInput, setNewTaskInput] = useBoardStore((state) => [
    state.newTaskInput,
    state.setNewTaskInput,
  ])
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="form" className={"relative z-10"} onClose={closeModal}>
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
        <div className="fixed inset-0 overflow-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newTaskInput}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
