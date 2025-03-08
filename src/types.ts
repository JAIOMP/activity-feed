export interface Tour {
  id: string;
  name: string;
  display_name: string;
  creator: {
    username: string;
    avatar: {
      src: string;
      alt?: string;
    };
  };
  date: string; // ISO date string
  distance: number; // in meters
  elevation_up: number; // in meters
  elevation_down: number; // in meters
  time_in_motion: number; // in seconds
  status: 'public' | 'private'; // Assuming possible values
  is_premium: boolean; // Converted from string to boolean
  images: { src: string; alt?: string; id: number }[];
  vector_map_image: {
    src: string;
    attribution: string;
  };
  vector_map_image_preview: {
    src: string;
    attribution: string;
  };
}
