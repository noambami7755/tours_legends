// Raw response from WordPress for the Feed
export interface WPPostRaw {
  id: number;
  status: string;
  featured_media: number;
  title: {
    rendered: string;
  };
  acf?: Record<string, unknown> | unknown[];
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string };
          medium?: { source_url: string };
        };
      };
    }[];
  };
}

// Cleaned Post Object for the UI
export interface CleanPost {
  id: number;
  title: string;
  status: string;
  image: string | null; // Thumbnail preferred, fallback to full
}

// Single Post Full Data
export interface WPPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected?: boolean };
  featured_media: number;
  categories?: number[];
  acf?: Record<string, unknown> | unknown[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string };
          medium?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
  };
}

// Ad Object
export interface AdObject {
  title: string;
  image: string;
  url: string;
}
