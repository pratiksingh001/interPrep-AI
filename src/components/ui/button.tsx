import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
   {
      variants: {
         variant: {
            default:
               "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600 hover:shadow-xl transition-all duration-200 border-0",
            destructive:
               "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:from-red-700 hover:to-red-600 hover:shadow-xl transition-all duration-200",
            outline:
               "border border-gray-600 bg-transparent text-gray-300 shadow-sm hover:bg-gray-800 hover:text-white transition-all duration-200",
            secondary:
               "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-md hover:from-gray-800 hover:to-gray-700 transition-all duration-200",
            ghost: "text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200",
            link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
         },
         size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 px-6 has-[>svg]:px-4",
            icon: "size-9",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   }
);

function Button({
   className,
   variant,
   size,
   asChild = false,
   loading = false,
   children,
   disabled,
   ...props
}: React.ComponentProps<"button"> &
   VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      loading?: boolean;
   }) {
   const Comp = asChild ? Slot : "button";

   return (
      <Comp
         data-slot="button"
         className={cn(buttonVariants({ variant, size, className }))}
         disabled={disabled || loading}
         {...props}
      >
         {loading && <Loader2 className="size-4 animate-spin" />}
         {children}
      </Comp>
   );
}

export { Button, buttonVariants };
