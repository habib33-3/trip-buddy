import { useNavigate } from "react-router";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  message?: string;
};

const ErrorComponent = ({ message }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-muted px-4 py-6 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-red-200 text-center shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 py-8">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-semibold text-destructive">
            {message ?? "Something went wrong"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try again or choose an option below.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={async () => navigate("/")}
              variant="default"
            >
              Go Home
            </Button>
            <Button
              onClick={async () => navigate(-1)}
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorComponent;
