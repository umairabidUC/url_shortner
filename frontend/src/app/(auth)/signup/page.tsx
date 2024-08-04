/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lzPyzb4R56F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectContent, SelectLabel, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/signin" className="font-medium text-primary hover:text-primary/80" prefetch={false}>
                            Sign In
                        </Link>
                    </p>
                </div>
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <Label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-3">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-3">
                            Email address
                        </Label>
                        <Input
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
                        <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-3">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground mb-3">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className='dark'>
                        <Label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-3">
                            Role
                        </Label>
                        <Select name="role" required >
                            <SelectTrigger className="w-[180px] dark">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className='dark'>
                                <SelectGroup>
                                    <SelectLabel>Select Role</SelectLabel>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}