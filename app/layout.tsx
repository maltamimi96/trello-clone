import Modal from "@/components/Modal"
import "./globals.css"
import UpdateModal from "@/components/UpdateModal"

export const metadata = {
  title: "Trello Clone ",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8] dark:bg-cyan-900">
        {children}
        <Modal />
      </body>
    </html>
  )
}
