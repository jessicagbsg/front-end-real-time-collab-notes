import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Footer,
  ExternalLayout,
  Button,
  Input,
  useToast,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components";
import { useAuthContext } from "@/context/AuthProvider";
import type { UserLoginDTO } from "@/types";
import { UserLoginFromSchema } from "./schema";

export const LogIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoading, isAuthenticated, error } = useAuthContext();
  const form = useForm<UserLoginDTO>({
    resolver: zodResolver(UserLoginFromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: z.infer<typeof UserLoginFromSchema>) => {
    login(values);
  };

  useEffect(() => {
    if (!!error)
      toast({
        title: "Error trying to log in",
        description: error || "An error occurred",
        variant: "destructive",
      });
  }, [error]);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    !isLoading && (
      <ExternalLayout>
        <div className="min-h-[100vh] flex flex-col">
          <div className={`flex flex-col flex-1 items-center justify-center`}>
            <Form {...form}>
              <form
                className="w-full sm:w-2/3 lg:w-2/5 lg:max-w-screen-sm h-max flex flex-col gap-y-4 p-8 drop-shadow-md bg-white rounded-lg"
                onSubmit={form.handleSubmit(handleLogin)}
              >
                <div className="flex flex-col gap-y-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Think it. Write it.
                  </h1>
                  <FormDescription>Log in to your Notesphere account</FormDescription>
                </div>
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
                  Log in
                </Button>
                <h3 className="text-center mt-4 text-sm">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </span>
                </h3>
              </form>
            </Form>
          </div>
          <Footer />
        </div>
      </ExternalLayout>
    )
  );
};
