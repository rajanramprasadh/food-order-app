import { Fragment } from "react";
import ReactDOM from "react-dom";

import Backdrop from "../Backdrop/Backdrop";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

// import classes from "./Modal.module.css";

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
