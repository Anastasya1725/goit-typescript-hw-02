import React from 'react';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description?: string;
  likes: number;
  user: {
    profile_image: {
      small: string;
    };
    name: string;
    links: {
      html: string;
    };
  };
}

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div onClick={() => onClick(image)} style={{ cursor: 'pointer' }}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
