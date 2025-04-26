import { useState, useEffect } from 'react';

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const useImageCache = (imageUrl) => {
  const [cachedImage, setCachedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    const loadImage = async () => {
      try {
        // Check if image is in cache
        const cache = localStorage.getItem('imageCache');
        const parsedCache = cache ? JSON.parse(cache) : {};
        
        // Check if cached image exists and is not expired
        if (parsedCache[imageUrl] && 
            Date.now() - parsedCache[imageUrl].timestamp < CACHE_EXPIRY) {
          setCachedImage(parsedCache[imageUrl].data);
          setLoading(false);
          return;
        }

        // If not in cache or expired, fetch the image
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        // Update cache
        parsedCache[imageUrl] = {
          data: objectUrl,
          timestamp: Date.now()
        };
        localStorage.setItem('imageCache', JSON.stringify(parsedCache));

        setCachedImage(objectUrl);
      } catch (error) {
        console.error('Error loading image:', error);
        // Fallback to original URL if caching fails
        setCachedImage(imageUrl);
      } finally {
        setLoading(false);
      }
    };

    loadImage();

    // Cleanup function to revoke object URLs
    return () => {
      if (cachedImage && cachedImage.startsWith('blob:')) {
        URL.revokeObjectURL(cachedImage);
      }
    };
  }, [imageUrl]);

  return { cachedImage, loading };
};

export default useImageCache; 