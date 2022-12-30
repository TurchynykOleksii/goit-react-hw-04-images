import { Component } from 'react';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { getImages } from 'services/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    searchData: [],
    error: null,
    page: 1,
    largeImgUrl: '',
    isEmpty: false,
    isLoading: false,
    showBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await getImages(searchQuery, page);

        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          searchData: [...prevState.searchData, ...hits],
          showBtn: page < Math.ceil(totalHits / PER_PAGE),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onImageClick = largeImgUrl => {
    this.setState({ largeImgUrl });
  };

  loadMoreImages = () => {
    this.setState({ page: this.state.page + 1 });
  };

  onSubmit = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        searchData: [],
        error: null,
        page: 1,
        isEmpty: false,
        showBtn: true,
      });
    }
  };

  render() {
    const {
      searchData,
      searchQuery,
      error,
      isEmpty,
      isLoading,
      showBtn,
      largeImgUrl,
    } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {searchData.length > 0 && (
          <ImageGallery
            searchData={searchData}
            onImageClick={this.onImageClick}
          />
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
        {showBtn && <Button loadMoreImages={this.loadMoreImages} />}
        {largeImgUrl && (
          <Modal onImageClick={this.onImageClick} largeImgUrl={largeImgUrl} />
        )}
      </div>
    );
  }
}
