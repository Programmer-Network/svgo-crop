const { registerWindow, createSVGWindow } = require("svgdom");
const { SVG } = require("@svgdotjs/svg.js");
const { serializeSvgElement } = require("./utils.js");

module.exports = {
  name: "svgo-crop-plugin",
  fn: (data) => {
    // Register a virtual window and document
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    // Convert the SVGO data to an SVG string
    const svgElement = data.children.find(
      (child) => child.type === "element" && child.name === "svg"
    );

    // Serialize the SVG element to string
    const svgString = serializeSvgElement(svgElement);

    // Create a virtual SVG document
    document.documentElement.innerHTML = svgString;

    // Use SVG.js for easier manipulation
    const draw = SVG(document.documentElement);

    // Initialize variables to store bounding box dimensions
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    // Iterate through each path and calculate the collective bounding box
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
        enter: (node) => {
          node.attributes = {
            ...node.attributes,
            viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
          };
        },
      },
    };
  },
};
