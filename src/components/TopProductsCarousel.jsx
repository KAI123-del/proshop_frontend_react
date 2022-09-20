import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import { productsTop } from "../actions/ProductListActions";

function TopProductsCarousel() {
  const dispatch = useDispatch();
  const { error, loading, topProducts } = useSelector(
    (state) => state.topProducts
  );

  useEffect(() => {
    dispatch(productsTop());
  }, []);

  return (
    <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true}>
      {topProducts.map((x) => (
        <div className="mt-6 relative">
          <img style={{ height: "500px" }} src={x.image} />
          <p className="legend  font-gotham tracking-widest">{x.name}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default TopProductsCarousel;
