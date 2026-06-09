"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/browser"
import { Loader2, Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
    value?: string | null
    onChange: (url: string | null) => void
    disabled?: boolean
    bucket?: string
    folder?: string
}

export function ImageUpload({
    value,
    onChange,
    disabled,
    bucket = "testimony-images",
    folder
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validation
        const isImage = file.type.startsWith("image/")
        const isAcceptedType = ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage || !isAcceptedType) {
            toast.error("Invalid file type", {
                description: "Please upload a JPG, PNG, or WebP image."
            })
            return
        }

        if (!isLt2M) {
            toast.error("File too large", {
                description: "Image must be smaller than 2MB."
            })
            return
        }

        try {
            setIsUploading(true)

            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
            const filePath = folder ? `${folder}/${fileName}` : fileName

            const { error: uploadError, data } = await supabase.storage
                .from(bucket)
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath)

            onChange(publicUrl)
            toast.success("Image uploaded successfully")
        } catch (error: any) {
            toast.error("Upload failed", {
                description: error.message
            })
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const onRemove = async () => {
        // We don't necessarily delete from storage here to avoid accidental data loss 
        // if the form isn't saved, but the UI strategy for "replacement" usually
        // involves just clearing the reference in the form.
        // The cleanup logic for orphaned files is handled during the final save action.
        onChange(null)
    }

    return (
        <div className="space-y-4 w-full">
            <div
                className={cn(
                    "relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-black/5 flex flex-col items-center justify-center bg-black/5 transition-colors",
                    !value && "hover:bg-black/[0.08] cursor-pointer",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !value && !disabled && fileInputRef.current?.click()}
            >
                {value ? (
                    <>
                        <Image
                            src={value}
                            alt="Upload"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemove()
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-ink-muted">
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 animate-spin" />
                        ) : (
                            <Upload className="h-8 w-8" />
                        )}
                        <p className="text-sm font-medium">
                            {isUploading ? "Uploading..." : "Click to upload cover image"}
                        </p>
                        <p className="text-xs opacity-60">JPG, PNG or WebP (Max 2MB)</p>
                    </div>
                )}
            </div>
            <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                ref={fileInputRef}
                onChange={onUpload}
                disabled={disabled || isUploading}
            />
        </div>
    )
}
