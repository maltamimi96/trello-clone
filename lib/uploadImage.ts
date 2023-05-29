import { ID, storage } from "@/appwrite"

const uploadImage = async (file: File) => {
  if (!file) return
  const fileUploaded = await storage.createFile(
    "6471eb7de3fc8326ba5a",
    ID.unique(),
    file
  )
  return fileUploaded
}
export default uploadImage
