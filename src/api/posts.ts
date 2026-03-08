import axios from 'axios';
import { Config } from '../config';
import { CleanPost, WPPost, WPPostRaw } from '../types';
import { decode } from 'he';

const api = axios.create({
  baseURL: Config.BASE_URL,
});

export const fetchPosts = async (page: number = 1): Promise<CleanPost[]> => {

  const perPage = page === 1 ? 20 : 30;
  try {
    const response = await api.get<WPPostRaw[]>(`/${Config.DATA_TYPE_EP}`, {
      params: {
        per_page: perPage,
        page,
        _embed: true,
        _fields: 'id,title,status,featured_media,_links,_embedded',
      },
    });

    const cleanPosts = response.data.filter((post) => post.status === 'publish').map((post) => {
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      
      const image =
        featuredMedia?.media_details?.sizes?.thumbnail?.source_url ||
        featuredMedia?.media_details?.sizes?.medium?.source_url ||
        featuredMedia?.source_url ||
        null;

      return {
        id: post.id,
        title: decode(post.title.rendered),
        status: post.status,
        image,
      };
    });


    return cleanPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Error fetching posts');
  }
};

export const fetchPost = async (id: number): Promise<WPPost> => {
  try {
    const response = await api.get<WPPost>(`/${Config.DATA_TYPE_EP}/${id}`, {
      params: {
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw new Error(`Error fetching post ${id}`);
  }
};
