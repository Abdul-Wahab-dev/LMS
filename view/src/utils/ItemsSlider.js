import React from "react";
import Carousel from "react-multi-carousel";
import "./css/styles.css";
import "react-multi-carousel/lib/styles.css";
import profileThumbNail from "../images/profile-thumbnail.png";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ItemsSlider = (props) => {
  return (
    <Carousel
      autoPlay={true}
      infinite={true}
      arrows={false}
      responsive={responsive}
    >
      {props.users
        .filter(
          (user) =>
            user.role !== "student" &&
            user.role !== "admin" &&
            user.approvedUser === true
        )
        .map((user) => (
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            key={user._id}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: `url(${
                  user.profile
                    ? "https://deefile.s3.amazonaws.com/" + user.profile
                    : profileThumbNail
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                marginBottom: "10px",
              }}
            ></div>
            <p className="m-0" style={{ textAlign: "center" }}>
              {user.name}
            </p>
          </div>
        ))}
    </Carousel>
  );
};
export default ItemsSlider;
