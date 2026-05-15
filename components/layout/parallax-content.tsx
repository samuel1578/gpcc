"use client"

import React from "react"

interface ParallaxContentProps {
    children: React.ReactNode
}

/**
 * ParallaxContent wraps page sections to create a parallax scrolling effect.
 * The background image remains fixed while sections scroll above it.
 */
export function ParallaxContent({ children }: ParallaxContentProps) {
    return (
        <div className="relative w-full">
            {/* Content container that scrolls over the global body background */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
