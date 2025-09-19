import type { ButtonHTMLAttributes, ReactNode } from "react";

import LoadingComponent from "@/shared/LoadingComponent";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: ReactNode;
  loading: boolean;
  loadingText?: string;
};

const SubmitButton = ({
  className,
  loading,
  loadingText,
  title,
  ...props
}: Props) => {
  return (
    <Button
      type="submit"
      disabled={loading}
      className={cn("w-full bg-accent-foreground", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingComponent />
          <span>{loadingText ?? "Submitting..."}</span>
        </div>
      ) : (
        (title ?? "Submit")
      )}
    </Button>
  );
};

export default SubmitButton;
