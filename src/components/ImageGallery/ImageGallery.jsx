import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ searchData, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {searchData.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            largeImg={largeImageURL}
            onImageClick={onImageClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  onImageClick: PropTypes.func,
  searchData: PropTypes.arrayOf(PropTypes.object),
};
