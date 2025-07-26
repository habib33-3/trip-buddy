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

const AuthModal = () => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-primary px-6 py-2 text-white shadow transition-colors hover:bg-primary/90">
          Login
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
              className="px-1 text-primary"
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
