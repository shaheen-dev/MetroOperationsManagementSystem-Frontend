import React, { Component } from 'react'
import '../views/homePage.css'
import {Header} from './Header'
import '../views/Header.css'
export default class Image extends Component {
  render() {
    return (
      <div>
      <div className="rounded mx-auto maintxt ">
        <img class="rounded mx-auto d-block metro2" src="./metro.jpeg" alt="" />
      </div>
      </div>
      
    
    )
  }
}
