import { Editor } from "tinymce";
import * as React from "react";
import { Excalidraw, exportToSvg } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

import Modal from "./Modal";
import { PrimaryButton, SecondaryButton } from "./Modal/styles";

const MyPlugin = (props: { editor: Editor }) => {
  const [modalStauts, setModalStatus] = React.useState("block");
  const [excalidrawAPI, setExcalidrawAPI] =
    React.useState<ExcalidrawImperativeAPI | null>(null);
  const { editor } = props;

  const onSubmit = () => {
    if (excalidrawAPI) {
      exportToSvg({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      })
        .then((res) => {
          editor.insertContent(res.outerHTML);
          setModalStatus("none");
        })
        .catch((error) => console.log("error => ", error));
    }
  };

  return (
    <Modal display={modalStauts}>
      <div style={{ height: window.innerHeight / 1.36 }}>
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
