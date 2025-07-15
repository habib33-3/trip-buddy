import type { ButtonHTMLAttributes } from "react";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
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
      className={cn("w-full", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          <span>{loadingText ?? "Submitting..."}</span>
        </div>
      ) : (
        (title ?? "Submit")
      )}
    </Button>
  );
};

export default SubmitButton;
