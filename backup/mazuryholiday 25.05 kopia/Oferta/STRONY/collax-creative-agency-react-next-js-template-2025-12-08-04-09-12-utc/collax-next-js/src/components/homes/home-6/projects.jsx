import PhotoProviderWrapper from "../../../provider/PhotoProviderWrapper";
import { HighlightThree, PopupArrow } from "../../../svg";
import { PhotoView } from "react-photo-view";

const project_contents = {
  subtitle: "Projects",
  title: (
    <>
      Collax latest{" "}
      <span className="tp-section-highlight">
        {" "}
        project <HighlightThree />{" "}
      </span>
    </>
  ),
  images: [
    "/assets/img/project/project-6.1.jpg",
    "/assets/img/project/project-6.2.jpg",
    "/assets/img/project/project-6.3.jpg",
    "/assets/img/project/project-6.4.jpg",
  ],
};

const { images, subtitle, title } = project_contents;

const Projects = () => {
  return (
    <div className="tp-project-area pt-130">
      <div className="container-fluid g-0">
        <div className="row gx-0 justify-content-center">
          <div className="col-xl-8">
            <div className="tp-project-section-box text-center">
              <h5 className="tp-subtitle">{subtitle}</h5>
              <h2 className="tp-title-sm pb-65">{title}</h2>
            </div>
          </div>
        </div>
        <div className="row gx-0">
          <PhotoProviderWrapper>
            {images.map((img, i) => (
              <div key={i} className="col-xl-6 col-lg-6 col-md-6">
                <div className="bp-project-item p-relative">
                  <div className="bp-project-img fix w-img">
                    <img src={img} alt="" />
                  </div>
                  <div className="bp-project-item-link">
                    <span>
                      <PhotoView src={img.src || img}>
                        <button className="popup-image">
                          <PopupArrow />
                        </button>
                      </PhotoView>
                    </span>
                  </div> 
                </div>
              </div>
            ))}
          </PhotoProviderWrapper>
        </div>
      </div>
    </div>
  );
};

export default Projects;
