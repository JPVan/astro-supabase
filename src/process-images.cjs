const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const imageSize = 150;

// Define paths
const srcImagesPath = path.join(__dirname, './assets/images');
const outputImagesPath = path.join(__dirname, '../public');

// Create output directory if it doesn't exist
fs.ensureDirSync(outputImagesPath);

// Function to process images
function processImages() {
  fs.readdirSync(srcImagesPath).forEach(file => {
    const inputFilePath = path.join(srcImagesPath, file);
    const outputFilePath = path.join(outputImagesPath, `${path.parse(file).name}.avif`);

    // Check if the file is an image
    if (/\.(jpe?g|png|gif)$/i.test(file)) {
      sharp(inputFilePath)
        .resize(imageSize, imageSize) 
        .toFormat('avif') // Convert to AVIF format
        .toFile(outputFilePath)
        .then(() => {
          console.log(`Processed ${file} -> ${outputFilePath}`);
        })
        .catch(err => {
          console.error(`Error processing ${file}:`, err);
        });
    }
  });
}

// Run the image processing
processImages();
