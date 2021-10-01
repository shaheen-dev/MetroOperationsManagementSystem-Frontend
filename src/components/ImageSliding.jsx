import React from "react";
import { SliderData } from "./SliderData";
import { ImageSlider } from "./ImageSlider";
import "../views/ImageSliding.css"

export function ImageSliding (){
    return <ImageSlider slides={SliderData} />;
}