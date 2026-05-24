import { TestimonyForm } from "@/components/admin/testimony-form"
import { Reveal } from "@/components/motion/reveal"

export const metadata = {
    title: "New Testimony | GPCC Admin",
}

export default function NewTestimonyPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Create Testimony
                    </h1>
                    <p className="text-ink-muted">
                        Share a new story of God's grace with the community.
                    </p>
                </div>
            </Reveal>

            <TestimonyForm />
        </div>
    )
}
