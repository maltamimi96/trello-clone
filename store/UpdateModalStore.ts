import { create } from "zustand"

interface UpdateModalState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}
export const useUpdateModalStore = create<UpdateModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
