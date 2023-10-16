import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
// import "normalize.css/normalize.css";
import "./css/slider-animations.css";
// import './slider-animations.css';
// import './styles.css';
import "./css/styles.css";

const AnimatedSlider = (props) => {
  return (
    <Slider
      infinite={true}
      autoplay={3000}
      className="slider-wrapper"
      // nextButton={<h3>{">"}</h3>}
    >
      {props.slides.map((item, index) => (
        <div key={item._id} className="slider-content">
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default AnimatedSlider;
