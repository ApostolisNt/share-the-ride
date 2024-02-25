let outputPath = "build";
if (process.env.APOSTOLIS_MODE !== undefined) {
    console.log("Running in Apostolis mode");
    outputPath = ".next";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: outputPath,
  // Leave it false, so the generated html files
  // are not in the format of [slug]/index.html
  // but in the format of [slug].html. This is
  // important for the 404.html file to work
  trailingSlash: false,
  generateEtags: true,
  transpilePackages: ["next-image-export-optimizer"],
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    // https://github.com/Niels-IO/next-image-export-optimizer
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
    // Any images found in /public/original will be optimized
    // and copied to /public/optimized-images
    nextImageExportOptimizer_imageFolderPath: "public/original",
    nextImageExportOptimizer_exportFolderName: "optimized-images",
    nextImageExportOptimizer_exportFolderPath: outputPath,
  },
};

// -- Image optimization
// https://github.com/Niels-IO/next-image-export-optimizer?tab=readme-ov-file#installation
