import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// 1. Apollo Client Imports
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client";

// 2. Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux Provider poore app ko store provide karega */}
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>,
);
