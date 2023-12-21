import { createSVGWindow } from "svgdom";
import { SVG, registerWindow } from "@svgdotjs/svg.js";
import { serializeSvgElement } from "./utils";

interface SVGOData {
  children: Array<{
    type: string;
    name: string;
    [key: string]: any;
  }>;
}

interface Node {
  attributes: { [key: string]: any };
}

export const svgoCropPlugin = {
  name: "svgo-crop-plugin",
  fn: (data: SVGOData) => {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    const svgElement = data.children.find(
      (child) => child.type === "element" && child.name === "svg"
    );

    if (!svgElement) {
      throw new Error("SVG element not found");
    }

    const svgString = serializeSvgElement(svgElement);
    document.documentElement.innerHTML = svgString;

    const draw = SVG(document.documentElement);

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    draw.find("path").forEach((path) => {
      if (path.attr("fill") !== "none" && path.node.style.display !== "none") {
        const bbox = path.bbox();
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      }
    });

    return {
      element: {
        enter: (node: Node) => {
          if (!node.attributes.viewBox) {
            return;
          }

          node.attributes = {
            ...node.attributes,
            viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
          };
        },
      },
    };
  },
};
