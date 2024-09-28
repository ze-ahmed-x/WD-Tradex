import { getAllJobsRaw } from "@/lib/database/actions/job.actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allJobs = await getAllJobsRaw();
    let jobEntries : MetadataRoute.Sitemap = []
    if (allJobs) {
        jobEntries = allJobs.map((jb:any) => ({
            url: `${process.env.NEXTAUTH_URL}/jobs/${jb._id}`,
            lastModified: new Date(jb.updatedAt),
            changeFrequency: "weekly"
        }))
    }
    return [
        {
            url: `${process.env.NEXTAUTH_URL}/about`,
            // lastModified: new Date()
            // changeFrequency: "weekly"
            // changeFrequency: // how often the page is changed
        },
        {
            url: `${process.env.NEXTAUTH_URL}/blog`,
        },
        {
            url: `${process.env.NEXTAUTH_URL}/contact`,
        },
        {
            url: `${process.env.NEXTAUTH_URL}/faqs`,
        },
        {
            url: `${process.env.NEXTAUTH_URL}/services`,
        },
        {
            url: `${process.env.NEXTAUTH_URL}/signup`,
        },
        ...jobEntries
    ]
}