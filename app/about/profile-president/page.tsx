import type { Metadata } from "next"
import { ProfilePresidentClient } from "./_components/profile-president-client"

export const metadata: Metadata = {
    title: "Apostle Henry Ampomah-Boateng | GPCC",
    description:
        "Profile of Apostle Henry Ampomah-Boateng, Founder & Chairman of Global Peace Christian Centre (GPCC).",
}

export default function ProfilePresidentPage() {
    return <ProfilePresidentClient />
}
