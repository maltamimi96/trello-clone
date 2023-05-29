import { storage } from "@/appwrite"
const getUrl = async (Image: Image) => {
  const url = storage.getFilePreview(Image.bucketId, Image.fileId)
  return url
}
export default getUrl
