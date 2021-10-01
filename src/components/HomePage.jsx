import React, { Component } from 'react'
import '../views/homePage.css'
import {Header} from './Header'
import '../views/Header.css'



export default class HomePage extends Component {
  render() {
    return (
      <div>
    
               
           
          <Header />
          
      <div className="rounded mx-auto maintxt">
        <img class="rounded mx-auto d-block" src="./metro1.jpg" alt="" />
        <div className="text-center text">
        <span className="overlay-text"><h1 className="font-weight-bold metro-text ">PUNE METRO</h1></span>
        <span className=" img-overlay"><img src="./map.jpg" alt="" width="200px"/></span>
        </div>
      </div>
      </div>
      
    
    )
  }
}
