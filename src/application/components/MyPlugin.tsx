import { Editor } from "tinymce";
import * as React from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

import Modal from "./Modal";
import { PrimaryButton, SecondaryButton } from "./Modal/styles";
import graphs from "../excalidrawLibs/3d-coordinate-systems-graphs.json";
import mathTeacher from "../excalidrawLibs/math-teacher-library.json";
import mathSymbols from "../excalidrawLibs/mathematical-symbols.json";

const MyPlugin = (props: { editor: Editor }) => {
  const [modalStauts, setModalStatus] = React.useState("block");
  const [excalidrawAPI, setExcalidrawAPI] =
    React.useState<ExcalidrawImperativeAPI | null>(null);
  const { editor } = props;

  React.useEffect(() => {
    if (excalidrawAPI) {
      excalidrawAPI.updateLibrary({
        libraryItems: [
          ...graphs.libraryItems,
          ...mathTeacher.libraryItems,
          ...mathSymbols.libraryItems,
        ] as any,
      });
    }
  }, [excalidrawAPI]);

  const onSubmit = () => {
    if (excalidrawAPI) {
      exportToBlob({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
        mimeType: "image/svg+xml",
      })
        .then((res) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target.result;
            const img = new Image();
            img.src = dataUrl as string;
            editor.insertContent(`<img src="${dataUrl}" alt="${res.name}">`);
          };
          reader.readAsDataURL(res);
          setModalStatus("none");
        })
        .catch((error) => console.log("error => ", error));
    }
  };

  return (
    <Modal display={modalStauts}>
      <div style={{ height: window.innerHeight / 1.36, overflow: "auto" }}>
        <Excalidraw excalidrawAPI={(api: any) => setExcalidrawAPI(api)} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 20,
        }}
      >
        <SecondaryButton type="button" onClick={() => setModalStatus("none")}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="button" onClick={onSubmit}>
          Save
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default MyPlugin;
