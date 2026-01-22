import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { store } from "../store";

type AppProvidersProps = PropsWithChildren;

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { borderRadius: "16px", padding: "12px 16px" },
          }}
        />
      </BrowserRouter>
    </Provider>
  );
};

export default AppProviders;
