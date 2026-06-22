import { Selection, select } from "d3";
import {
  Children,
  isValidElement,
  ReactElement,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { INIT_COORDS, SVGHEIGHT, SVGWIDTH } from "../../constants";
import { TSVGCoordinates, TSVGDimensions } from "../../types";

import {
  getSVGCanvas,
  onPointerDown,
  onPointerMove,
  onPointerUp,
} from "./functions";
import "./styles.css";
import SVGControllers from "./SVGControllers";

const INVALID_SVG_CONTAINERS = ["div", "span", "section", "article", "p"];

/**
 * SVGViewer Component
 *
 * A specialized viewer canvas that handles zooming, panning, and resetting
 * for SVG-based graphics.
 *
 * @param {ReactElement<SVGProps<SVGElement>> | ReactElement<SVGProps<SVGElement>>[]} props.children
 *        Accepts ONLY valid SVG elements (e.g., `<circle>`, `<rect>`, `<g>`, or custom
 *        components returning SVG elements).
 *        ⚠️ DO NOT wrap children in HTML layout elements like `<div>` or `<span>`,
 *        as they break SVG rendering boundaries and will trigger a runtime error.
 */

const SVGViewer = ({
  children,
}: {
  children:
    | ReactElement<SVGProps<SVGElement>>
    | ReactElement<SVGProps<SVGElement>>[];
}) => {
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const childType = child.type;

      if (
        typeof childType === "string" &&
        INVALID_SVG_CONTAINERS.includes(childType)
      ) {
        throw new Error(
          `<SVGViewer> only accepts SVG elements. Found a <${childType}>.`
        );
      }
    }
  });

  const svgAreaRef = useRef<SVGSVGElement>(null);
  const [SVGCanvas, setSVGCanvas] =
    useState<Selection<SVGSVGElement | null, unknown, null, undefined>>();
  const [zoomValue, setZoomValue] = useState<number>(1);

  const [isPannable, setIsPannable] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(0);
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [pointerOrigin, setPointerOrigin] =
    useState<TSVGCoordinates>(INIT_COORDS);

  const [viewBox, setViewBox] = useState<TSVGDimensions>({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
  });

  const [newViewBox, setNewViewBox] = useState<TSVGCoordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    getSVGCanvas({ svgAreaRef, setSVGCanvas });
  }, []);

  useEffect(() => {
    if (SVGCanvas !== undefined && SVGCanvas !== null) {
      SVGCanvas.on("mouseenter", () => setIsPannable(true));
      SVGCanvas.on("mouseleave", () => setIsPannable(false));
    }
  }, [SVGCanvas]);

  useEffect(() => {
    if (svgAreaRef.current !== null) {
      const svgAreaWidth = svgAreaRef.current.width.baseVal.value;
      setRatio(viewBox.width / svgAreaWidth);
    }
  }, [SVGCanvas, viewBox, ratio]);

  useEffect(() => {
    select("g#container").attr("transform", `scale(${zoomValue})`);
  }, [zoomValue]);

  useEffect(() => {
    enableEvents();
  }, [isPannable, viewBox, newViewBox, pointerOrigin]);

  useEffect(() => {
    let viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
    if (SVGCanvas != undefined) {
      SVGCanvas.attr("viewBox", viewBoxString);
    }
  }, [newViewBox]);

  function enableEvents() {
    if (SVGCanvas !== undefined) {
      if (window.PointerEvent) {
        SVGCanvas.on("pointerdown", (event) =>
          onPointerDown({ event, setIsPointerDown, setPointerOrigin })
        );
        SVGCanvas.on("pointermove", (event) =>
          onPointerMove({
            event,
            isPointerDown,
            viewBox,
            pointerOrigin,
            ratio,
            setNewViewBox,
          })
        );
        SVGCanvas.on("pointerup", (event) =>
          onPointerUp({ event, setIsPointerDown, setViewBox, newViewBox })
        );
        SVGCanvas.on("pointerleave", (event) =>
          onPointerUp({ event, setIsPointerDown, setViewBox, newViewBox })
        );
      }
    }
  }

  function zoomIn() {
    setZoomValue((prev) => prev + 0.3);
  }

  function zoomOut() {
    if (zoomValue - 1 > 0) {
      setZoomValue((prev) => prev - 0.3);
    }
  }

  function resetAll() {
    const svg = select(svgAreaRef.current);
    svg.attr("viewBox", `0 0 ${viewBox.width} ${viewBox.height}`);
    setZoomValue(1);
  }

  return (
    <div>
      <SVGControllers resetAll={resetAll} zoomIn={zoomIn} zoomOut={zoomOut} />
      <svg
        id="svgarea"
        ref={svgAreaRef}
        width={SVGWIDTH}
        height={SVGHEIGHT}
        viewBox="0 0 400 400"
        style={{
          borderRadius: "5px",
          backgroundColor: "#d6d6d6",
          cursor: "grab",
        }}
      >
        <g id="container">{children}</g>
      </svg>
    </div>
  );
};

export default SVGViewer;
