import React from "react";
import { createRoot } from "react-dom/client";

import { Editor } from "tinymce";
import MyPlugin from "./components/MyPlugin";

export const setupReactApp = (element: Element, editor: Editor) => {
  const root = createRoot(element);
  root.render(<MyPlugin editor={editor} />);
};

export const removeReactApp = (element: Element) => {
  const root = createRoot(element);
  root.unmount();
};
