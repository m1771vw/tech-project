import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import { connect } from 'react-redux';
import {
    getAllEmployees
  } from '../Redux/Actions';


class Loader extends Component {
    state = {
        employees:[]

    }

    toGetAllEmployees = (model) => {
        console.log("is this working?")
       console.log(getAllEmployees(model))
        
    }

    

    render() {

        
       
        



        return (

            <div>
                Scroll to load images.
                <div className="filler" />
                <LazyLoad height={100} offsetVertical={300}>
                    <div>
                    <h1>JAMES</h1>
                   
                    </div>
                </LazyLoad>
                
                <div className="filler" />
            </div>
        );
    }
}




export default Loader;