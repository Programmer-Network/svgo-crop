export const serializeSvgElement = (element: any) => {
  if (element.type === "text") {
    return element.value;
  } else if (element.type === "element") {
    const attributes = Object.entries(element.attributes || {})
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    const children = (element.children || []).map(serializeSvgElement).join("");
    return `<${element.name} ${attributes}>${children}</${element.name}>`;
  }
  return "";
};
