import React from 'react';
import Photos from './Photos';
import NotFound from './NotFound';

const PhotoContainer = (props) => {     

    const results = props.data;
    let photos;
    if(results.length > 0) {
        photos = results.map(photo => 
            <Photos url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} key={photo.id} />
        );
    } else {
        photos = <NotFound />
    }
    
    return (
     <div className="photo-container">
        { (results.length > 0)
          ?  <h2> {props.title} </h2>
          :  <h2></h2>
        }
      
         <ul>
           {photos}
         </ul>
     </div>
    );
}

export default PhotoContainer;