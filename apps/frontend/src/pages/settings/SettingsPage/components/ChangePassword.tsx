import { Card, CardContent, CardHeader } from "@/ui/card";

import ChangePasswordForm from "./forms/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Card className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md sm:p-8">
      <CardHeader>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">
          Change Password
        </h2>
        <p className="text-sm text-slate-400">
          Keep your account secure by updating your password regularly.
        </p>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
