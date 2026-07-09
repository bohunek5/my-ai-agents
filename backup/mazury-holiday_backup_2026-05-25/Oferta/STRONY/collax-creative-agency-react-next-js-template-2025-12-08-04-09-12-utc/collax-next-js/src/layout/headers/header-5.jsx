import Link from 'next/link';
import React from 'react';
import useSticky from '../../hooks/use-sticky';
import Languages from './component/languages';
import MobileMenu from './mobile-menu';
import NavMenus from './nav-menus';

const HeaderFive = () => {
  const { headerSticky } = useSticky();
  return (
    <React.Fragment>
      <header className="d-none d-lg-block">
        <div id="header-sticky" className={`tp-header-area-two tp-header-bs-area header-space-three
         pt-35 ${headerSticky ? 'header-sticky' : ''}`}>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xxl-3 col-xl-3 col-lg-3">
                <div className="tp-logo text-start">
                  <Link href={'/'}>
                    <img src="/assets/img/logo/logo-blue.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-5 col-xl-6 col-lg-6">
                <div className="tp-main-menu tp-menu-black tp-bs-menu text-center z-index-1">
                  <nav id="mobile-menu">
                    {/* nav menus start */}
                    <NavMenus />
                    {/* nav menus end */}
                  </nav>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-3 col-lg-3">
                <div className="tp-header-left d-flex align-items-center justify-content-end ">
                  <ul className="d-none d-xxl-block">
                    <li>
                      <Link href="/login">
                       <i className="far fa-user fa-user"></i> Login
                      </Link>
                    </li>
                    <li>
                      <Link className="#" href="#">EN<i className="fal fa-arrow-down arrow-down"></i>
                      <Languages />
                      </Link>
                    </li>
                  </ul>
                  <div className="tp-header-yellow-button">
                    <Link className="tp-btn-sky" href="/contact">
                      How it Works
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- mobile-menu-area --> */}
      <MobileMenu logo={"logo-blue.png"} transparent={false} />
      {/* <!-- mobile-menu-area-end --> */}
    </React.Fragment>
  );
};

export default HeaderFive;