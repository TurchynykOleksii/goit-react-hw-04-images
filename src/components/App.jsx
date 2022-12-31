import { useState, useEffect } from 'react';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { getImages } from 'services/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

const PER_PAGE = 12;

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await getImages(searchQuery, page);

        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        setSearchData(prev => [...prev, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / PER_PAGE));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  const onImageClick = largeImgUrl => {
    setLargeImgUrl(largeImgUrl);
  };

  const loadMoreImages = () => {
    setPage(prev => prev + 1);
  };

  const onSubmit = searchQuerys => {
    if (searchQuerys === searchQuery) {
      alert('same query, try change your request');
      return;
    }
    setSearchQuery(searchQuerys);
    setSearchData([]);

    setPage(1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {searchData.length > 0 && (
        <ImageGallery searchData={searchData} onImageClick={onImageClick} />
      )}
      {isLoading && (
        <div className={css.backdrop}>
          <Loader />
        </div>
      )}
      {isEmpty && (
        <p className={css.text}>
          Nothing was found by the request '{searchQuery}'.
        </p>
      )}
      {error && <p className={css.text}>Something wrong! {error}</p>}
      {showBtn && <Button loadMoreImages={loadMoreImages} />}
      {largeImgUrl && (
        <Modal onImageClick={onImageClick} largeImgUrl={largeImgUrl} />
      )}
    </div>
  );
};

// export class App extends Component {

//   async componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;

//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       try {
//         this.setState({ isLoading: true });
//         const { hits, totalHits } = await getImages(searchQuery, page);

//         if (hits.length === 0) {
//           this.setState({ isEmpty: true });
//           return;
//         }
//         this.setState(prevState => ({
//           searchData: [...prevState.searchData, ...hits],
//           showBtn: page < Math.ceil(totalHits / PER_PAGE),
//         }));
//       } catch (error) {
//         this.setState({ error: error.message });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   render() {
//     const {
//       searchData,
//       searchQuery,
//       error,
//       isEmpty,
//       isLoading,
//       showBtn,
//       largeImgUrl,
//     } = this.state;
//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.onSubmit} />
//         {searchData.length > 0 && (
//           <ImageGallery
//             searchData={searchData}
//             onImageClick={this.onImageClick}
//           />
//         )}
//         {isLoading && (
//           <div className={css.backdrop}>
//             <Loader />
//           </div>
//         )}
//         {isEmpty && (
//           <p className={css.text}>
//             Nothing was found by the request '{searchQuery}'.
//           </p>
//         )}
//         {error && <p className={css.text}>Something wrong! {error}</p>}
//         {showBtn && <Button loadMoreImages={this.loadMoreImages} />}
//         {largeImgUrl && (
//           <Modal onImageClick={this.onImageClick} largeImgUrl={largeImgUrl} />
//         )}
//       </div>
//     );
//   }
// }
