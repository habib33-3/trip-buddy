import PasswordField from "@/components/form-fields/PasswordField";

import useChangePassword from "@/hooks/user/useChangePassword";

import { Form } from "@/ui/form";

import SubmitButton from "@/buttons/SubmitButtons";

const ChangePasswordForm = () => {
  const { form, handleChangePassword, isLoading } = useChangePassword();

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleChangePassword)}
        className="flex flex-col gap-6"
      >
        <PasswordField
          form={form}
          name="currentPassword"
          label="Current Password"
          placeholder="Current Password"
        />
        <PasswordField
          form={form}
          name="newPassword"
          label="New Password"
          placeholder="New Password"
        />
        <PasswordField
          form={form}
          name="confirmNewPassword"
          label="Confirm New Password"
          placeholder="Confirm New Password"
        />

        <SubmitButton
          title="Change Password"
          loading={isLoading}
        />
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
