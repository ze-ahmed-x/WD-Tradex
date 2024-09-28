import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{
            userAgent: "*", // * means all
            allow: "/",
            disallow: ['/admin']
        }],
        sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml` // dont know why it is required, maybe to give search engines the site map
    }
}