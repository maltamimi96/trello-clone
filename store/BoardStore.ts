import { databeses } from "@/appwrite"
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumns"
import { create } from "zustand"
interface BoardState {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void
  searchString: string
  setSearchString: (searchString: string) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  getBoard: async () => {
    const board = await getTodosGroupedByColumns()
    set({ board })
  },
  searchString: "",
  setSearchString: (searchString: string) => set({ searchString }),

  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  setBoardState: (board: Board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databeses.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: columnId }
    )
  },
}))
