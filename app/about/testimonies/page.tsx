import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { getPublishedTestimonials } from "@/lib/actions/testimonies"
import { TestimoniesList } from "./_components/testimonies-list"

export const metadata = {
    title: "Testimonies",
    description: "Stories of faith, restoration, and divine encounter at Global Peace Christian Centre.",
}

export default async function TestimoniesPage() {
    const testimonies = await getPublishedTestimonials()

    return (
        <>
            <PageHero
                pageKey="testimonies"
                eyebrow="Testimonies"
                title="Stories of God's goodness."
                description="We overcome by the blood of the Lamb and by the word of our testimony. Read how God is moving in the lives of our community."
            />
            <ParallaxContent>
                <TestimoniesList testimonies={testimonies} />
            </ParallaxContent>
        </>
    )
}
