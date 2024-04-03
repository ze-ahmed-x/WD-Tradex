import {
    crotiaFlag,
    germanyFlag,
    ksaFlag,
    iraqFlag,
    uaeFlag,
    portugalFlag,
    qatarFlag,
    employer,
    seeker,
} from "@/public"

export const navItems = [
    { label: 'Home', href: "/" },
    { label: 'About', href: "/about" },
    { label: 'Services', href: "/services" },
    // { label: 'Job Seekers', href: "/jobSeekers"},
    { label: 'Blog', href: "/blog" },
    { label: 'FAQs', href: "/faqs" },
    { label: 'Contact Us', href: "/contact" },
]

export const contactInfo = {
    address: 'Office # 01, 4th Floor, FATA House, G-5/1 Islamabad, Pakistan.',
    phone: "+92-333-1000408",
    email: "team@tradexpioneer.pk"
}

export const introText = {
    title: "Why We Do What We Do",
    description: "At our core, we believe in the transformative power of human potential. We are not merely a company; we are ambassadors of opportunity, dedicated to bridging the gap between talent and opportunity. We facilitate the export of skilled human resources from Pakistan to thriving companies in the Middle East and Europe. We unlock exciting career prospects for Pakistanis and empower businesses abroad to access a dynamic and diverse talent pool. Our mission is to foster a win-win situation, fueling global growth and enriching careers across borders.",
    button: {lebal: "Learn More", route: "/services" }
}

export const processInfo = {
    title: "Process Cycle",
    sub_text: "Steps and their sequence is as follows",
    steps: [
        { seqNo: "1", description: "Requirement Initiated by Employer" },
        { seqNo: "2", description: "Verification by Embassy" },
        { seqNo: "3", description: "Permission Granted by POEPA" },
        { seqNo: "4", description: "Short Listening of Job Seekers" },
        { seqNo: "5", description: "Interview/ Exam" },
        { seqNo: "6", description: "Final Selection" },
        { seqNo: "7", description: "Departure Formalities/ Visa Processing" },
        { seqNo: "8", description: "Start of new era of Life" },
    ]
}

export const offerInfo = {
    title: "Offer for Employers and Job Seekers",
    sub_text: "Register with us or let you know you requirements",
    cards: [
        {
            image: { imageSrc: employer, alt:'Employer'},
            title: "Employers",
            description: "Looking to uplift your organization with new talent? You are the right place! Just let us know, we got you covered",
            buttonInfo: { route: "#contact", lebal: "Contact Us" }
        },
        {
            image: { imageSrc: seeker, alt:'Seeker'},
            title: "Job Seekers",
            description: "Ger yourself registered with us and we’ll contact you as soon we’ll have a vacancy related to you field",
            buttonInfo: { route: "/register", lebal: "Register" }
        }
    ]
}

export const homeContactInfo = {
    title: "Lets Get in Touch",
    sub_text: "Visit us, call us, e-mail us or just simply drop a message",
    description: "We're here to help! Feel free to reach out if you have any questions"
}

export const pageContactInfo = {
    title: "Contact Us",
    sub_text: "Lets get in touch",
    description: "We're here to help! Feel free to reach out if you have any questions"
}

export const clientFlags = [
    { countryName:"Crotia", flagSrc: crotiaFlag },
    { countryName:"Germany", flagSrc: germanyFlag},
    { countryName:"Saudia Arabia", flagSrc: ksaFlag },
    { countryName:"Iraq", flagSrc: iraqFlag},
    { countryName:"UAE", flagSrc: uaeFlag},
    { countryName:"Portugal", flagSrc: portugalFlag},
    { countryName:"qatar", flagSrc: qatarFlag},
]