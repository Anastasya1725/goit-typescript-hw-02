import { useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage";
import ImageModal from "./components/ImageModal";

const ACEES_KEY = 'myI32zPgISLilMdPIF3xAVvWYLTreLyDEvK2U0C00rs';

const fetchImages = async (searchTerm, page, setLoading, setError, setImages, setTotalPages ) => {
    setLoading(true);
    setError(false);

    try{
        const response = await axios.get('https://api.unsplash.com/search/photos',{
            params: {
                query: searchTerm,
                page,
                per_page: 12,
              },
              headers: {
                Authorization: `Client-ID ${'myI32zPgISLilMdPIF3xAVvWYLTreLyDEvK2U0C00rs'}`,
              },
        });

        setImages(prev => page === 1 ? response.data.results : [...prev, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(true);
        console.error('Error fetching images:', err);
        toast.error('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    const App = () => {
        const [images, setImages] = useState([]);
        const [query, setQuery] = useState('');
        const [page, setPage] = useState(1);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);
        const [selectedImage, setSelectedImage] = useState(null);
        const [totalPages, setTotalPages] = useState(1);
      
        const handleSearch = (searchTerm) => {
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
      
        const handleImageClick = (image) => {
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
      }        
      
      export default App;