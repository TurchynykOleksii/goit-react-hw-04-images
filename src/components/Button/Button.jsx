import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ loadMoreImages }) => {
  return (
    <button type="button" className={css.button} onClick={loadMoreImages}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMoreImages: PropTypes.func,
};
