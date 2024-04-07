import { blog1Image } from "@/public";

const blog = {
    _id:'02',
    title: "Blog - 2",
    thumbnail: blog1Image.src,
    thumnailAlt: "handshake",
    segments: [
        {text: "Pakistan boasts a rich talent pool and a young, energetic workforce. As the global job market evolves, seeking overseas employment has become an increasingly attractive option for many Pakistanis. This article explores the expanding scope of overseas employment opportunities and the factors driving this trend."},
        {
            heading: "Drivers of Overseas Employment:",
            list: [
                { heading: "Skill Demand:", text: "There's a growing demand for skilled professionals across various sectors worldwide, including healthcare, IT, engineering, and hospitality. Pakistanis with relevant qualifications and experience find themselves well-positioned to fill these gaps."},

                { heading: "Competitive Salaries:", text: "International job markets often offer significantly higher salaries compared to domestic opportunities. This can be a major motivator for individuals seeking financial security and improved living standards for themselves and their families."},

                { heading: "Career Growth:", text: "Overseas opportunities often provide access to advanced training, exposure to international best practices, and potential career advancement opportunities that may be limited domestically."},

                { heading: "Economic Diversification:", text: "Remittances sent back by overseas Pakistanis play a crucial role in supporting the national economy. In 2023, these remittances reached a record high, highlighting the significant financial contribution of Pakistani expatriates."},
            ]
        },
        {
            heading: "Scope of Overseas Employment:",
            list: [
                {
                    heading: "Traditional Sectors:",
                    text: "The Middle East remains a key destination for Pakistani blue-collar workers in construction, security, and hospitality. However, the demand is steadily increasing for skilled professionals in these regions as well."
                },
                {
                    heading: "Emerging Markets:",
                    text: "Southeast Asia, particularly Malaysia and Singapore, offer promising opportunities for professionals in IT, finance, and engineering."
                },
                {
                    heading: "Developed Nations:",
                    text: "European countries like Germany and Scandinavian nations face demographic challenges, creating a demand for skilled workers in various sectors. This opens doors for Pakistani professionals with relevant qualifications and language proficiency."
                },
            ]
        }
    ]
}

export default blog;