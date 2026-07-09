import Link from 'next/link';

const SingleServiceFour = ({ service, index, m }) => {
  const { delay, duration,id,img, text_1, title, color } = service || {};
  return (
    <div className="col-xl-4 col-md-6">
      <div className={`tp-services-item text-center 
      ${color} ${index && index > 2 ? 'mb-30' : ''} ${m ? 'mb-30' : ''} wow tpfadeUp`}
        data-wow-duration={duration} data-wow-delay={delay}>
        <div className="tp-services-item__icon mb-35">
          <img src={img} alt="" />
        </div>
        <div className="tp-services-item__content">
          <h3 className="tp-sv-title">
            <Link href={`/service-details/${id}`}>
              {title}
            </Link>
          </h3>
          <p>{text_1}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleServiceFour;