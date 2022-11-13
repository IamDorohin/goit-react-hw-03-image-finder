import PropTypes from 'prop-types';
import { GalleryList } from 'components/ImageGallery/ImageGallery.styled';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const imagesArray = this.props.responseArray;

    return (
      <GalleryList>
        {imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              largeSrc={largeImageURL}
              alt={tags}
            />
          );
        })}
      </GalleryList>
    );
  }
}

ImageGallery.propTypes = {
  responseArray: PropTypes.arrayOf(PropTypes.object),
};
