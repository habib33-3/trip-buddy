import PasswordField from "@/components/form-fields/PasswordField";

import useUserRegister from "@/hooks/user/useUserRegister";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

const RegisterUserForm = () => {
  const { form, isLoading, handleRegisterUser } = useUserRegister();

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Create an Account
      </h2>

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
          />
        </form>
      </Form>
    </div>
  );
};

export default RegisterUserForm;
