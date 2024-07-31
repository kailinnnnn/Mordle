import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Script from "next/script";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Script
        src="https://kit.fontawesome.com/4ee724b524.js"
        crossOrigin="anonymous"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
