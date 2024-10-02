import styled from "@emotion/styled";
import { Menu, MenuItem, Modal } from "@mui/material";
import { useRef, useState } from "react";
import { UploadFileDialog } from "./UploadFileDialog";
import { getModelsMetadata, getSelectedUuuid } from "./storage";

export function FileMenu(props: {
  newModel: () => void;
  setModel: (key: string) => void;
  onDownload: () => void;
  onModelUpload: (blob: Blob) => void;
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isImportMenuOpen, setImportMenuOpen] = useState(false);
  const anchorElement = useRef<HTMLDivElement>(null);
  const models = getModelsMetadata();
  const uuids = Object.keys(models);
  const selectedUuid = getSelectedUuuid();

  const elements = [];
  for (const uuid of uuids) {
    elements.push(
      <MenuItemWrapper
        key={uuid}
        onClick={() => {
          props.setModel(uuid);
          setMenuOpen(false);
        }}
        style={{ justifyContent: "flex-start" }}
      >
        <span style={{ width: "20px" }}>
          {uuid === selectedUuid ? "•" : ""}
        </span>
        <MenuItemText>{models[uuid]}</MenuItemText>
      </MenuItemWrapper>,
    );
  }

  return (
    <>
      <FileMenuWrapper
        onClick={(): void => setMenuOpen(true)}
        ref={anchorElement}
      >
        File
      </FileMenuWrapper>
      <Menu
        open={isMenuOpen}
        onClose={(): void => setMenuOpen(false)}
        anchorEl={anchorElement.current}
        // anchorOrigin={properties.anchorOrigin}
      >
        <MenuItemWrapper onClick={props.newModel}>
          <MenuItemText>New</MenuItemText>
        </MenuItemWrapper>
        <MenuItemWrapper
          onClick={() => {
            setImportMenuOpen(true);
            setMenuOpen(false);
          }}
        >
          <MenuItemText>Import</MenuItemText>
        </MenuItemWrapper>
        <MenuItemWrapper>
          <MenuItemText onClick={props.onDownload}>
            Download (.xlsx)
          </MenuItemText>
        </MenuItemWrapper>
        <MenuDivider />
        {elements}
      </Menu>
      <Modal
        open={isImportMenuOpen}
        onClose={() => {
          setImportMenuOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <UploadFileDialog
            onClose={() => setImportMenuOpen(false)}
            onModelUpload={props.onModelUpload}
          />
        </>
      </Modal>
    </>
  );
}

const MenuDivider = styled("div")`
  width: 80%;
  margin: auto;
  border-top: 1px solid #e0e0e0;
`;

const MenuItemText = styled("div")`
  color: #000;
`;

const MenuItemWrapper = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
`;

const FileMenuWrapper = styled("div")`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: Inter;
  padding: 10px;
  height: 20px;
  border-radius: 4px;
  margin: 10px;
  &:hover {
    background-color: #f2f2f2;
  }
`;
