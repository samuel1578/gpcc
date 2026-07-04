import { getSpotlightImages } from "@/lib/actions/spotlight"
import { GallerySectionClient } from "./gallery-section-client"

export async function GallerySection() {
  const spotlightImages = await getSpotlightImages()
  return <GallerySectionClient images={spotlightImages} />
}
