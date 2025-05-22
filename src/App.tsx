import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage";
import ImageModal from "./components/ImageModal";

const ACCESS_KEY = 'myI32zPgISLilMdPIF3xAVvWYLTreLyDEvK2U0C00rs';

interface User {
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

interface UnsplashApiResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

const fetchImages = async (
  searchTerm: string,
  page: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  setImages: React.Dispatch<React.SetStateAction<Image[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
) => {
  setLoading(true);
  setError(false);

  try {
    const response = await axios.get<UnsplashApiResponse>('https://api.unsplash.com/search/photos', {
      params: {
        query: searchTerm,
        page,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    setImages(prev =>
      page === 1 ? response.data.results : [...prev, ...response.data.results]
    );
    setTotalPages(response.data.total_pages);
  } catch (err) {
    setError(true);
    console.error('Error fetching images:', err);
    toast.error('Failed to fetch images');
  } finally {
    setLoading(false);
  }
};

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
    fetchImages(searchTerm, 1, setLoading, setError, setImages, setTotalPages);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage, setLoading, setError, setImages, setTotalPages);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {error ? (
        <ErrorMessage />
      ) : (
        <div>
          {images.length > 0 && (
            <ImageGallery images={images} onImageClick={handleImageClick} />
          )}

          {loading && <Loader />}

          {images.length > 0 && page < totalPages && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </div>
      )}

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
};

export default App;

