// THIRD-PARTY
import React, { Suspense } from "react";

// PROJECT IMPORTS
import { JWTProvider as AuthProvider } from "contexts/JWTContext";
import Routes from "routes";
import "./App.css";
import Locales from "components/Locales";
import LoadingSpinner from "components/loading/Loading";
import NavigationScroll from "layout/NavigationScroll";
import Snackbar from "components/snackBar/SnackBar";

function App() {
  return (
    <Locales>
      <NavigationScroll>
        <AuthProvider>
          <>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes />
              <LoadingSpinner />
              <Snackbar />
            </Suspense>
          </>
        </AuthProvider>
      </NavigationScroll>
    </Locales>
  );
}

export default App;
