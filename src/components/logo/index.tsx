import React from "react";
import "assets/css/logo.css";

interface IImageProps {
  src?: string;
  alt: string;
}
const ImageComponent = ({
  src = "https://res.cloudinary.com/du5trgchf/image/upload/v1706065156/images-product/lhb4ge943ysb5odlzp9z.png",
  alt,
}: IImageProps) => {
  return <img className="logo" src={src} alt={alt}></img>;
};

export default ImageComponent;
