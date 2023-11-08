import * as SC from '../ImageGallery/ImageGallery.styled'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({galleryItems}) => {
return (
    <SC.List>  
   {galleryItems.map(galleryItem =>{
    return(
        <ImageGalleryItem key={galleryItem.id} galleryItem = {galleryItem} />
    )
   })}
    </SC.List>
)
}