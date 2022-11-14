import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { EmptyList, MainContainer } from './App.styled';
import { fetchAPI } from '../Services/FetchAPI';

export class App extends Component {
  state = {
    searchQuery: '',
    responseArray: [],
    queryPage: 0,
    loading: false,
    error: null,
    lastPage: false,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { queryPage, searchQuery } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.queryPage !== queryPage
    ) {
      this.setState({ status: 'pending' });

      try {
        const data = await fetchAPI(searchQuery, queryPage);

        this.setState(prevState => ({
          responseArray: [...prevState.responseArray, ...data.hits],
        }));

        if (queryPage === Math.ceil(data.totalHits / 12)) {
          this.setState({ lastPage: true });
        }
      } catch (error) {
        this.setState({ error: true, status: 'rejected' });
      } finally {
        this.setState({ status: 'resolved' });
      }
    }
    // const { queryPage, searchQuery } = this.state;

    // if (
    //   prevState.searchQuery !== searchQuery ||
    //   prevState.queryPage !== queryPage
    // ) {
    //   this.setState({ loading: true });

    //   try {
    //     const data = await fetchAPI(searchQuery, queryPage);

    //     this.setState(prevState => ({
    //       responseArray: [...prevState.responseArray, ...data.hits],
    //     }));

    //     if (queryPage === Math.ceil(data.totalHits / 12)) {
    //       this.setState({ lastPage: true });
    //     }
    //   } catch (error) {
    //     this.setState({ error: true, loading: false });
    //   } finally {
    //     this.setState({ loading: false });
    //   }
    // }
  }

  handleSearchQueryChange = searchQuery => {
    this.setState({ searchQuery, queryPage: 1, responseArray: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { queryPage: prevState.queryPage + 1 };
    });
  };

  // render() {
  //   const { loading, queryPage, responseArray, error, searchQuery, lastPage } =
  //     this.state;

  //   return (
  //     <MainContainer>
  //       <Searchbar onSubmit={this.handleSearchQueryChange} />
  //       {loading && <Loader />}
  //       {queryPage ? (
  //         <ImageGallery responseArray={responseArray} />
  //       ) : (
  //         <EmptyList>You haven't made your first request yet</EmptyList>
  //       )}
  //       {error && <EmptyList>{error.message}</EmptyList>}
  //       {searchQuery !== '' &&
  //         !loading &&
  //         !lastPage(<Button onClick={this.onLoadMore}>Load more</Button>)}
  //     </MainContainer>
  //   );
  // }

  render() {
    const { queryPage, responseArray, error, lastPage, status } = this.state;

    return (
      <MainContainer>
        <Searchbar onSubmit={this.handleSearchQueryChange} />
        {status === 'pending' && <Loader />}
        {queryPage ? (
          <ImageGallery responseArray={responseArray} />
        ) : (
          <EmptyList>You haven't made your first request yet</EmptyList>
        )}
        {status === 'rejected' && <EmptyList>{error.message}</EmptyList>}
        {!lastPage && status === 'resolved' && (
          <Button onClick={this.onLoadMore}>Load more</Button>
        )}
      </MainContainer>
    );
  }
}

// const KEY = '30234526-30dbaada1436fb2bf1e0a6a2b';

// fetch(
//   `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.queryPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
// )
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     this.setState(prevState => {
//       return {
//         responseArray: [...prevState.responseArray, ...data.hits],
//         // lastPageNumber: Math.ceil(data.totalHits / 12),
//       };
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   })
//   .finally(() => this.setState({ loading: false }));
