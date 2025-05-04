// This file contains base64-encoded PNG data for minimal icons
// Run this script with Node.js to create the icon files

const fs = require('fs');
const path = require('path');

// Base64-encoded PNG data for a blue 16x16 icon
const icon16Data = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAABmSURBVDhP3Y9BCsAwDMP6/0/vEYRQlzQ9jcHggyKrhvoRE/l+b/p3NxvmKsiqQVaNQ54CWTXIqnHIUyCrBlk1DnkKZNUgq8YhT4GsGmTVOOQpkFWDrBqHPAWyapBV45CnUHfzAj/sIdv7mYhwAAAAAElFTkSuQmCC';

// Base64-encoded PNG data for a blue 48x48 icon
const icon48Data = 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAAC7SURBVGhD7ZBBCsAwDMP6/09XCKFuSSiMwZCDqNbVTx6r+7zN3I2a2QvN7IVm9kIze6GZvdDMXmhmLzSzF5rZC83shWb2QjN7oZm90MxeaGYvNLMXmtkLzeyFZvZCM3uhmdwLXaX3Qlfpf/BCnQm96U2oQ296E+pQb3oT6lBvehPqUG96E+pQb3oT6lBvehPqUG96E+pQb3oT6lBvehPqUG96E+pQb3oT6lBvehPqUG96E+pQh3pTL8zsBTPrsQa4Z9a3sxf1qgAAAABJRU5ErkJggg==';

// Base64-encoded PNG data for a blue 128x128 icon
const icon128Data = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAAC5SURBVHhe7dABDQAgEAAx7L/p48EHQtIqyHlm7nF5wNDnAUOfBwx9HjD0ecDQ5wFDnwcMfR4w9HnA0OcBQ58HDH0eMPR5wNDnAUOfBwx9HjD0ecDQ5wFDnwcMfR4w9HnA0OcBQ58HDH0eMPR5wNDnAUOfBwx9HjD0ecDQ5wFDnwcMfR4w9HnA0OcBQ58HDH0eMPR5wNDnAUOfBwx9HjD0ecDQ5wFDnwcMfR4w9HnA0OcBQ58HDH0eMPR5wNDnAUOfBwx9HjD0ecDQ5wFDnwcMfR4w9HnA0OcBQ58HDH0eMPQtZ1+qUl9EiEDnCwAAAABJRU5ErkJggg==';

// Function to write base64 data to file
function writeBase64ToFile(base64Data, outputPath) {
  const data = base64Data.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(data, 'base64');

  fs.writeFileSync(outputPath, buffer);
  console.log(`Created ${outputPath}`);
}

// Ensure images directory exists
const imagesDir = path.join(__dirname);
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Write the icon files
writeBase64ToFile(icon16Data, path.join(imagesDir, 'icon16.png'));
writeBase64ToFile(icon48Data, path.join(imagesDir, 'icon48.png'));
writeBase64ToFile(icon128Data, path.join(imagesDir, 'icon128.png'));

console.log('All icon files created successfully!'); 