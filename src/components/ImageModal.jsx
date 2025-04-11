import Modal from 'react-modal';
import { useEffect } from 'react';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>{image.description || 'No description available'}</p>
      <p>Likes: {image.likes}</p>
      <div>
        <img src={image.user.profile_image.small} alt={image.user.name} />
        <a href={image.user.links.html} target="_blank" rel="noreferrer">
          {image.user.name}
        </a>
      </div>
    </Modal>
  );
};

export default ImageModal;
