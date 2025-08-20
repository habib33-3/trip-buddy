import { Card, CardContent, CardHeader } from "@/ui/card";

import ChangePasswordForm from "./forms/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Card className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-tl from-gray-800 via-slate-700 to-gray-900 p-6 shadow-2xl backdrop-blur-md sm:p-8">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Change Password</h2>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
