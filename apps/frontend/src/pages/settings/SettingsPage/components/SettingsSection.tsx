import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/ui/card";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const SettingsSection = ({ children, description, title }: Props) => {
  return (
    <Card className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md sm:p-8">
      <CardHeader>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">
          {title}
        </h2>
        <p className="text-sm text-slate-400">{description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SettingsSection;
