import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
class Loader extends Component {
    state = {

    }
    render() {
        return (

            <div>
                Scroll to load images.
                <div className="filler" />
                <LazyLoad height={100} offsetVertical={300}>
                    <h1>JAMES</h1>
                </LazyLoad>
                
                <div className="filler" />
            </div>
        );
    }
}

export default Loader;