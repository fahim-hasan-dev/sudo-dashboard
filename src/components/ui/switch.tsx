"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 p-0.5 transition-colors duration-200",
      "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00ADEF] data-[state=checked]:to-[#3b82f6] data-[state=unchecked]:bg-[#08090d] data-[state=unchecked]:border-[#1b1e25]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4.5 w-4.5 rounded-full transition-all duration-200 shadow-sm",
        "data-[state=checked]:translate-x-5 data-[state=checked]:bg-white data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-[#4b5563]"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
