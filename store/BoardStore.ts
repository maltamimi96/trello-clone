import { ID, databeses, storage } from "@/appwrite"
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumns"
import uploadImage from "@/lib/uploadImage"
import { create } from "zustand"

interface BoardState {
  board: Board // Represents the state of the board
  newTaskInput: string // Holds the input for a new task
  searchString: string // Holds the search string for filtering tasks
  newTaskType: TypedColumn // Holds the type of the new task
  image: File | null // Holds the image file for a task
  setNewTaskType: (type: TypedColumn) => void // Function to set the type of the new task
  setBoardState: (board: Board) => void // Function to set the state of the board
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void // Function to update a task in the database
  setSearchString: (searchString: string) => void // Function to set the search string
  setNewTaskInput: (input: string) => void // Function to set the input for a new task
  setImage: (image: File | null) => void // Function to set the image file for a task
  getBoard: () => void // Function to fetch the board data
  deleteTask: (
    taskIndex: number,
    todoId: Todo,
    id: TypedColumn,
    bucketId: string,
    fileId: string
  ) => void // Function to delete a task
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void // Function to add a new task
  fetchId: string
  setFetchId: (id: string) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
  // State
  board: {
    columns: new Map<TypedColumn, Column>(), // Holds the columns of the board
  },
  newTaskInput: "", // Initial value for new task input
  searchString: "", // Initial value for search string
  newTaskType: "todo", // Initial value for new task type
  image: null, // Initial value for image file
  fetchId: "",

  // Setters
  setNewTaskType: (type: TypedColumn) => set({ newTaskType: type }), // Sets the type of the new task
  setBoardState: (board: Board) => set({ board }), // Sets the state of the board
  updateTodoInDB: async (todo, columnId, image?: string) => {
    await databeses.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: columnId, image: image || "" } // Updates the title and status of a task in the database
    )
  },
  setSearchString: (searchString: string) => set({ searchString }), // Sets the search string
  setNewTaskInput: (input: string) => set({ newTaskInput: input }), // Sets the input for a new task
  setImage: (image: File | null) => set({ image }), // Sets the image file for a task
  setFetchId: (id: string) => set({ fetchId: id }),

  // Actions
  getBoard: async () => {
    const board = await getTodosGroupedByColumns() // Fetches the board data and groups tasks by columns
    set({ board }) // Sets the state of the board
  },
  deleteTask: async (
    taskIndex: number,
    todo: Todo,
    id: TypedColumn,
    bucketId: string,
    fileId: string
  ) => {
    const newColumns = new Map<TypedColumn, Column>(get().board.columns) // Creates a copy of the columns map
    newColumns.get(id)!.todos.splice(taskIndex, 1) // Removes the task from the specified column
    set({ board: { columns: newColumns } }) // Updates the state of the board

    if (todo.image) {
      await storage.deleteFile(bucketId, fileId) // Deletes the image file associated with the task from storage
    }

    await databeses.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id // Deletes the task from the database
    )
  },
  addTask: async (todo: string, columnId: TypedColumn, image) => {
    let file: Image | undefined

    if (image) {
      const fileUploaded = await uploadImage(image) // Uploads the image file to storage

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
        ...(file && { image: JSON.stringify(file) }), // Adds the image information to the task data if an image was uploaded
      }
    )

    set({ newTaskInput: "" }) // Clears the input for a new task

    set((state) => {
      const newColumns = new Map<TypedColumn, Column>(state.board.columns) // Creates a copy of the columns map
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }), // Adds the image information to the new task if an image was uploaded
      }

      const column = newColumns.get(columnId)

      if (!column) {
        newColumns.set(columnId, { id: columnId, todos: [newTodo] }) // Adds a new column and task to the board if the column does not exist
      } else {
        newColumns.get(columnId)?.todos.push(newTodo) // Adds the new task to the existing column
      }

      return { board: { columns: newColumns } } // Updates the state of the board
    })
  },
}))
