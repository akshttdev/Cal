import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", value, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                value={value ?? ""}
                className={cn(
                    "flex h-10 w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-2 text-sm ring-offset-[color:var(--background)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };