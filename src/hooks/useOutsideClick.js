import { useEffect, useRef } from "react";

export function useOutsideClick(handleClose, handleCapture = true) {
    const modal = useRef(null);

    useEffect(
      function () {
        function handleClickOverlay(e) {
          if (modal.current && !modal.current.contains(e.target)) handleClose();
        }
  
        document.addEventListener("click", handleClickOverlay, handleCapture);
  
        return () => document.removeEventListener("click", handleClickOverlay, handleCapture);
      },
      [handleClose]
    );

    return modal;
}