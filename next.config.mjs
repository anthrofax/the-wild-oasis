/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'atkzebbcihfbeturprwu.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/cabin-images/**',
          },
        ],
      },
};

export default nextConfig;
