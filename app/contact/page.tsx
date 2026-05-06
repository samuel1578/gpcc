import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { ContactBlock } from "./_components/contact-block"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to Christ Apostolic Church Igbalubi. We&apos;d love to hear from you.",
}

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        title="We&apos;d love to hear from you"
        description="Whether you have a prayer request, a question, or just want to say hello, our doors and inbox are always open."
      />
      <ParallaxContent>
        <ContactBlock />
      </ParallaxContent>
    </PageTransition>
  )
}
