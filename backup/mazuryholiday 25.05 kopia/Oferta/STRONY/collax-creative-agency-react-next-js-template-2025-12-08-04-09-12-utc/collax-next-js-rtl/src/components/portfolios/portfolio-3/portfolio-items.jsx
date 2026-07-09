import PhotoProviderWrapper from "../../../provider/PhotoProviderWrapper";
import { PhotoView } from "react-photo-view";
import { useState } from "react";

const portfolio_data = [
  { img: "/assets/img/portfolio/port-4.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-1.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-2.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-3.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-5.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-6.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-7.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-8.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-9.jpg", category: "Website" },
  { img: "/assets/img/portfolio/port-1.jpg", category: "Landing Page" },
  { img: "/assets/img/portfolio/port-4.jpg", category: "Landing Page" },
  { img: "/assets/img/portfolio/port-6.jpg", category: "Landing Page" },
  { img: "/assets/img/portfolio/port-7.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-1.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-8.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-3.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-6.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-5.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-4.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-2.jpg", category: "ios App" },
  { img: "/assets/img/portfolio/port-7.jpg", category: "Branding Design" },
  { img: "/assets/img/portfolio/port-8.jpg", category: "Branding Design" },
  { img: "/assets/img/portfolio/port-9.jpg", category: "Branding Design" },
];

const imagePerRow = 6;

const PortfolioItems = () => {
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
    <div className="tp-portfolio-area pt-120 pb-100 p-relative">
      <div className="container">
        <div className="row justify-content-center mb-80">
          <div className="col-10 p-0 text-center">
            <div className="tp-project-tab-button masonary-menu">
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
        <div className="row grid gx-3">
          <PhotoProviderWrapper>
            {items?.slice(0, next)?.map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-4 col-md-4 mb-20">
                <div className="tp-project-item-two portfolio-four p-relative">
                  <div className="fix radius-20">
                    <img className="w-100" src={item.img} alt="" />
                  </div>
                  <div className="portfolio-icon z-index-1">
                    <PhotoView src={item.img.src || item.img}>
                      <button className="popup-image popup">
                        <i className="fal fa-search"></i>
                      </button>
                    </PhotoView>
                  </div>
                </div>
              </div>
            ))}
          </PhotoProviderWrapper>
        </div>
        {next < items.length && (
          <div className="row">
            <div className="col-12">
              <div className="tp-project-button text-center mt-25">
                <button onClick={handleLoadData} className="tp-btn-yellow">
                  Lode more
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioItems;
