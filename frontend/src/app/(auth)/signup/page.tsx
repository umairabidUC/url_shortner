"use client";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectContent, SelectLabel, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { motion } from "framer-motion"
import { useFormStatus } from "react-dom";
import { Spinner } from "@nextui-org/spinner";
import { signUpAction } from '@/actions/authActions/signUp';
import { useToast } from "@/components/ui/use-toast";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export default function SignUp() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof signUpSchema>>()

    const status = useFormStatus();
    const router = useRouter();
    const { toast } = useToast();
    const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (data) => {
        const { error } = await signUpAction({
            username: data.username,
            email: data.email,
            password: data.password,
            role_id: 2,
        });
        console.log(error)
        if (error) {
            toast({
                variant: "destructive",
                title: `ERROR: ${error}`,
                description: "Sign-up failed. Please check your details and try again.",
            });
        }
        else {
            router.push('/dashboard')
        }
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
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
                            <p className="mt-2 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/signin" className="font-medium text-primary hover:text-primary/80" prefetch={false}>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">

                            <div>
                                <Label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-3">
                                    Username
                                </Label>
                                <Input

                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    placeholder="Username"
                                    {...register("username")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-3">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    placeholder="Email address"
                                    {...register("email")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-3">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground mb-3">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    {status?.pending ? <Spinner /> : "Sign Up"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </AuroraBackground>
    )
}