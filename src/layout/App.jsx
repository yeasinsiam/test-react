import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "../pages";

function App() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default App;
