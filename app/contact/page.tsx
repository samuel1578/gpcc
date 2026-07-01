import type { Metadata } from "next"
import Image from "next/image"
import { PageTransition } from "@/components/motion/page-transition"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { ContactBlock } from "./_components/contact-block"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to Christ Apostolic Church Igbalubi. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/hero22.webp"
          alt="Christ Apostolic Church Igbalubi"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Whether you have a prayer request, a question, or just want to say hello, our doors and inbox are always open.
          </p>
        </div>
      </section>
      <ParallaxContent>
        <ContactBlock />
      </ParallaxContent>
    </PageTransition>
  )
}