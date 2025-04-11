import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <ClipLoader size={35} color="#36d7b7" />
    </div>
  );
};

export default Loader;
