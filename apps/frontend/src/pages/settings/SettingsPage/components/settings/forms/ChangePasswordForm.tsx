import PasswordField from "@/components/form-fields/PasswordField";

import useChangePassword from "@/hooks/user/useChangePassword";

import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

const ChangePasswordForm = () => {
  const { form, handleChangePassword, isLoading } = useChangePassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePassword)}
        className="mx-auto flex max-w-lg flex-col gap-6"
      >
        <PasswordField
          form={form}
          name="currentPassword"
          label="Current Password"
          placeholder="Enter your current password"
        />

        <PasswordField
          form={form}
          name="newPassword"
          label="New Password"
          placeholder="Enter a new password"
        />

        <PasswordField
          form={form}
          name="confirmNewPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {isLoading ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
