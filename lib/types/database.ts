export interface Testimony {
    id: string;
    created_at: string;
    updated_at: string | null;
    title: string;
    slug: string;
    person_name: string | null;
    person_role: string | null;
    category: string | null;
    excerpt: string;
    content: string | null;
    quote: string | null;
    scripture_reference: string | null;
    cover_image_url: string | null;
    is_published: boolean;
    is_featured: boolean;
    is_confidential: boolean;
    display_order: number;
}
