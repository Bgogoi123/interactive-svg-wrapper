import "./App.css";
import SVGViewer from "./pages/SVGViewer";
import SkullAndFloralArt from "./assets/images/skull-and-floral-art.svg?react";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Demo on How to use the Component, will be converting this project into a package in next releases. */}
      <SVGViewer>
        <SkullAndFloralArt />
      </SVGViewer>
    </div>
  );
}

export default App;
