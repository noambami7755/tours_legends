import { useState, useEffect, useCallback } from 'react';
import { fetchPosts } from '../api/posts';
import { CleanPost } from '../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<CleanPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = useCallback(async (pageNum: number, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const newPosts = await fetchPosts(pageNum);
      if (newPosts.length < 20) {
        setHasMore(false);
      }

      setPosts((prev) => (isRefresh ? newPosts : [...prev, ...newPosts]));
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(1, true);
  }, [loadPosts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPosts(nextPage);
    }
  }, [loading, hasMore, page, loadPosts]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true);
  }, [loadPosts]);

  return { posts, loading, error, loadMore, refresh, refreshing, hasMore };
};
