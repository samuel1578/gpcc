import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type Variant = "light" | "strong" | "subtle" | "dark"

const variantClass: Record<Variant, string> = {
  light: "glass-panel",
  strong: "glass-panel-strong",
  subtle: "glass-panel-subtle",
  dark: "glass-panel-dark",
}

export function GlassPanel({
  variant = "light",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: Variant }) {
  return (
    <div className={cn("rounded-3xl", variantClass[variant], className)} {...props}>
      {children}
    </div>
  )
}
