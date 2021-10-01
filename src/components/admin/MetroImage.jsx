import React, { Component } from 'react'
import '../../views/MetroImage.css'

export class MetroImage extends Component {
  render() {
    return (
      <div>
         <div className="bgImage">
        <img class="rounded mx-auto d-block" src="./logo.png" alt="" />
        <div className="text-center text">
        {/* <span className="overlay-text"><h1 className="font-weight-bold metro-text ">PUNE METRO</h1></span> */}
        {/* <span className=" img-overlay"><img src="./logo.png" alt="" width="200px"/></span> */}
        </div>
      </div>
      </div>
    )
  }
}

export default MetroImage
