import { Link } from "react-router";

import PasswordField from "@/components/form-fields/PasswordField";

import useUserLogin from "@/hooks/auth/useUserLogin";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

const LoginForm = () => {
  const { form, handleLoginUser, isLoading } = useUserLogin();

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Login to Your Account
      </h2>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleLoginUser)}
        >
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
            placeholder="Password"
          />

          <SubmitButton
            title="Login"
            loading={isLoading}
          />
        </form>
      </Form>
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
