import { notFound } from "next/navigation"
import { getTestimonyById } from "@/lib/actions/testimonies"
import { TestimonyForm } from "@/components/admin/testimony-form"
import { Reveal } from "@/components/motion/reveal"

interface EditTestimonyPageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: EditTestimonyPageProps) {
    const { id } = await params
    const testimony = await getTestimonyById(id)

    return {
        title: testimony ? `Edit: ${testimony.title} | GPCC Admin` : "Edit Testimony | GPCC Admin",
    }
}

export default async function EditTestimonyPage({ params }: EditTestimonyPageProps) {
    const { id } = await params
    const testimony = await getTestimonyById(id)

    if (!testimony) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <Reveal>
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Edit Testimony
                    </h1>
                    <p className="text-ink-muted">
                        Update the details of this story of faith.
                    </p>
                </div>
            </Reveal>

            <TestimonyForm initialData={testimony} />
        </div>
    )
}
