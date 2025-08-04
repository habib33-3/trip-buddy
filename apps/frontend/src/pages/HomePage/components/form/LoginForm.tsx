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
    <div className="w-full max-w-md">
      <Card className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Button
            type="button"
            variant="link"
            onClick={navigateToRegister}
            className="px-1 text-secondary-foreground hover:underline"
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
