export interface User {
  profile_image: {
    small: string;
  };
  name: string;
  links: {
    html: string;
  };
}

export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description?: string;
  likes: number;
  user: User;
}