import { useState, useEffect } from 'react';
import { fetchAds } from '../api/ads';
import { AdObject } from '../types';

export const useAds = () => {
  const [ads, setAds] = useState<AdObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchAds();
        setAds(data);
      } catch (err) {
        setError('Failed to fetch ads');
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, []);

  return { ads, loading, error };
};
