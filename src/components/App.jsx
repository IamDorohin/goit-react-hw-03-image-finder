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
  }

  handleSearchQueryChange = searchQuery => {
    this.setState({ searchQuery, queryPage: 1, responseArray: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { queryPage: prevState.queryPage + 1 };
    });
  };

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
