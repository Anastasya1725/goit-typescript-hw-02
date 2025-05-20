import ImageCard from "./ImageCard";
import s from "./ImageGallery.module.css";
import { Image } from '../types';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={s.gallery}>
      {images.map((img) => (
        <li key={img.id} className={s.galleryItem}>
          <ImageCard image={img} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
