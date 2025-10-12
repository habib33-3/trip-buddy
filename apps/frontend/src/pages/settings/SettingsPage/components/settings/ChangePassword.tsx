import { Card, CardContent, CardHeader } from "@/ui/card";

import ChangePasswordForm from "./forms/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Card
      id="change-password"
      className="rounded-2xl border border-white/10 bg-slate-800/80 shadow-2xl backdrop-blur-md"
    >
      <CardHeader>
        <h2 className="text-2xl font-bold tracking-tight text-gray-300">
          Change Password
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Keep your account secure by updating your password regularly.
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
