import { resolve } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['utfs.io'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'utfs.io'
        }]
    },
    reactStrictMode: false,
    webpack: {
        resolve: {
            alias: {
                'express-handlebars': 'handlebars/dist/handlebars.js'
            }
         }
    }
};

export default nextConfig;
