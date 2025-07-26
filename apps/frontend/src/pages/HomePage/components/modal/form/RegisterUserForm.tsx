import PasswordField from "@/components/form-fields/PasswordField";

import useUserRegister from "@/hooks/auth/useUserRegister";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

const RegisterUserForm = () => {
  const { form, handleRegisterUser, isLoading } = useUserRegister();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
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
        />
      </form>
    </Form>
  );
};

export default RegisterUserForm;
