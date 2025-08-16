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
    <div className="h-full w-full max-w-md px-4 sm:px-6 md:px-0">
      <Card className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <Form {...form}>
          <form
            className="flex flex-col gap-5 sm:gap-6"
            onSubmit={form.handleSubmit(handleRegisterUser)}
          >
            {/* Name */}
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
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
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
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
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

            {/* Submit */}
            <SubmitButton
              loading={isLoading}
              title="Register"
              className="w-full rounded-xl bg-pink-600 text-white hover:bg-pink-700"
              disabled={isLoading}
            />
          </form>
        </Form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-pink-200">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            onClick={navigateToLogin}
            className="px-1 text-slate-300 underline hover:text-white"
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
