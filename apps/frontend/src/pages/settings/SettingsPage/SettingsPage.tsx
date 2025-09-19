import SettingsSection from "./components/SettingsSection";
import ChangePasswordForm from "./components/forms/ChangePasswordForm";

const SettingsPage = () => {
  return (
    <main className="flex h-full flex-col items-start justify-start gap-6 p-6">
      <SettingsSection
        title="Change Password"
        description="Keep your account secure by updating your password regularly."
      >
        <ChangePasswordForm />
      </SettingsSection>
    </main>
  );
};

export default SettingsPage;
