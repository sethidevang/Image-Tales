import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { useMagnetic } from "@/hooks/use-magnetic"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-4 border-black shadow-neo active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-neo-black text-neo-main hover:bg-neo-black/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-4 border-black bg-white hover:bg-neo-main",
        secondary:
          "bg-neo-secondary text-white hover:bg-neo-secondary/90",
        ghost: "border-none shadow-none hover:bg-neo-main/20 active:translate-x-0 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline border-none shadow-none active:translate-x-0 active:translate-y-0",
        neoMain: "bg-neo-main text-black hover:bg-neo-main/90",
        neoSecondary: "bg-neo-secondary text-white hover:bg-neo-secondary/90",
        neoAccent: "bg-neo-accent text-black hover:bg-neo-accent/90",
      },
      size: {
        default: "h-14 px-8 py-4 text-lg",
        sm: "h-9 px-3",
        lg: "h-16 px-12 text-xl",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  magnetic?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = false, ...props }, ref) => {
    const magneticRef = useMagnetic(0.15);
    const Comp = asChild ? Slot : "button"
    
    // Combine refs if magnetic is enabled
    const combinedRef = (node: HTMLButtonElement) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      
      if (magnetic) (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={combinedRef}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
