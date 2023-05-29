import { ID, databeses, storage } from "@/appwrite"
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumns"
import uploadImage from "@/lib/uploadImage"
import { create } from "zustand"

interface BoardState {
  board: Board
  newTaskInput: string
  searchString: string
  newTaskType: TypedColumn
  image: File | null
  setNewTaskType: (type: TypedColumn) => void
  setBoardState: (board: Board) => void
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void
  setSearchString: (searchString: string) => void
  setNewTaskInput: (input: string) => void
  setImage: (image: File | null) => void
  getBoard: () => void
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
  // State
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  newTaskInput: "",
  searchString: "",
  newTaskType: "todo",
  image: null,

  // Setters
  setNewTaskType: (type: TypedColumn) => set({ newTaskType: type }),
  setBoardState: (board: Board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databeses.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: columnId }
    )
  },
  setSearchString: (searchString: string) => set({ searchString }),
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  setImage: (image: File | null) => set({ image }),

  // Actions
  getBoard: async () => {
    const board = await getTodosGroupedByColumns()
    set({ board })
  },
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map<TypedColumn, Column>(get().board.columns)
    newColumns.get(id)!.todos.splice(taskIndex, 1)
    set({ board: { columns: newColumns } })

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }

    await databeses.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    )
  },
  addTask: async (todo: string, columnId: TypedColumn, image) => {
    let file: Image | undefined

    if (image) {
      const fileUploaded = await uploadImage(image)

      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        }
      }
    }

    const { $id } = await databeses.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    )

    set({ newTaskInput: "" })

    set((state) => {
      const newColumns = new Map<TypedColumn, Column>(state.board.columns)
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      }

      const column = newColumns.get(columnId)

      if (!column) {
        newColumns.set(columnId, { id: columnId, todos: [newTodo] })
      } else {
        newColumns.get(columnId)!.todos.push(newTodo)
      }
      console.log("done")

      return { board: { columns: newColumns } }
    })
  },
}))
