// Importar todos los ejemplos
import { jsAsync } from "./js-async";
import { jsDom } from "./js-dom";
import { reactCounter } from "./react-counter";
import { reactNodeGraph } from "./react-nodegraph";

// Exportar todos los ejemplos organizados por categorías
export const examples = {
  // React Examples
  "react-counter": reactCounter,
  "react-nodegraph": reactNodeGraph,

  // JavaScript Examples
  "js-dom": jsDom,
  "js-async": jsAsync,
};

// Categorías para organizar en el selector
export const categories = {
  React: ["react-counter", "react-nodegraph"],
  JavaScript: ["js-dom", "js-async"],
};