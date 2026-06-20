export interface JourneyPhoto {
    src: string | undefined;
    alt: string;
}

export interface JourneyEntry {
    id: string;
    year: string;
    pill?: string;
    summary: string;
    readMoreLabel: string;
    readMoreText: string;
    heroImage?: string;
    galleryPhotos: JourneyPhoto[];
}

export const journeyEntries: JourneyEntry[] = [
    {
        id: "y1994",
        year: "1994",
        pill: "Ministry began",
        summary:
            "From a university calling to action: the message that began in the halls of KNUST matured into weekly preaching and prayer. Small living-room fellowships formed the nucleus of a growing family of faith.",
        readMoreLabel: "Read more about 1994",
        readMoreText:
            "Home fellowships, prayer nights, and teaching gatherings that set our rhythm.",
        heroImage: undefined,
        galleryPhotos: [],
    },
    {
        id: "y2013",
        year: "September 2013",
        summary:
            "We moved into the PEACE TEMPLE—our first church building. Ministry seats expanded, teams multiplied, and the sanctuary became a home for worship, training, and community service.",
        readMoreLabel: "View moments from 2013",
        readMoreText:
            "A season of transition: setting up departments, training volunteers, and welcoming neighbors into the new space.",
        heroImage: "/images/events/journey-2013-1.png",
        galleryPhotos: [
            { src: "/images/events/journey-2013-a.jpg", alt: "First service moments" },
            { src: undefined, alt: "Worship team" },
            { src: undefined, alt: "Community gathering" },
            { src: undefined, alt: "Prayer and dedication" },
            { src: undefined, alt: "Fellowship after service" },
            { src: undefined, alt: "Temple exterior and setup" },
        ],
    },
    {
        id: "y2016",
        year: "October 2016",
        pill: "Commissioning of PEACE TEMPLE",
        summary:
            "A defining milestone: formal commissioning of the PEACE TEMPLE. From that altar, new outreaches, trainings, and care ministries launched—deepening our city-wide impact.",
        readMoreLabel: "View moments from 2016",
        readMoreText:
            "Celebrating God's faithfulness: a collection of moments from the commissioning service and community outreach.",
        heroImage: "/images/events/journey-2016-1.jpg",
        galleryPhotos: [
            { src: "/images/events/journey-2016-2.jpg", alt: "Dedication service" },
            { src: undefined, alt: "Ribbon cutting" },
            { src: undefined, alt: "Worship celebration" },
            { src: undefined, alt: "Leaders and guests" },
        ],
    },
    {
        id: "y2020",
        year: "2020",
        pill: "Adapting through Crisis",
        summary:
            "In response to the global pandemic, we transitioned to virtual services, reaching wider audiences and innovating new forms of community care and engagement.",
        readMoreLabel: "View moments from 2020",
        readMoreText: "",
        heroImage: "/images/events/journey-2020-2.jpg",
        galleryPhotos: [
            { src: "/images/events/journey-2020-1.jpg", alt: "Streaming setup" },
            { src: "/images/events/journey-2020-2.jpg", alt: "Online prayer room" },
        ],
    },
];
