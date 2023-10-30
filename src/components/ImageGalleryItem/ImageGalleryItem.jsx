import * as SC from '../ImageGalleryItem/ImageGalleryItem.styled'
import { Component } from 'react'
import { Modal } from '../Modal/Modal'


export class ImageGalleryItem extends Component {
    state = {
        inOpenModal: false,
    }

    toogleModal = () => {
        this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }))
    }

    render() {
        const {
            galleryItem: { webformatURL, largeImageURL, tags },
          } = this.props;
          return (
            <>
          <SC.Item onClick = { this.toogleModal}>
          <SC.Img src= {webformatURL} alt={tags}/>
           </SC.Item>
          {this.state.isModalOpen && (
            <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={this.toogleModal}
            />
          )}
            </>
          )
    }
}






