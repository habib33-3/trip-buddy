import { useState } from "react";

import { LogInIcon, UserPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import LoginForm from "./form/LoginForm";
import RegisterUserForm from "./form/RegisterUserForm";

type Props = {
  buttonText?: string;
};

const AuthModal = ({ buttonText = "Login" }: Props) => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800">
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl px-6 py-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center text-2xl font-semibold">
            {formType === "login" ? (
              <>
                <LogInIcon className="h-6 w-6 text-primary" />
                Welcome Back
              </>
            ) : (
              <>
                <UserPlusIcon className="h-6 w-6 text-primary" />
                Create an Account
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {formType === "login"
              ? "Log in to access your account"
              : "Sign up to get started"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {formType === "login" ? <LoginForm /> : <RegisterUserForm />}
        </div>

        <DialogFooter className="mt-6 justify-center">
          <p className="text-center text-sm text-muted-foreground">
            {formType === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <Button
              type="button"
              variant="link"
              onClick={() =>
                setFormType((prev) => (prev === "login" ? "register" : "login"))
              }
              className="px-1 text-secondary-foreground hover:underline"
            >
              {formType === "login" ? "Register" : "Login"}
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
