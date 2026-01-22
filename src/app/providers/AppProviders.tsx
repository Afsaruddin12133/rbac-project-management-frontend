import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";

type AppProvidersProps = PropsWithChildren;

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export default AppProviders;
