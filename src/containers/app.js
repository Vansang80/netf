import React, { Component } from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import axios from 'axios'
import VideoDetail from '../components/video-detail'

const API_END_POINT = 'https://api.themoviedb.org/3/'
const POPULAR_MOVIES_URLS = `discover/movie?
                             language=fr
                             &sort_by=popularity.desc
                             &include_adult=false
                             &append_to_response=images`

const API_KEY = 'api_key=dac1e43ce0ef3aa51b369fefb07d72df'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moviesList : {},
            currentMovie : {}
        }
    }

    componentWillMount () {
        this.initMovies()
    }

    initMovies = () => {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URLS}&${API_KEY}`)
        .then(response => {
            console.log(response)
            this.setState({
                moviesList : response.data.results.slice(1, 6),
                currentMovie : response.data.results[0] 
            }, () => this.applyVideoToCurrentMovie())
        })
    }

    applyVideoToCurrentMovie = () => {
        axios.get(`${API_END_POINT}movie/
                   ${this.state.currentMovie.id}/videos?${API_KEY}&append_to_response=videos&include_adult=false`)
        .then(response => {
            console.log(response)
            const youtubeKey = response.data.results[0].key
            let newCurrentMovieState = this.state.currentMovie
            newCurrentMovieState.videoId = youtubeKey
            this.setState({currentMovie : newCurrentMovieState})
        })
    }

    render () {
        const renderVideoList = () => {
            if (this.state.moviesList.length >= 5) {
                return <VideoList movieList={this.state.moviesList} />
            }
        }

        return (
            <div>
                <SearchBar />
                {renderVideoList()}
                <VideoDetail 
                    title={this.state.currentMovie.title}
                    description={this.state.currentMovie.overview}
                />
            </div>
        )
    }
}

export default App