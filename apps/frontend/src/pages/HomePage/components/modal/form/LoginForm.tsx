import PasswordField from "@/components/form-fields/PasswordField";

import useUserLogin from "@/hooks/auth/useUserLogin";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

const LoginForm = () => {
  const { form, handleLoginUser, isLoading } = useUserLogin();

  return (
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
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default LoginForm;
