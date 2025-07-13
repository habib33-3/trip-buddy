import { Link, useNavigate } from "react-router";

import { AlertTriangle, ArrowLeftSquare, HomeIcon } from "lucide-react";

import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-0 text-center shadow-2xl transition-shadow hover:shadow-2xl/90">
        <CardContent className="flex flex-col items-center gap-6 py-12">
          <div className="animate-bounce rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Oops! Page not found
          </h1>
          <p className="max-w-xs text-sm text-muted-foreground">
            The page you&apos;re looking for doesn’t exist, may have been moved,
            or never existed at all.
          </p>
          <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              variant="default"
              className="gap-2"
            >
              <Link to="/">
                <HomeIcon className="size-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={async () => navigate(-1)}
            >
              <ArrowLeftSquare className="size-4" />
              Previous Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
