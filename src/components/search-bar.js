import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            placeHolder: 'Taper votre texte'
        }
    }

    handleChange = (event) => {
        this.setState({searchText : event.target.value})
    }

    render () {
        return (
            <div>
                <input onChange={this.handleChange} placeholder={this.state.placeHolder}/>
            </div>
        )
    }
}

export default SearchBar