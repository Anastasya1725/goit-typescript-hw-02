import React from 'react';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;

  