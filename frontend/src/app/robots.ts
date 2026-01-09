import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard/', // Optional: Disallow crawling the private dashboard
        },
        sitemap: 'https://minitask.vercel.app/sitemap.xml',
    };
}
