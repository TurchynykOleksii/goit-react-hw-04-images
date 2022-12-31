import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputeChange = e => setSearchQuery(e.target.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      alert('enter the query');
      return;
    }
    onSubmit(normalizedQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormBtn}>
          <span className={css.searchFormBtnLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputeChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
};

// export class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };
//   handleInputeChange = e => {
//     this.setState({ searchQuery: e.target.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchQuery.trim() === '') {
//       alert('Enter text');
//       return;
//     }
//     this.props.onSubmit(this.state.searchQuery);
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form className={css.searchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.searchFormBtn}>
//             <span className={css.searchFormBtnLabel}>Search</span>
//           </button>

//           <input
//             className={css.searchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleInputeChange}
//             value={this.state.searchQuery}
//           />
//         </form>
//       </header>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
