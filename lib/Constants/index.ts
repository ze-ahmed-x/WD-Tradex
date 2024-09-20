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
    about,
    overseaEmployment,
    mining,
    training,
    globalTrade,
    localTrade,
    alternateEnery,
} from "@/public"

export enum Gender {
    male = 'Male',
    female = 'Female'
}
export enum MaritalStatus {
    married = "Married",
    single = "Single",
    widowed = "Widowed",
    divorced = "Divorced"
}

export enum UserStatus {
    employedLooking = "Employed but Looking for Opportunities",
    unemployedLooking = "Unemployed Seeking Job",
    employedNotLooking = "Employed and not interested in job",
}

export enum UserRole {
    admin,
    seeker
}

export const JobStatus = Object.freeze({
    OPEN: 'open',
    CLOSE: 'close'
});

export const ProjectStatus = Object.freeze({
    OPEN: 'open',
    CLOSE: 'close',
    PAUSE: 'pause',
});

export const ApplicationStatus = Object.freeze({
    applied :'applied',
    selected : 'selected',
    requirementsCompleted: 'requirementsCompleted',
    approved: 'approved',
    rejected: 'rejected'
})

export const navItems = [
    { label: 'Home', href: "/" },
    { label: 'About', href: "/about" },
    { label: 'Services', href: "/services" },
    // { label: 'Job Seekers', href: "/jobSeekers"},
    { label: 'Blog', href: "/blog" },
    { label: 'FAQs', href: "/faqs" },
    { label: 'Jobs', href: "/jobs" },
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
    button: { lebal: "Learn More", route: "/services" }
}

export const listOfReligions = [
    "Atheist",
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Sikhism",
    "Jainism",
    "Confucianism",
    "Taoism",
    "Shinto",
    "Judaism",
    "Baha'i Faith",
    "Tenrikyo",
    "Zoroastrianism",
    "Animism",
    "Traditional African Religions",
    "Indigenous Religions of the Americas",
    "Ancient Egyptian Religion",
    "Ancient Greek Religion",
    "Roman Religion",
    "Norse Religion",
    "Other"
] as const; // Using 'as const' to create a tuple type - A special kind of array with a predefined length and specific types for each of its elements at each index position.

export const processInfo = {
    title: "Process Cycle",
    sub_text: "Steps and their sequence is as follows",
    steps: [
        { seqNo: "1", description: "Requirement Initiated by Employer" },
        { seqNo: "2", description: "Verification by Embassy" },
        { seqNo: "3", description: "Permission Granted by POE Office" },
        { seqNo: "4", description: "Collection of Applications" },
        { seqNo: "5", description: "Shortlisting of Applicants" },
        { seqNo: "6", description: "Tests/ Final Selection" },
        { seqNo: "7", description: "Departure Formalities/ Visa Processing" },
        { seqNo: "8", description: "Fly to Destination" },
    ]
}

