/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZsvNG3osQJ0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function UserInfo({ isClosed }: { isClosed: boolean }) {
  console.log(isClosed)
  const username = JSON.parse(localStorage.getItem("username") || "")
  const email = JSON.parse(localStorage.getItem("email") || "")
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-8">
      <Avatar className={`${isClosed ? 'h-10 w-10' : "h-20 w-20"} duration-200`}>
        <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 text-center">
        <div className={`${isClosed ? "hidden" : "text-lg font-semibold block duration-200"}`}>{username}</div>
        <div className={` ${isClosed ? "hidden" : "text-sm text-muted-foreground block duration-200"}`}>{email}</div>
      </div>
    </div>
  )
}