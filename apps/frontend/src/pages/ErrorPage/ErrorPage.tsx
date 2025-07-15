import { Link, useNavigate } from "react-router";

import { ArrowLeftSquare, Bug, HomeIcon, RefreshCw } from "lucide-react";

import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-0 text-center shadow-2xl transition-shadow hover:shadow-2xl/90">
        <CardContent className="flex flex-col items-center gap-6 py-12">
          <div className="animate-pulse rounded-full bg-red-100 p-3 dark:bg-red-900/20">
            <Bug className="h-5 w-5 text-red-600 dark:text-red-500" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-red-600 dark:text-red-400">
            Something went wrong
          </h1>
          <p className="max-w-xs text-sm text-muted-foreground">
            An unexpected error occurred. You can try refreshing the page or go
            back to a safe place.
          </p>
          <nav
            aria-label="Error page actions"
            className="flex w-full flex-col gap-3 pt-4 sm:flex-row sm:justify-center"
          >
            <Button
              variant="default"
              className="gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              onClick={handleRefresh}
            >
              <RefreshCw className="size-5" />
              Refresh Page
            </Button>
            <Button
              asChild
              variant="secondary"
              className="gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <Link to="/">
                <HomeIcon className="size-5" />
                Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              onClick={async () => navigate(-1)}
            >
              <ArrowLeftSquare className="size-5" />
              Go Back
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
