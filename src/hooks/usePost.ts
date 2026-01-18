import { useState, useEffect } from 'react';
import { fetchPost } from '../api/posts';
import { WPPost } from '../types';

export const usePost = (id: number) => {
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPost(id);
        setPost(data);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  return { post, loading, error };
};
