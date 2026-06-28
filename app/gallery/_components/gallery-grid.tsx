import { getAlbums } from "@/lib/actions/gallery"
import { GalleryGridClient } from "./gallery-grid-client"

export async function GalleryGrid() {
  const allAlbums = await getAlbums()
  const visibleAlbums = allAlbums.filter(album => album.visible)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <GalleryGridClient albums={visibleAlbums} />
      </div>
    </section>
  )
}
