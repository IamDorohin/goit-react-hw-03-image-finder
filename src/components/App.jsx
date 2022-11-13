import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { EmptyList, MainContainer } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    responseArray: [],
    queryPage: 0,
    isLoad: false,
    // lastPage: false,
    // lastPageNumber: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.queryPage !== this.state.queryPage
    ) {
      this.setState({ isLoad: true });

      const KEY = '30234526-30dbaada1436fb2bf1e0a6a2b';

      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.queryPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => {
            return {
              responseArray: [...prevState.responseArray, ...data.hits],
              // lastPageNumber: Math.ceil(data.totalHits / 12),
            };
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.setState({ isLoad: false }));
    }
  }

  handleSearchQueryChange = searchQuery => {
    this.setState({ searchQuery, queryPage: 1, responseArray: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { queryPage: prevState.queryPage + 1 };
    });

    // if (this.lastPageNumber === this.queryPage) {
    //   this.setState({ lastPage: true });
    // }
  };

  render() {
    return (
      <MainContainer>
        <Searchbar onSubmit={this.handleSearchQueryChange} />
        {this.state.isLoad && <Loader />}
        {this.state.queryPage ? (
          <ImageGallery responseArray={this.state.responseArray} />
        ) : (
          <EmptyList>You haven't made your first request yet</EmptyList>
        )}
        {this.state.searchQuery !== '' && (
          <Button onClick={this.onLoadMore}>Load more</Button>
        )}
      </MainContainer>
    );
  }
}
