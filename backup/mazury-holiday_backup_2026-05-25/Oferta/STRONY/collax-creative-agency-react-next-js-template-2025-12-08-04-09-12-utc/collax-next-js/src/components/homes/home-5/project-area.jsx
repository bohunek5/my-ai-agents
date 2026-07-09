import PhotoProviderWrapper from "../../../provider/PhotoProviderWrapper";
import { AngelRight, ArrowBig, HighlightThree } from "../../../svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { PhotoView } from "react-photo-view";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import React from "react";

const contents = {
  shapes: ["hero/hero-shape-5.2.png", "project/bp-pj-shape-5.1.png"],
  subtitle: "Projects",
  title: (
    <>
      Collax complete{" "}
      <span className="tp-section-highlight">
        project <HighlightThree />{" "}
      </span>
    </>
  ),
  project_items: [
    {
      subtitle: "Business",
      title: "Business Consulting",
      img: "/assets/img/project/project-5.1.jpg",
    },
    {
      subtitle: "Banking",
      title: "Finance & Bank",
      img: "/assets/img/project/project-5.2.jpg",
    },
    {
      subtitle: "Design",
      title: "Branding Design",
      img: "/assets/img/project/project-5.3.jpg",
    },
    {
      subtitle: "Business",
      title: "Business Consulting",
      img: "/assets/img/project/project-5.2.jpg",
    },
  ],
};

const { project_items, shapes, subtitle, title } = contents;

const ProjectArea = () => {
  const [sliderLoop, setSliderLoop] = React.useState(false);
  React.useEffect(() => setSliderLoop(true), []);

  return (
  <div className="tp-project-area tp-project-bs-space yellow-bg pt-130 pb-130 fix p-relative">
        {shapes.map((s, i) => (
          <div
            key={i}
            className={`bp-project-shape-${i + 1} d-none d-lg-block`}
          >
            <img src={`/assets/img/${s}`} alt="" />
          </div>
        ))}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="tp-project-section-box text-center">
                <h5 className="tp-subtitle tp-subtitle-before-color">
                  {subtitle}
                </h5>
                <h2 className="tp-title-sm pb-65">{title}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="tp-project-slider-section">
              <PhotoProviderWrapper>
              <Swiper
                loop={sliderLoop}
                slidesPerView={1}
                spaceBetween={30}
                modules={[Pagination]}
                className="swiper-container project-slider-active"
                pagination={{
                  el: ".my-dots",
                  clickable: true,
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  576: {
                    slidesPerView: 1,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
              >
                
                {project_items.map((item, i) => {
                  const { img, subtitle, title } = item;
                  return (
                    <SwiperSlide key={i}>
                      <div className="tpproject">
                        <div className="tpproject__content pl-20">
                          <h4 className="tp-pj-subtitle">
                            <Link href="/portfolio">{subtitle}</Link>
                          </h4>
                          <h3 className="tp-pj-title">
                            <Link href="/portfolio">
                              {title} <AngelRight />
                            </Link>
                          </h3>
                        </div>
                        <div className="tpproject__thumb">
                          <div className="fix radius-20">
                            <img className="w-100" src={img} alt="" />
                          </div>
                          <div className="tpproject__thumb-icon">
                            <PhotoView src={item.img}>
                            <button className="popup-image">
                              <ArrowBig />
                            </button>
                            </PhotoView>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              </PhotoProviderWrapper>
              <div className="my-dots text-center"></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProjectArea;
