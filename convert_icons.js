const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Check if ImageMagick is installed
exec('convert -version', (error) => {
  if (error) {
    console.error('Error: ImageMagick is required for this script to work.');
    console.error('Please install ImageMagick:');
    console.error('  - macOS: brew install imagemagick');
    console.error('  - Ubuntu/Debian: sudo apt-get install imagemagick');
    console.error('  - Windows: Download from https://imagemagick.org/script/download.php');
    process.exit(1);
  }

  // Paths
  const svgPath = path.join(__dirname, 'images', 'icon.svg');
  const sizes = [16, 48, 128];

  // Check if SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error(`SVG file not found: ${svgPath}`);
    process.exit(1);
  }

  // Convert SVG to PNGs for each size
  sizes.forEach(size => {
    const outputPath = path.join(__dirname, 'images', `icon${size}.png`);
    const command = `convert -background none -size ${size}x${size} "${svgPath}" "${outputPath}"`;

    console.log(`Converting to ${size}x${size} PNG...`);
    exec(command, (error) => {
      if (error) {
        console.error(`Error converting to ${size}x${size}:`, error);
        return;
      }
      console.log(`Created ${outputPath}`);
    });
  });
}); 