import Link from "next/link";
import { HeroSocials } from "../../../layout/social-links";
import { HighlightSix } from "../../../svg";
import { useVideoModal } from "../../../provider/VideoProvider";

const hero_contents = {
  title: (
    <>
      Providing unparalleled{" "}
      <span className="tp-highlight">
        {" "}
        <HighlightSix /> <i>IT business solution</i>
      </span>{" "}
      to maximum satisfaction
    </>
  ),
  sm_text:
    "At collax we specialize in designing, building, shipping and scaling <br/> beautiful, usable products with blazing-fast efficiency",
  video_id: "AFHnVR1vb84",
  video_title: "Behind the scenes",
  hero_img: "/assets/img/hero/hero-6.1.png",
};

const { hero_img, sm_text, title, video_id, video_title } = hero_contents;

const HeroArea = () => {
  const { playVideo } = useVideoModal();
  
  return (
    <div className="tp-hero-area tp-hero-border tp-bp-hero-space p-relative grey-bg fix">
        <div className="tp-hero-social bs-hero-social d-none d-xxl-block">
          <HeroSocials />
        </div>
        <div
          className="tp-bp-hero-shape d-none d-lg-block wow tpfadeRight"
          data-wow-duration=".3s"
          data-wow-delay=".6s"
        >
          <img src="assets/img/hero/hero-shape-6.1.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-12">
              <div className="tp-hero-section-box tp-bp-hero-section-box">
                <h3
                  className="tp-hero-title tp-bs-hero-title wow tpfadeUp"
                  data-wow-duration=".5s"
                  data-wow-delay=".8s"
                >
                  {title}
                </h3>
                <p
                  className="wow tpfadeUp"
                  data-wow-duration=".7s"
                  data-wow-delay=".9s"
                >
                  {sm_text}
                </p>
                <div
                  className="tp-hero-three-button-box d-flex align-items-center wow tpfadeUp"
                  data-wow-duration=".9s"
                  data-wow-delay="1.1s"
                >
                  <div className="xs-bottom-space">
                    <Link className="tp-btn-sky mr-55" href="/contact">
                      Contact us
                    </Link>
                  </div>
                  <div
                    onClick={() => playVideo(video_id)}
                    className="tp-hero-paly-button tp-bp-hero-paly-button  z-index-1"
                  >
                    <button className="popup-video">
                      <i className="far fa-play"></i>
                    </button>
                    <span>{video_title}</span>
                  </div>
                </div>
                <div className="tp-hero-social  pb-30 d-xxl-none d-xl-block">
                  <div className="tp-hero-social bp-hero-social bs-xl-hero-social">
                    <HeroSocials hide_title={true} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="tp-hero-right">
                <div
                  className="tp-bp-hero__img  p-relative wow tpfadeRight"
                  data-wow-duration=".9s"
                  data-wow-delay="1s"
                >
                  <img className="z-index-1" src={hero_img} alt="hero img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeroArea;
