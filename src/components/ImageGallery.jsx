import ImageCard from "./ImageCard";
import s from "./ImageGallery.module.css"


const ImageGallery =({images, onImageClick}) => {
    return(
     
        <ul className={s.gallery}>
        {images.map((img) => (
          <li key={img.id} className={s.galleryItem}>
            <ImageCard image={img} onClick={onImageClick} />
          </li>
        ))}
      </ul>
    )
}

export default ImageGallery;