import { useState, useEffect } from 'react';

const useImageCache = (imageUrl) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      return;
    }

    // Create a new image object to preload
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setLoading(false);
    };

    img.onerror = () => {
      console.error('Error loading image:', imageUrl);
      setLoading(false);
    };
  }, [imageUrl]);

  return { cachedImage: imageUrl, loading };
};

export default useImageCache; 