export const SITE = {
  name: "Global Peace Christian Centre",
  shortName: "GPCC",
  tagline: "· Bible-Believing · Life-Giving · Charismatic · Pentecostal",
  description:
    "A peaceful sanctuary in Accra-North where every visitor is welcomed into worship, community, and purpose.",
  contact: {
    address:
      "P.O. Box AN 11587, Accra-North · Ablor Adjei, Off The Agbogba-Abokobi Road",
    phones: ["+233 (208) 180 188", "+233 (246) 224 766"],
    email: "info@gpcconline.org",
    mapUrl: "https://www.google.com/maps/place/5.7171585,-0.2102711",
  },
  social: {
    facebook: "https://www.facebook.com/GlobalPeaceChristianCentre/",
    youtube: "https://www.youtube.com/channel/UCudojbvqQOsf6ulSWu5vV8w",
    whatsapp: "https://whatsapp.com/channel/0029Vb71EIeCMY09nXOeuG3c",
  },
  newsletter: "https://formspree.io/f/xblzaqyv",
} as const

export type NavChild = { label: string; href: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

export type PastorMessageBlock =
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }
  | { type: "signature"; content: string[] }

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about/who-we-are" },
      { label: "The Leadership", href: "/about/leadership" },
      { label: "Community Journey", href: "/about/community-journey" },
      { label: "Ministries", href: "/ministries" },
    ],
  },
  { label: "Testimonies", href: "/about/testimonies" },
  { label: "Events", href: "/events" },
  { label: "Media Center", href: "/media-center" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

export const SERVICE_TIMES = [
  {
    day: "Wednesday",
    service: "Bible Teaching",
    time: "6:30 PM – 8:30 PM",
    description: "Dive deeper into God's Word through structured, practical teaching designed to strengthen your faith and equip you for daily life.",
  },
  {
    day: "Friday",
    service: "Prayer Meeting",
    time: "6:30 PM – 8:30 PM",
    description: "Join us in corporate prayer and intercession as we seek God together for breakthrough, healing, and direction as a church family.",
  },
  {
    day: "Saturday",
    service: "Healing & Deliverance",
    time: "8:30 – 10:30 AM",
    description: "A dedicated time of ministry for those seeking physical, emotional, and spiritual healing through prayer and the power of God.",
  },
  {
    day: "Sunday",
    service: "Church Service",
    time: "8:30 – 11:30 AM",
    description: "Our main gathering — worship, the Word, and warm fellowship as one family, open to everyone regardless of where you are in your journey.",
  },
] as const

export const MEDIA_STATIONS = [
  { name: "TV3", schedule: "Saturdays · 6:00 – 6:30 AM", location: "Accra" },
  { name: "Sunny FM 95.1", schedule: "Tuesdays · 10:00 – 10:30 PM", location: "Accra" },
  { name: "Spirit FM 96.3", schedule: "Mon – Fri · 11:10 – 11:40 AM", location: "Kumasi" },
  { name: "ATL FM 100.5", schedule: "Sat 5:30 AM · Mon 9:00 PM", location: "Cape Coast" },
] as const

export const MINISTRIES = [
  {
    name: "Men's Ministry",
    icon: "Shield",
    description: "Building men of faith, strength, and purpose.",
    image: "/images/media/men-ministry.webp",
  },
  {
    name: "Women's Ministry",
    icon: "Heart",
    description: "Empowering women through grace and fellowship.",
    image: "/images/media/womenier.webp",
  },
  {
    name: "Youth Ministry",
    icon: "Zap",
    description: "Raising a generation on fire for God.",
    image: "/images/media/youtt.webp",
  },
  {
    name: "Children's Ministry",
    icon: "Baby",
    description: "Nurturing young hearts in God's love.",
    image: "/images/media/children-ministry.png",
  },
] as const

export const TESTIMONIES = [
  {
    title: "A Miracle of Survival",
    person: "Mr. Alexander Gogoe",
    excerpt:
      "An unforgettable testimony of God's preserving hand through impossible circumstances.",
    image: "/images/media/miracle.jpg",
  },
  {
    title: "Jesus Walks Into My Room",
    person: "From the GPCC Community",
    excerpt:
      "A collection of encounters with the living Christ — written by everyday believers.",
    image: "/images/media/jwimr.jpg",
  },
] as const

export const GALLERY_PREVIEW = [
  "/images/gallery/g1.jpg",
  "/images/gallery/g2.jpg",
  "/images/gallery/g3.jpg",
  "/images/gallery/g4.jpg",
  "/images/gallery/g5.jpg",
  "/images/gallery/g6.jpg",
] as const

export const PASTOR = {
  name: "Apostle Henry Ampomah-Boateng",
  role: "Founder & Chairman · GPCC",
  portrait: "/images/pastors/founder.jpg",
  shortMessage:
    "It is a joy to introduce you to the Global Peace Christian Centre(GPCC)! Our passion is to provide a place where you can have a life changing experience with Jesus Christ our Lord, Master and Saviour and offer you the opportunity to grow spiritually",
  fullMessage: [
    { type: "paragraph", content: "Dear Beloved," },
    {
      type: "paragraph",
      content:
        "It is a joy to introduce you to the Global Peace Christian Centre (GPCC)! Our passion is to provide a place where you can have a life changing experience with Jesus Christ our Lord, Master and Saviour and offer you the opportunity to grow spiritually.",
    },
    {
      type: "paragraph",
      content:
        "At GPCC, we believe that every person matters to God and should matter to the church. Whether you're taking your first steps in faith or you've been following Jesus for years, we want to help you discover your next steps toward God and connecting with others.",
    },
    {
      type: "paragraph",
      content:
        "We are a Bible-believing, life-giving, charismatic, and Pentecostal church committed to creating an environment where:",
    },
    {
      type: "list",
      items: [
        "Hearts are transformed through powerful worship and relevant Bible teaching",
        "Families are strengthened and equipped for life's journey",
        "Communities are impacted with God's love and grace",
        "Lives are connected to God's purpose and plan",
      ],
    },
    {
      type: "paragraph",
      content:
        "Our beautiful worship facility is designed to create an atmosphere where hearts meet the presence of God.",
    },
    {
      type: "paragraph",
      content:
        "We invite you to join us as we step in, be still, and discover the peace that only Christ can give. The doors are open — and so are our hearts.",
    },
    {
      type: "paragraph",
      content: "May God's abundant blessings be upon you and your family.",
    },
    {
      type: "signature",
      content: [
        "In His Service,",
        "Apostle Henry Ampomah-Boateng",
        "Founder & Chairman, GPCC",
      ],
    },
  ] as PastorMessageBlock[],
} as const

export const THEME_2026 = {
  label: "Theme for 2026",
  scripture: "Hear the Word, Understand It, Bear Fruit a Hundredfold",
  reference: "Matthew 13:23",
} as const
