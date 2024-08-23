import { Footer } from "@/components";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { CreateUserDTO } from "@/types";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { CreateUserFromSchema } from "./schema";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, isAuthenticated, error } = useAuth();
  const form = useForm<CreateUserDTO>({
    resolver: zodResolver(CreateUserFromSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const { toast } = useToast();

  const handleLogin = (values: z.infer<typeof CreateUserFromSchema>) => {
    signUp(values).then(() => {
      navigate("/home");
    });
  };

  useEffect(() => {
    console.log(error);
    if (!!error)
      toast({
        title: "Error",
        description: error || "An error occurred",
      });
  }, [error]);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    !isLoading && (
      <Layout>
        <div className="min-h-[100vh] flex flex-col">
          <div className={`flex flex-col flex-1 items-center justify-center`}>
            <Form {...form}>
              <form
                className="w-96 lg:w-2/5 lg:max-w-screen-sm h-max flex flex-col gap-y-4 p-8 drop-shadow-md bg-white rounded-lg"
                onSubmit={form.handleSubmit(handleLogin)}
              >
                <div className="flex flex-col gap-y-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Think it. Write it.
                  </h1>
                  <FormDescription>Sign up to Notesphere</FormDescription>
                </div>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@email.com" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*******" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <Button className="mt-4" type="submit">
                  Sign up
                </Button>
              </form>
            </Form>
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
};
