import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onImageClick, largeImgUrl }) => {
  useEffect(() => {
    const handleKeyESC = event => {
      if (event.code === 'Escape') {
        onImageClick('');
      }
    };

    window.addEventListener('keydown', handleKeyESC);

    return () => window.removeEventListener('keydown', handleKeyESC);
  }, [onImageClick]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onImageClick('');
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <img className={css.largeImage} src={largeImgUrl} alt="img" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onImageClick: PropTypes.func,
  largeImg: PropTypes.string,
};