export const offerInfo = {
    title: "Offer for Employers and Job Seekers",
    sub_text: "Register with us or let you know you requirements",
    cards: [
        {
            image: { imageSrc: employer, alt: 'Employer' },
            title: "Employers",
            description: "Looking to uplift your organization with new talent? You are the right place! Just let us know, we got you covered",
            buttonInfo: { route: "#contact", lebal: "Contact Us" }
        },
        {
            image: { imageSrc: seeker, alt: 'Seeker' },
            title: "Job Seekers",
            description: "Ger yourself registered with us and we’ll contact you as soon we’ll have a vacancy related to you field",
            buttonInfo: { route: "/signup", lebal: "Register" }
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

export const pageSignupInfo = {
    title: "Register",
    sub_text: "Let us find the right job for you, but you got to give us some basic info about you"
}

export const clientFlags = [
    { countryName: "Crotia", flagSrc: crotiaFlag },
    { countryName: "Germany", flagSrc: germanyFlag },
    { countryName: "Saudia Arabia", flagSrc: ksaFlag },
    { countryName: "Iraq", flagSrc: iraqFlag },
    { countryName: "UAE", flagSrc: uaeFlag },
    { countryName: "Portugal", flagSrc: portugalFlag },
    { countryName: "qatar", flagSrc: qatarFlag },
]

export const aboutUs = {
    image: about.src,
    imageAlt: 'about',
    title: 'Energizing Progress: Empowering People',
    text: [
        "Welcome to TradeX Pioneer, a dynamic and versatile company established in 2022 with a diverse portfolio, we specialize in delivering comprehensive services in overseas employment, mineral and mining expertise, training programs, alternate energy resources, and trade. Our commitment to excellence, innovation, and sustainability drives us to empower individuals and businesses to thrive in the global marketplace.",
        "At TradeX Pioneer, we are dedicated to providing our clients with top-notch services and innovative solutions. What sets us apart is our unwavering focus on professionalism, ethics, and innovation. It is through these core values that we consistently surpass the expectations of our partners worldwide.",
        "We pride ourselves on building strong and lasting partnerships based on trust, reliability, and mutual growth. Our team of dedicated professionals is committed to delivering exceptional results, exceeding client expectations, and contributing to their long-term success",
    ]
}

export const services = [
    {
        image: overseaEmployment,
        imageAlt: 'Overseas Employment',
        title: 'Overseas Employment',
        text: [
            "At Tradex Pioneer, we specialize in providing exceptional overseas employment services to individuals seeking opportunities in Europe, the Middle East, and Gulf countries. Our team of experienced professionals is dedicated to helping job seekers achieve their career goals by connecting them with top employers in these regions.",
            "With years of experience in the industry, we have established ourselves as a reliable and trustworthy provider of overseas employment services. Our mission is to help job seekers find rewarding career opportunities in countries that offer excellent prospects for personal and professional growth.",
            "We work with diverse industries, including healthcare, engineering, hospitality, IT, and more, to provide our clients with a wide range of employment options. Our team of recruitment specialists works closely with each client to understand their unique skills, experience, and preferences, and then match them with employers that best meet their needs",
            "At Tradex Pioneer, we understand that finding a job abroad can be a daunting task. That's why we provide comprehensive support services to help our clients throughout the entire process, from preparing their application materials to arranging for travel and accommodation. Our team is always available to answer questions and provide guidance every step of the way.",
            "If you're looking for a reliable partner to help you find your next overseas employment opportunity, look no further than Tradex Pioneer. Contact us today to learn more about our services and how we can help you achieve your career goals.",
        ]
    },
    {
        image: mining,
        imageAlt: 'Minerals & Mining',
        title: 'Minerals & Mining',
        text: [
            "Tradex Pioneer, your partner in mineral exploration in Pakistan!",
            "At Tradex Pioneer, we specialize in exploring and developing mineral resources in Pakistan, with a particular focus on the AJK and GB regions. Our team ofexperienced professionals has extensive knowledge and expertise in mineralexploration, geology, and mining, and we are dedicated to delivering high-quality results for our clients.",
            "Pakistan is a mineral-rich country with a diverse range of mineral resources, including coal, gold, copper, iron ore, and more. The AJK and GB regions, in particular, are known for their vast reserves of precious and base metals, making them ideal locations for mineral exploration and development.",
            "At Tradex Pioneer, we use the latest technologies and industry best practices to explore and evaluate mineral resources in these regions. We conduct comprehensive geological surveys, including drilling, sampling, and mapping, to identify areas with high mineral potential. We also work closely with local communities and government agencies to ensure that our operations are socially and environmentally responsible.",
            "Our team of experts has extensive experience in mineral exploration and mining, and we have a proven track record of delivering successful projects in Pakistan. We work with a range of clients, from small-scale operators to large international mining companies, to help them unlock the full potential of Pakistan's mineral resources."
        ]
    },
    {
        image: training,
        imageAlt: 'Training',
        title: 'Training',
        text: [
            "At Tradex Pioneer, we specialize in providing high-quality training services to individuals and organizations across a variety of industries. Our training programs are designed to help our clients improve their skills and knowledge in order to enhance their work opportunities both locally and internationally.",
            "We offer a range of training programs at all levels, including semi-technical, technical, educational and profession-based training. Our team of experts has years of experience in the industry and is well-equipped to provide our clients with the knowledge and skills they need to succeed in their chosen fields.",
            "Our training programs are customized to meet the specific needs of our clients. We work closely with our clients to understand their unique requirements and goals, and we develop customized training solutions to meet their specific needs. We use the latest training methods and technologies to ensure that our clients receive the best possible training experience.",
            "Whether you’re an individual looking to improve your skills and knowledge or an organization looking to provide your employees with the training they need to succeed, you can trust Tradex Pioneer to provide you with high-quality training services. Contact us today to learn more about our programs and how we can help you achieve your goals."
        ]
    },
    {
        image: globalTrade,
        imageAlt: 'Global Trade',
        title: 'Global Trade',
        text: [
            "At Tradex Pioneer, we specialize in providing export services for a wide range of products, including industrial equipment, consumer goods, and more. Our team of experts has years of experience in the industry and is well-positioned to help our clients expand their businesses globally.",
            "We work closely with our clients to understand their unique needs and requirements, and we develop customized solutions to meet their specific goals. Our export services include sourcing, procurement, quality control, and logistics, to ensure that our clients receive the high-quality products they need on time and on budget.",
            "In addition to our export services, we also import industry-specific equipment as per our clients' requirements. Our team of experts works tirelessly to ensure that we can source the equipment our clients need, regardless of their specific requirements. We have a strong network of suppliers and manufacturers, both domestic and international, that allows us to provide our clients with the equipment they need to run their businesses smoothly.",
            "Whether you're looking to export goods or import industry-specific equipment, you can trust Tradex Pioneer to provide you with the expertise and support you need to succeed in the global marketplace. Contact us today to learn more about our services and how we can help you achieve your business goals."
        ]
    },
    {
        image: localTrade,
        imageAlt: 'Local Trade',
        title: 'Local Trade',
        text: [
            "At Tradex Pioneer, we specialize in providing a wide range of general order supplies to businesses, organizations, and individuals. Our services include sourcing, procurement, and delivery of a variety of products, from office supplies to industrial equipment, to meet the needs of our clients.",
            "Our team of experts has years of experience in the industry and works tirelessly to ensure that we provide our clients with high-quality products at competitive prices. We work with a diverse range of suppliers to ensure that we can source the products our clients need, regardless of their specific requirements.",
            "At Tradex Pioneer, we believe in building long-term relationships with our clients. We take the time to understand their unique needs and work closely with them to develop customized solutions that meet their specific requirements. Our commitment to customer service and satisfaction is second to none, and we go above and beyond to ensure that our clients are happy with the products and services we provide.",
            "Whether you're a small business, a large corporation, or an individual, you can trust Tradex Pioneer to provide you with the general order supplies you need. Contact us today to learn more about our services and how we can help you meet your supply needs."
        ]
    },
    {
        image: alternateEnery,
        imageAlt: 'Alternate Energy Resources',
        title: 'Alternate Energy Resources',
        text: [
            "As the world grapples with the challenges of climate change and the need to reduce our dependence on fossil fuels, alternate energy resources are becoming increasingly important. At Tradex Pioneer, we believe that the transition to sustainable energy sources is not only necessary but also an opportunity to create new jobs, stimulate economic growth, and improve the quality of life for people around the world.",
            "Our services include the design, installation, and maintenance of hydel, solar, and hydrogen power systems, as well as the supply of allied resources like electric vehicles and battery cells. We work with a range of clients, from homeowners to large corporations, to help them reduce their energy costs and environmental impact.",
            "We believe in a sustainable future, and we are dedicated to helping our clients achieve their goals. If you&#39;re looking for a reliable partner for your alternate energy needs, look no further than Tradex Pioneer. Contact us today to learn more about our services and how we can help you transition to sustainable energy sources."
        ]
    }
]

export const termsConditions = {
    title: "Terms and Conditions for Registration and Use of Services",
    discription: "Please read bellow terms and conditions for registration and use",
    detail: [
        {
            heading: "Acceptance of Terms",
            text: "By registering on this platform, you agree to be bound by these terms and conditions. If you do not accept these terms, you may not use the services provided by this platform."
        },
        {
            heading: "User Eligibility",
            text: "You must be at least 18 years of age and legally capable of entering into binding contracts to register on this platform."
        },
        {
            heading: "Account Security",
            text: "You are responsible for maintaining the confidentiality of your account credentials. You are liable for any activity under your account, and you must notify the platform immediately if there is any unauthorized access or breach."
        },
        {
            heading: "Accuracy of Information",
            text: "You agree to provide accurate and complete information during registration and while applying for jobs. Falsifying or omitting important information may result in the suspension or termination of your account."
        },
        {
            heading: "Use of Personal Information",
            text: "By registering, you agree that the platform may use your personal information as outlined in the Privacy Policy, including sharing your profile with potential employers (i.e., admins). You also acknowledge that you may be contacted by employers or admins through the contact information provided."
        },
        {
            heading: "Job Applications",
            text: "Once registered, you can apply for jobs through the platform. Each application is subject to the specific requirements and terms set by the employers. The platform does not guarantee job placement."
        },
        {
            heading: "No Guarantee of Employment",
            text: "The platform acts as an intermediary between you and employers. We do not guarantee job placements, interviews, or any employment outcomes. Your interaction with employers is independent of the platform."
        },
        {
            heading: "Termination",
            text: "You can terminate your account at any time. The platform also reserves the right to suspend or terminate your account if you violate these terms, engage in fraudulent activities, or misuse the platform."
        },
        {
            heading: "Modifications to Terms",
            text: "The platform reserves the right to modify these terms and conditions at any time. Changes will be communicated through the platform, and your continued use of the services signifies your acceptance of any updated terms."
        },
        {
            heading: "Governing Law",
            text: "These terms and conditions are governed by the laws of Pakistan, and any disputes shall be resolved in the courts of Pakistan."
        },
        {
            heading: "Contact",
            text: "If you have any questions regarding these terms and conditions, you may contact us at contact@tradexpioneer.com."
        },
        
    ]
}