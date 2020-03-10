import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config.js';

import {
  BrowserRouter,
  Route, Switch, Redirect
} from 'react-router-dom';

import Error from './components/Error';

class App extends Component { 

  // Three default topics arrays with an inital state set to empty. Will use below to fetch data
  // via flickr api. Mount functions to using componentDidMount

  constructor(){
    super();
    this.state = {
      photos: [],
      photosone: [],
      photostwo: [],
      photosthree: [],
      loading: true
    };
  }
    
  componentDidMount(){
    this.performSearch("sunrise");
    this.photosSearchOne();
    this.photosSearchTwo();
    this.photosSearchThree();
    
  }

  performSearch = (query) => {
    this.setState({ 
      loading: true
    });
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photos: responseData.photos.photo,
          loading: false,
          search: query
        });
      })
      .catch(error => {
        console.log('Error fecthing and parsing data', error);
      });

  }

  // Three default topics preloaded with default search terms. The all have seperate search query variable names 
  // for distinction to be used via props when rendering the UI. 

  photosSearchOne = (query = "whales") => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photosone: responseData.photos.photo,
          loading: false,
          searchone: query
        });
      })
      .catch(error => {
        console.log('Error fecthing and parsing data', error);
      });
  }

  photosSearchTwo = (query = "lakes") => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photostwo: responseData.photos.photo,
          loading: false,
          searchtwo: query
        });
      })
      .catch(error => {
        console.log('Error fecthing and parsing data', error);
      });
  }

  photosSearchThree = (query = "cupcakes") => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photosthree: responseData.photos.photo,
          loading: false,
          searchthree: query
        });
      })
      .catch(error => {
        console.log('Error fecthing and parsing data', error);
      });
  }

  render(){  
    return (
       <BrowserRouter>
        <div className="container" >            
          <SearchForm onSearch={this.performSearch} /> 
          <Nav />   
            <Switch>  
             
                <Route path="/search/whales"  render={ () => <PhotoContainer data={this.state.photosone}  title={this.state.searchone} />  } /> 
                <Route path="/search/lakes"  render={ () => <PhotoContainer data={this.state.photostwo}  title={this.state.searchtwo} />  } />
                <Route path="/search/cupcakes"  render={ () => <PhotoContainer data={this.state.photosthree}  title={this.state.searchthree} />  } />
                <Route exact path="/" render={ () =>  <PhotoContainer  data={this.state.photos}    />  } /> 
                <Route path="/search/:searchq"  render={ () => <PhotoContainer loading={this.state.loading} data={this.state.photos} title={this.state.search}  />   }   />

                <Route path="/search" render={ () => <Redirect to="/" /> } />               
                <Route component={Error} />

            </Switch>  
        </div>  
      </BrowserRouter>
       
    );
    
  }
  
}

export default App;
 