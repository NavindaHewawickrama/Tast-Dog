// // /** @type {import('next').NextConfig} **/
// // Import the default export from 'next/config.js'
// import pkg from 'next/config.js';

// // Destructure the default export to access 'nextConfig'
// const { nextConfig } = pkg;


// export default nextConfig({
//     images:{
//         domains:['res.cloudinary.com'],
//     },
// });
import nextConfig from 'next/config.js';

const { images } = nextConfig; // Destructure images object

export default {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'example.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'source.unsplash.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**',
          },
        ],
      },
};
