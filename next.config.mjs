import createNextIntlPlugin from "next-intl/plugin";
import NextBundleAnalyzer from "@next/bundle-analyzer";
import withExportImages from "next-export-optimize-images";

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export const outDir = "build";

/** @type {import('next').NextConfig} */
let nextConfig = {
    // output: "export",
    distDir: outDir,
    generateEtags: true,
};

// Automatically redirect from / to /en on development
if (process.env.NODE_ENV === "development") {
    nextConfig = {
        ...nextConfig,
        redirects() {
            return [
                {
                    source: "/",
                    destination: "/gr",
                    permanent: true,
                },
            ];
        },
    };
}

export default withBundleAnalyzer(withExportImages(withNextIntl(nextConfig)));
