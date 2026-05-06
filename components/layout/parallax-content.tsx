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
            {/* Fixed background image for parallax effect */}
            <div
                className="fixed inset-0 -z-20 w-full h-screen bg-cover bg-center bg-attachment-fixed"
                style={{
                    backgroundImage: "url('/images/bcg.webp')",
                    backgroundAttachment: "fixed",
                }}
                aria-hidden="true"
            />

            {/* Content container that scrolls over the fixed background */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
