/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uQ7uQIqy2Aa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
       <header className="bg-primary px-4 py-6 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="text-primary-foreground font-bold text-xl" prefetch={false}>
            URL Shortener
          </Link>
          <nav className="hidden sm:flex items-center space-x-4">
            <Link href="#" className="text-primary-foreground hover:underline underline-offset-4" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline underline-offset-4" prefetch={false}>
              Features
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" className="mr-2">
              <Link href='/signin'>
              Sign In
              </Link>
            </Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-primary py-12 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground">
              The only URL shortener you need
            </h1>
            <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-primary-foreground">
              Shorten your links and track their performance.
            </p>
            <div className="mt-8 sm:mt-12">
              <form className="max-w-xl mx-auto flex items-center">
                <Input type="text" placeholder="Enter a URL to shorten" className="flex-1 rounded-l-md" />
                <Button type="button" className="rounded-r-md">
                  Shorten URL
                </Button>
              </form>
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-card rounded-md p-6 shadow-sm">
                <LayoutDashboardIcon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Store and manage shortened URLs</h3>
                <p className="mt-2 text-muted-foreground">Keep track of all your shortened URLs in one place.</p>
              </div>
              <div className="bg-card rounded-md p-6 shadow-sm">
                <QrCodeIcon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Generate QR codes for shortened URLs</h3>
                <p className="mt-2 text-muted-foreground">
                  Create QR codes to make your shortened URLs more shareable.
                </p>
              </div>
              <div className="bg-card rounded-md p-6 shadow-sm">
                <InfoIcon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">View analytics for your shortened URLs</h3>
                <p className="mt-2 text-muted-foreground">
                  Track the performance of your shortened URLs with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">&copy; 2024 URL Shortener. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:underline underline-offset-4 text-sm"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:underline underline-offset-4 text-sm"
              prefetch={false}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InfoIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}


function QrCodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}