import { Component } from 'react'
import * as SC from '../Searchbar/Searchbar.styled'
import { toast } from 'react-toastify'

export  default class SearchBar extends Component {
    state = {
        searchQuery: ``,
    }


handleQueryChange = ({currentTarget: {value } }) => {
    this.setState({searchQuery: value.toLowerCase() })
}

handleSubmit = e => {
const searchQuery = this.state.searchQuery.trim();
e.preventDefault();

if(searchQuery.trim() === '') {
    toast.info('Please, enter search word!')
    return;
}
this.props.onSubmit(searchQuery);
this.setState({ searchQuery: `` });
}

render() {
const { searchQuery } = this.state;
return(
    <SC.SearchBarHeader>
    <SC.Form onSubmit = {this.handleSubmit}>
      <SC.Input
      type="text"
      autocomplete="off"
      autoFocus
      placeholder="Search images and photos"
      name="searchQuery"
      value={searchQuery}
      onChange={this.handleQueryChange}
      />
      <SC.Button type="submit" >
      <SC.Span >Search</SC.Span>
      </SC.Button>
     </SC.Form>
   </SC.SearchBarHeader> 
)
}
}



