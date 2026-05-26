import Sidebar from '../../components/common/off-canvas';
import useSticky from '../../hooks/use-sticky';
import React from 'react';

const MobileMenu = ({ logo, bg, transparent = true }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { headerSticky } = useSticky();

  return (
    <React.Fragment>
      <div id="header-sticky-mobile" className={`tp-md-menu ${transparent ? 'header-transparent' : ''} d-lg-none pt-40 pb-40 
    ${bg ? bg : ''} ${headerSticky ? 'header-sticky' : ''}`}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="tp-logo">
                <a href="#"><img src={`/assets/img/logo/${logo}`} alt="" /></a>
              </div>
            </div>
            <div className="col-6">
              <div className="bar text-start">
                <button className="tp-menu-bar" onClick={() => setSidebarOpen(true)} 
                type="button"><i className="fal fa-bars"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* off canvas start */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {/* off canvas end */}
    </React.Fragment>
  );
};

export default MobileMenu;