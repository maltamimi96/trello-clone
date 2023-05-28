import { databeses, storage } from "@/appwrite"
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumns"
import { get } from "http"
import { create } from "zustand"
interface BoardState {
  board: Board
  newTaskInput: string
  searchString: string
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void
  setSearchString: (searchString: string) => void
  setNewTaskInput: (input: string) => void
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
  getBoard: async () => {
    const board = await getTodosGroupedByColumns()
    set({ board })
  },
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map<TypedColumn, Column>(get().board.columns)
    newColumns.get(id)!.todos.splice(taskIndex, 1)
    set({ board: { columns: newColumns } })
    // if (todo.image) {
    //   await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    // }
    await databeses.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    )
  },
  searchString: "",
  setSearchString: (searchString: string) => set({ searchString }),

  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  newTaskInput: "",

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
