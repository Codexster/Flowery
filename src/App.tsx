import React from "react";
import "./App.scss";
import Navigation from "./components/navigation";
import Main from "./components/main";
import Footer from "./components/footer";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Main />
      <Footer />
    </React.Fragment>
  );
};

export default App;
