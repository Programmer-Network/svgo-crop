# SVGO Crop

## Overview

Dynamically adjusts the [`viewBox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) of SVGs to tightly fit the visible content. It's particularly useful for SVGs with excessive [whitespace or padding](https://iconify.design/docs/icons/icon-basics.html#padding) around the main graphic elements.

## The Problem

Utilizing icons from diverse sources often leads to sizing inconsistencies due to varying [padding](https://iconify.design/docs/icons/icon-basics.html#padding) in different icon sets. This is particularly problematic in applications like rich text editor toolbars, where uniform icon sizing is essential. Disparate whitespace around these icons complicates their alignment and visual harmony. This plugin addresses this by stripping away the excess [padding](https://iconify.design/docs/icons/icon-basics.html#padding), ensuring that the specified SVG dimensions accurately reflect the visible icon size.

## How it Works

The plugin iterates through all `<path>` elements in an SVG, ignoring paths with `fill="none"` (typically non-visible elements). It calculates the [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox) based on visible content and updates the SVG's [`viewBox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) attribute to match this area, effectively cropping the SVG to its visible content.

## Usage

1. Install the plugin in your SVGO environment.
2. Include it in your SVGO configuration.
3. Run SVGO as usual - the plugin will automatically adjust the [`viewBox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) of processed SVGs.

## Requirements

- SVGO
- `svgdom` and `@svgdotjs/svg.js` for DOM manipulation in Node.js.

## Contributing

Contributions are welcome! Feel free to submit pull requests or report issues on the repository.
