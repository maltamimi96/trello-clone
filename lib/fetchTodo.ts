import { databeses } from "@/appwrite"

export const fetchTodo = async (id: string) => {
  const todo = await databeses.getDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    "6471eaa204079639bebf",
    id
  )
  return todo
}
