import PasswordField from "@/components/form-fields/PasswordField";

import useUserLogin from "@/hooks/auth/useUserLogin";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

type Props = {
  navigateToRegister: () => void;
};

const LoginForm = ({ navigateToRegister }: Props) => {
  const { form, handleLoginUser, isLoading } = useUserLogin();

  return (
    <div className="h-full w-full max-w-md px-4 sm:px-6 md:px-0">
      <Card className="w-full rounded-2xl border border-white/10 bg-gradient-to-tl from-gray-800 via-slate-700 to-gray-900 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <Form {...form}>
          <form
            className="flex flex-col gap-5 sm:gap-6"
            onSubmit={form.handleSubmit(handleLoginUser)}
          >
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
              placeholder="Password"
            />

            {/* Submit */}
            <SubmitButton
              title="Login"
              loading={isLoading}
              className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            />
          </form>
        </Form>

        {/* Register link */}
        <div className="mt-6 text-center text-sm text-slate-300">
          Don&apos;t have an account?{" "}
          <Button
            type="button"
            variant="link"
            onClick={navigateToRegister}
            className="px-1 text-slate-300 underline hover:text-white"
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
