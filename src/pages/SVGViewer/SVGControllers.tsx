import ControllerButton from "../../components/ControllerButton";
import { TSVGControllersProps } from "../../types";

const SVGControllers = ({
  zoomIn,
  zoomOut,
  resetAll,
  scrollToContent,
}: TSVGControllersProps) => {
  return (
    <div className="buttonsContainer">
      <ControllerButton
        text="Reset All"
        title="Reset All"
        onClickFunction={resetAll}
      />
      <ControllerButton text="+" title="Zoom In" onClickFunction={zoomIn} />
      <ControllerButton text="-" title="Zoom Out" onClickFunction={zoomOut} />
      <ControllerButton
        text="Scroll back to content"
        title="Scroll back to content"
        onClickFunction={scrollToContent}
      />
    </div>
  );
};

export default SVGControllers;
