import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { src, largeSrc, alt } = this.props;

    return (
      <GalleryItem>
        <GalleryImage src={src} alt={alt} onClick={this.toggleModal} />
        {this.state.showModal && (
          <Modal
            src={largeSrc}
            alt={alt}
            onClose={this.toggleModal}
            passed={this.state.showModal}
          />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
};
