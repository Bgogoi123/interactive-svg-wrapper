import "./App.css";
import SVGViewer from "./pages/SVGViewer";


function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Demo on How to use the Component, will be converting this project into a package in next releases. */}
      <SVGViewer>
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="25" r="20" />
        </svg>
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="55" r="20" fill="grey" />
        </svg>
      </SVGViewer>
    </div>
  );
}

export default App;
