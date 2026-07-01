"use server"

import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/actions/auth"
import type { FeedbackSubmission } from "@/lib/types/database"

export interface FeedbackResponse {
    success: boolean
    message: string
}

export async function submitFeedback(
    formData: {
        name: string
        email: string
        feedback_type: string
        message: string
    }
): Promise<FeedbackResponse> {
    const supabase = await createClient()

    const { error } = await supabase
        .from("feedback_submissions")
        .insert({
            name: formData.name,
            email: formData.email,
            feedback_type: formData.feedback_type,
            message: formData.message,
        })

    console.log("Supabase Insert Result - Error:", JSON.stringify(error, null, 2))

    if (error) {
        console.error("Feedback submission error detail:", error)
        return {
            success: false,
            message: `Submission failed: ${error.message} (${error.code})`,
        }
    }

    return {
        success: true,
        message: "Thank you for reaching out. A member of our pastoral team will be in touch within 48 hours.",
    }
}

export async function getFeedbackSubmissions(): Promise<FeedbackSubmission[]> {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("feedback_submissions")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching feedback submissions:", error)
        return []
    }

    return data as FeedbackSubmission[]
}
