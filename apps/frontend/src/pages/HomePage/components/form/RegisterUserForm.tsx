import PasswordField from "@/components/form-fields/PasswordField";

import useUserRegister from "@/hooks/auth/useUserRegister";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

type Props = {
  navigateToLogin: () => void;
};

const RegisterUserForm = ({ navigateToLogin }: Props) => {
  const { form, handleRegisterUser, isLoading } = useUserRegister();

  return (
    <div className="h-full w-full max-w-md">
      <Card className="w-full rounded-2xl border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300">
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(handleRegisterUser)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordField
              form={form}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <PasswordField
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />

            <SubmitButton
              loading={isLoading}
              title="Register"
              className="w-full"
              disabled={isLoading}
            />
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            onClick={navigateToLogin}
            className="px-1 text-secondary-foreground hover:underline"
            disabled={isLoading}
          >
            Login
          </Button>
        </p>
      </Card>
    </div>
  );
};

export default RegisterUserForm;
