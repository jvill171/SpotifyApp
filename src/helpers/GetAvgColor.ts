/**
 * Calculates the average color of an image from a given URL.
 *
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<string>} A promise that resolves to the average color in hexadecimal format.
 */
  export const getAverageColor = async (imageUrl: string): Promise<string> => {
    const img = new Image();
  
    return new Promise<string>((resolve, reject) => {
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          reject('Failed to get 2D context from canvas');
          return;
        }
  
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
  
        ctx.drawImage(img, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const length = imageData.data.length;
        let rgb = { r: 0, g: 0, b: 0 };
        let count = 0;
        const blockSize = 5; // only visit every 5 pixels
  
        for (let i = 0; i < length; i += blockSize * 4) {
          ++count;
          rgb.r += imageData.data[i];
          rgb.g += imageData.data[i + 1];
          rgb.b += imageData.data[i + 2];
        }
  
        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
  
        const averageColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        resolve(averageColor);
      };
  
      img.onerror = function() {
        reject('Failed to load image');
      };
  
      img.crossOrigin = 'anonymous';  // Very important for CORS
      img.src = imageUrl;
    });
  };
  