"use server"

import { createClient } from "@/lib/supabase/server"
import { newsletterSchema } from "@/lib/validations/newsletter"
import { requireAdminAuth } from "@/lib/actions/auth"
import type { NewsletterSubscriber } from "@/lib/types/database"

export interface NewsletterResponse {
    success: boolean
    message: string
}

export async function subscribeToNewsletter(
    _prevState: NewsletterResponse | null,
    formData: FormData,
): Promise<NewsletterResponse> {
    const email = formData.get("email")

    // Validate
    const parsed = newsletterSchema.safeParse({ email })
    if (!parsed.success) {
        const firstError = parsed.error.errors[0]
        return { success: false, message: firstError.message }
    }

    const supabase = await createClient()

    const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({
            email: parsed.data.email,
            source: "website",
        })

    if (error) {
        // PostgreSQL unique violation code
        if (error.code === "23505") {
            return {
                success: false,
                message: "This email is already subscribed.",
            }
        }

        console.error("Newsletter subscription error:", error)
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        }
    }

    return {
        success: true,
        message: "Successfully subscribed to our newsletter.",
    }
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching newsletter subscribers:", error)
        return []
    }

    return data as NewsletterSubscriber[]
}
