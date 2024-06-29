import { resolve } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
