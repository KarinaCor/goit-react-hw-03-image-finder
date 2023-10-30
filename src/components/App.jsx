// import { ToastContainer, toast } from 'react-toastify';
import PostsApiService from './helpers/pixabay-api'
import React, { Component } from 'react'
import { Button } from './Button/Button'
import { SearchBar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Loader } from './Loader/Loader'


const postApiService = new PostsApiService();

export default class App extends Component {
  state = {
    seachQuery: ``,
    galleryItems: null,
    galleryPage: 1,
    


    isButtonShow: false,
    loading: false,
    error: null,
  }

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.seachQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;

    if (prevQuery !== nextQuery) {
      this.setState({ galleryPage: 1, galleryItems: [], isButtonShow: false });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });

    postApiService.query = nextQuery;
    postApiService.page = nextPage;

    postApiService.fetchPost().then(data => {
      postApiService.hits = data.totalHits;

      const newData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      const currentData = [...this.state.galleryItems, ...newData];

      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...newData],
      }));

      if (!data.totalHits) {
        this.setState({ loading: false, error: true });
        return alert.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (currentData.length >= data.totalHits) {
        this.setState({
          loading: false,
          isButtonShow: false,
          error: false,
        });
        return;
      }

      if (nextPage === 1) {
       alert.success(`Hooray! We found ${postApiService.hits} images.`);
      }

      this.setState({
        loading: false,
        isButtonShow: true,
        error: false,
      });
    });
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };



// openModal = someDataModal => {
//   this.setState ({
//     isOpenModal : true,
//     modalData : someDataModal
//   })
//   }

//   closeModal = () => {
//     this.setState({
//       isOpenModal : false,
//       modalData : null
//     })
   
//   }



  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;
    return (
      <>
  <SearchBar onSummit = {this.handleFormSubmit}/>
  {error && <h2>Please, enter search word!</h2>}
  {error && <ImageGallery galleryItems={galleryItems}/>}
  {loading && <Loader />}
  {isButtonShow && <Button onClick={this.onLoadMore} />}
  {/* <ToastContainer autoClose={3000} theme="dark" /> */}
  </>
    
    )
  }
}

