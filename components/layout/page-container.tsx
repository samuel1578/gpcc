import { cn } from "@/lib/utils"

export function PageContainer({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn(
            "mx-auto",
            "w-[calc(100vw-32px)]",
            "md:w-[calc(100vw-52px)]",
            "lg:w-[calc(100vw-76px)]",
            "max-w-[2800px]",
            className
        )}>
            {children}
        </div>
    )
}
