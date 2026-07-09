import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import SEO from "../components/seo";
import { store } from "../redux/store";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import "../styles/index.scss";
import { VideoProvider } from "../provider/VideoProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO />
      <Provider store={store}>
        <VideoProvider>
          <Component {...pageProps} />
        </VideoProvider>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;
