const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

async function generateIcons() {
  const sizes = [16, 48, 128];
  const svgPath = path.join(__dirname, 'images', 'icon.svg');

  // Check if SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error(`SVG file not found: ${svgPath}`);
    console.error('Please run: npm install canvas --save-dev');
    return;
  }

  try {
    console.log('Loading SVG image...');
    const image = await loadImage(svgPath);

    for (const size of sizes) {
      console.log(`Generating ${size}x${size} icon...`);
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');

      // Draw the image
      ctx.drawImage(image, 0, 0, size, size);

      // Save to PNG
      const outputPath = path.join(__dirname, 'images', `icon${size}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Saved ${outputPath}`);
    }

    console.log('Icon generation complete!');
  } catch (error) {
    console.error('Error generating icons:', error);
    console.log('Alternative: Open images/generate_placeholder_icons.html in a browser to generate icons manually');
  }
}

// Check if canvas module is installed
try {
  require.resolve('canvas');
  generateIcons();
} catch (error) {
  console.error('The "canvas" package is required for this script to work.');
  console.error('Install it using: npm install canvas --save-dev');
  console.error('Alternatively, open images/generate_placeholder_icons.html in a browser to generate icons manually');
} 