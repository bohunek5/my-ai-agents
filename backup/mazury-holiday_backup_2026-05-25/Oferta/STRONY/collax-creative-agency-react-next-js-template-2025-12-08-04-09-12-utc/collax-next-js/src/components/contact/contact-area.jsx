import ContactForm from '../forms/contact-form';
import Link from 'next/link';

const ContactArea = () => {
  return (
   <div className="tp-contact-area pt-135 pb-130">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 ">
              <div className="tp-contct-wrapper contact-space-40">
                <div className="tp-contact-thumb mb-60">
                  <img src="/assets/img/contact/contact-1.jpg" alt="" />
                </div>
                <div className="tp-contact-info mb-40">
                  <h4 className="contact-title">Mail Address</h4>
                  <span><Link href="mailto:(webmail@gmail.com)">(webmail@gmail.com)</Link></span>
                  <span><Link href="mailto:(infoweb@gmail.com)">(infoweb@gmail.com)</Link></span>
                </div>
                <div className="tp-contact-info mb-40">
                  <h4 className="contact-title">Phone Number</h4>
                  <span><Link href="tel:(+1255-568-6523)">(+1255 - 568 - 6523)</Link></span>
                  <span><Link href="tel:(+1255-568-6523)">(+1255 - 568 - 6523)</Link></span>
                </div>
                <div className="tp-contact-info">
                  <h4 className="contact-title">Address line</h4>
                  <span><Link href="https://www.google.com/maps" target="blank">Bowery St, New York, NY 10013,USA. Bowery Steae</Link></span>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tpcontact">
                <h4 className="tp-contact-big-title">Let’s Talk...</h4>
                <div className="tpcontact__form tpcontact__form-3">
                  {/* ContactForm start */}
                  <ContactForm />
                  {/* ContactForm end */}
                </div>
                <p className="ajax-response"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactArea;