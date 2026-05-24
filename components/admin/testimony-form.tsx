"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Save, ChevronLeft } from "lucide-react"
import { toast } from "sonner"

import { testimonySchema, type TestimonyFormValues } from "@/lib/validations/testimony"
import { createTestimony, updateTestimony } from "@/lib/actions/testimonies"
import type { Testimony } from "@/lib/types/database"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/image-upload"

interface TestimonyFormProps {
    initialData?: Testimony | null
}

export function TestimonyForm({ initialData }: TestimonyFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<TestimonyFormValues>({
        resolver: zodResolver(testimonySchema),
        defaultValues: initialData
            ? {
                title: initialData.title || "",
                slug: initialData.slug || "",
                person_name: initialData.person_name || "",
                person_role: initialData.person_role || "",
                category: initialData.category || "",
                excerpt: initialData.excerpt || "",
                content: initialData.content || "",
                quote: initialData.quote || "",
                scripture_reference: initialData.scripture_reference || "",
                cover_image_url: initialData.cover_image_url || null,
                is_published: initialData.is_published || false,
                is_featured: initialData.is_featured || false,
                is_confidential: initialData.is_confidential || false,
                display_order: initialData.display_order || 0,
            }
            : {
                title: "",
                slug: "",
                person_name: "",
                person_role: "",
                category: "",
                excerpt: "",
                content: "",
                quote: "",
                scripture_reference: "",
                cover_image_url: null,
                is_published: false,
                is_featured: false,
                is_confidential: false,
                display_order: 0,
            },
    })

    const isConfidential = form.watch("is_confidential")

    async function onSubmit(values: TestimonyFormValues) {
        setIsLoading(true)
        try {
            // Normalize values before sending
            const payload = {
                ...values,
                person_name: values.is_confidential ? "" : values.person_name,
            }

            if (initialData) {
                await updateTestimony(initialData.id, payload)
                toast.success("Testimony updated successfully")
            } else {
                await createTestimony(payload)
                toast.success("Testimony created successfully")
            }

            router.push("/admin/testimonies")
            router.refresh()
        } catch (error: any) {
            console.error("Form submission error:", error)
            toast.error("Save failed", {
                description: error.message || "An unexpected error occurred",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="w-fit gap-2 text-ink-muted hover:text-ink"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to list
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.back()}
                            className="bg-white/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {initialData ? "Save Changes" : "Create Testimony"}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="glass-panel p-6 lg:p-8 space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="A Miracle of Survival" {...field} value={field.value || ""} className="bg-white/50" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="miracle-of-survival" {...field} value={field.value || ""} className="bg-white/50" />
                                            </FormControl>
                                            <FormDescription className="text-[10px]">Used in the URL: /testimonies/miracle-of-survival</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="person_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                                Person Name {isConfidential && "(Hidden)"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={isConfidential ? "Confidential" : "Mr. Alexander Gogoe"}
                                                    {...field}
                                                    value={isConfidential ? "" : (field.value || "")}
                                                    disabled={isConfidential || isLoading}
                                                    className="bg-white/50"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="person_role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Person Role (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Church Member / Deacon" {...field} value={field.value || ""} className="bg-white/50" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="quote"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Highlight Quote (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="God is faithful..." {...field} value={field.value || ""} className="bg-white/50" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="scripture_reference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Scripture Ref (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Psalm 23:1" {...field} value={field.value || ""} className="bg-white/50" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="excerpt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Excerpt</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="A short summary for lists..."
                                                className="bg-white/50 min-h-[100px] resize-none"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Full Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="The full story..."
                                                className="bg-white/50 min-h-[300px]"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="glass-panel p-6 space-y-6">
                            <h3 className="font-display text-lg font-semibold text-ink">Settings</h3>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="is_published"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-xl border border-black/5 p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-sm font-medium">Published</FormLabel>
                                                <FormDescription className="text-xs">Make this story visible to the public.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="is_featured"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-xl border border-black/5 p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-sm font-medium">Featured</FormLabel>
                                                <FormDescription className="text-xs">Show this on the homepage.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="is_confidential"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-xl border border-black/5 p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-sm font-medium">Confidential</FormLabel>
                                                <FormDescription className="text-xs">Hide the person's name publicly.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cover_image_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Cover Image</FormLabel>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Healing / Financial / Family" {...field} value={field.value || ""} className="bg-white/50" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="display_order"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Display Order</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} className="bg-white/50" />
                                            </FormControl>
                                            <FormDescription className="text-[10px]">Lower numbers appear first.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </Card>

                        <div className="rounded-2xl border-2 border-dashed border-black/5 p-8 text-center bg-black/5">
                            <p className="text-[10px] text-ink-muted uppercase tracking-widest font-semibold">
                                Storage: testimony-images
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
