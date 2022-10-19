import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { backGroundSliderList } from "../../../redux/actions/sliders/BackgroundSliderAction";
import FIndPartner from ".././bannerSection/FIndPartner";
import SwipeMatch from ".././bannerSection/SwipeMatch";

// Import Swiper styles

function BannerSection() {
  const { sliderData } = useSelector((state) => state.sliderValue);
  // console.log("sliderData :>> ", sliderData);
  // // const [state, setState] = useReducer(
  // //   (state, newState) => ({ ...state, ...newState }),
  // //   {
  // //     productCount: 1,
  // //     indexNow: 0,
  // //     nowCount: {},
  // //   }
  // // );

  let dispatch = useDispatch();
  useMemo(() => {
    dispatch(backGroundSliderList());
  }, [dispatch]);

  let slider = "";
  if (sliderData.data?.length > 0) {
    slider = sliderData.data.map((slide, i) => (
      <div key={`${slide.id}`}>
        <SwiperSlide>
          <div
            className="swiper-slide banner-swiper"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          ></div>
        </SwiperSlide>
      </div>
    ));
  }
  return (
    <>
      <section className="banner-section">
        <div className="swiper mySwiperTop">
          <Swiper
            slidesPerView={1}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper swiper-wrapper"
          >
            {slider}
          </Swiper>
        </div>
        <div className="container bnnr">
          <div className="container">
            <div className="row justify-content-xl-between justify-content-lg-around">
              <SwipeMatch />
              <FIndPartner />
              {/* <ThreeEasySteps /> */}
              {/* <FlirtingSection /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
