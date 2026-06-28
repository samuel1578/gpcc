export async function uploadToR2(filename: string, file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL}/upload/${encodeURIComponent(filename)}`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_SECRET}`,
            },
            body: formData,
        }
    )

    if (!res.ok) throw new Error("Upload failed")
    const data = await res.json()
    return data.publicUrl
}
