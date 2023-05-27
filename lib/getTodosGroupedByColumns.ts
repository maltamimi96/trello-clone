import { databeses } from "@/appwrite"

export const getTodosGroupedByColumns = async () => {
  const data = await databeses.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  )
  const todos = data.documents
}
