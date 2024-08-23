import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Footer,
  Input,
  ExternalLayout,
  useToast,
} from "@/components";
import { useAuth } from "@/hooks/useAuth";
import type { CreateUserDTO } from "@/types";
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
    signUp(values);
  };

  useEffect(() => {
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
      <ExternalLayout>
        <div className="min-h-[100vh] flex flex-col">
          <div className={`flex flex-col my-6 sm:my-0 flex-1 items-center justify-center`}>
            <Form {...form}>
              <form
                className="w-full sm:w-2/3 lg:w-2/5 lg:max-w-screen-sm h-max flex flex-col gap-y-4 p-8 drop-shadow-md bg-white rounded-lg"
                onSubmit={form.handleSubmit(handleLogin)}
              >
                <div className="flex flex-col gap-y-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Think it. Write it.
                  </h1>
                  <FormDescription>Sign up to Notesphere</FormDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
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
                  Sign up
                </Button>
                <h3 className="text-center mt-4 text-sm">
                  Already have an account?{" "}
                  <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
                    Log in
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
