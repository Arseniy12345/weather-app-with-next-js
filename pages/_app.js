import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DefaultLayout } from "../components/DefaultLayout/DefaultLayout";
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import { Loader } from "../components/Loader";
import "./styles/global.css";

function App({ Component, pageProps }) {
  const router = useRouter();

  const store = useStore(pageProps.initialReduxState);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setIsLoading(true) : setIsLoading(false);
    };
    const handleComplete = (url) => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Provider store={store}>
      <DefaultLayout>
        {isLoading ? <Loader /> : <Component {...pageProps} />}
      </DefaultLayout>
    </Provider>
  );
}

export default App;
