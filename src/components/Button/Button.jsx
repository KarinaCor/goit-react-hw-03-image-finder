import * as SC from '../Button/Button.styled'

export const Button = ({onLoadMore}) => {
    return(
<SC.Button type="button" onClick={onLoadMore}>
       Load More 
    </SC.Button>
    )
    
}