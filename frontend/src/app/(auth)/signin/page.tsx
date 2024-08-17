"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OCjpGJd3fXv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from 'zod'
import { signInAction } from "@/actions/authActions/signIn";
import { signInSchema } from "@/actions/signInSchema"
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "@nextui-org/spinner";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { register, handleSubmit } = useForm<z.infer<typeof signInSchema>>()
  const status = useFormStatus()
  const { toast } = useToast()
  const router = useRouter();
  const onSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (data) => {
    const { error, decode } = await signInAction(data);

    if (error) {
      toast({
        variant: "destructive",
        title: `ERROR: ${error}`,
        description: "Please type the correct credentials",
      });
    }
    else {
      if (typeof window !== undefined) {
        localStorage.setItem("userID", JSON.stringify(decode?.sub))
        localStorage.setItem("username", JSON.stringify(decode?.username))
        localStorage.setItem("email", JSON.stringify(decode?.email))
        localStorage.setItem("role_id", JSON.stringify(decode?.role_id))
      }
      router.push('/dashboard')
    };
  };
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="flex  flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Or{" "}
                <Link href="/signup" className="font-medium text-primary hover:text-primary/80" prefetch={false}>
                  create a new account
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 rounded" />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary hover:text-primary/80" prefetch={false}>
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  disabled={status.pending}
                >
                  {status?.pending ? <Spinner /> : "Sign in"}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex w-full justify-center rounded-md border border-muted bg-background py-2 px-4 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
              >
                <GithubIcon className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="flex w-full justify-center rounded-md border border-muted bg-background py-2 px-4 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
              >
                <ChromeIcon className="mr-2 h-5 w-5" />
                Google
              </Button>
            </div>
            <div className="text-center">
              <Link href="/signup" className="font-medium text-primary hover:text-primary/80" prefetch={false}>
                Don't have an account? Sign Up!
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>

  )
}

function ChromeIcon(props: any) {
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
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


function GithubIcon(props: any) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}