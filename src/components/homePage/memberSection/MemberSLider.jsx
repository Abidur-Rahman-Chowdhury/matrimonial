import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
// import imageDana from "../../../assets/img/registered/p1.png";
import { latestMemberSliderList } from "../../../redux/actions/sliders/BackgroundSliderAction";
// import { latestMemberSliderList } from "../../../redux/actions/sliders/BackgroundSliderAction";

export const MemberSLider = () => {
  const { latestMemberData } = useSelector((state) => state.sliderValue);

  let dispatch = useDispatch();
  useMemo(() => {
    dispatch(latestMemberSliderList());
  }, [dispatch]);

  let slider = "";

  console.log("slide", latestMemberData.data);
  if (latestMemberData?.data?.length > 0) {
    slider = latestMemberData.data.map((slide, index) => (
      <div key={`${slide.id}`}>
        <SwiperSlide>
          <div className="swiper-slide">
            <div className="single-slider">
              <div className="img">
                <img src={slide.profile_photo} alt="img" />
              </div>
              <div className="inner-content">
                <h4 className="name">{slide?.first_name || slide?.username}</h4>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </div>
    ));
  }
  return (
    <div className="col-lg-8 sr__mright wow fadeInRight">
      <div id="members__align" className="swiper registered-slider23 ">
        <Swiper
          slidesPerView={5}
          loop={true}
          spaceBetween={5}
          breakpoints={{
            350: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            560: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            950: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
          // modules={[Autoplay]}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          className="mySwiper swiper-wrapper"
        >
          {slider}
        </Swiper>
      </div>
    </div>
  );
};

export const MemoMemberSLider = React.memo(MemberSLider);
