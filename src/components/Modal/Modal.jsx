import * as SC from '../Modal/Modal.styled'
import { Component } from 'react'

export class Modal extends Component {
   
componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
        document.body.style.overflow = 'hidden'
    }
    componentWillUnmount() {
        window.remove.EventListener('keydown', this.handleKeyDown)
        document.body.style.overflow = 'auto'
    }

handleOverlayClick = event => {
  if(event.target === this.event.currentTarget) {
this.props.onCloseModal();
    }

    handleKeyDown = event => {
        if(event.code === 'Escape') {
            this.props.onCloseModal();  
        }
    }
}

    render() {
        const { largeImageURL, alt} = this.props;

        return(
            <SC.Overlay onClick = {this.handleOverlayClick}>
            <SC.Modal>
              <SC.Img src={largeImageURL} alt={alt} />
            </SC.Modal>
          </SC.Overlay >
        )
    }
  
}