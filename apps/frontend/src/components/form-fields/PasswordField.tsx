import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/ui/button";

type PasswordFieldProps<T extends FieldValues> = {
  form: { control: Control<T> };
  name: Path<T>;
  label?: string;
  placeholder?: string;
};

const PasswordField = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label ?? "Password"}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder ?? "******"}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-gray-200 transition-opacity hover:border-0 hover:bg-transparent hover:text-gray-300 hover:opacity-70 hover:ring-0 hover:outline-none"
                title="Toggle Password Visibility "
              >
                {showPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
