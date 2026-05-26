import PhotoProviderWrapper from "../../../provider/PhotoProviderWrapper";
import { PhotoView } from "react-photo-view";
import { PopupArrow } from "../../../svg";
import { useState } from "react";

const portfolio_data = [
  { img: "/assets/img/portfolio/port-10.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-11.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-12.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-13.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-14.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-15.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-16.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-17.jpg", category: "Website" },
  { img: "/assets/img/project/project-6.1.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-18.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-10.jpg", category: "Landing Page" },
  { img: "/assets/img/portfolio/port-14.jpg", category: "Landing Page" },
  { img: "/assets/img/portfolio/port-18.jpg", category: "Landing Page" },
  { img: "/assets/img/portfolio/port-12.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-10.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-15.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-16.jpg", category: "ios App" },
  { img: "/assets/img/project/project-6.1.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-11.jpg", category: "Branding Design" },
  { img: "/assets/img/portfolio/port-13.jpg", category: "Branding Design" },
  { img: "/assets/img/portfolio/port-17.jpg", category: "Branding Design" },
];
const imagePerRow = 4;

const PortfolioArea = () => {
  const [category, setCategory] = useState("Website");
  const cate_items = portfolio_data.filter(
    (item) => item.category === category
  );
  const [items, setItems] = useState(cate_items);
  const [next, setNext] = useState(imagePerRow);

  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 2);
  };
  // all categories
  const all_categories = [...new Set(portfolio_data.map((c) => c.category))];
  // handleCategory
  const handleCategory = (category) => {
    setNext(imagePerRow);
    setCategory(category);
    setItems(portfolio_data.filter((item) => item.category === category));
  };

  return (
    <div className="tp-project-area pt-120 pb-120 p-relative">
      <div className="container-fluid p-0">
        <div className="row g-0 justify-content-center">
          <div className="col-10 text-center">
            <div className="tp-project-tab-button masonary-menu mb-80">
              {all_categories.map((c, i) => (
                <button
                  key={i}
                  className={`${c === category ? "active" : ""}`}
                  onClick={() => handleCategory(c)}
                >
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row grid gx-0 port-space">
          <PhotoProviderWrapper>
            {items?.slice(0, next)?.map((item, i) => (
              <div key={i} className="col-xl-6 col-lg-6 col-md-6">
                <div className="bp-project-item p-relative">
                  <div className="bp-project-img w-img fix">
                    <img src={item.img} alt="" />
                  </div>
                  <PhotoView src={item.img.src || item.img}>
                    <div className="bp-project-item-link">
                      <span style={{ cursor: "pointer" }}>
                        <PopupArrow />
                      </span>
                    </div>
                  </PhotoView>
                </div>
              </div>
            ))}
          </PhotoProviderWrapper>
        </div>
        {next < items.length && (
          <div className="row g-0">
            <div className="col-12">
              <div className="tp-project-button text-center">
                <button onClick={handleLoadData} className="tp-btn-yellow">
                  Load More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioArea;
