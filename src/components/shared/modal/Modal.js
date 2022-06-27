
// import { createPortal } from "react-dom";
// import React,{useRef,useEffect,useState} from "react";
// import "./modal.css";

// const Modal = ({ isOpened, children, onClose }) => {
//   if (!isOpened) {
//     return null;
//   }
//     const ref = useRef();
//     const [mount, setMount] = useState(false);

//     useEffect(() => {
//         ref.current = document.querySelector(selector);
//         setMount(true);
//     }, [selector]);

//   return createPortal(
//     <div>
//       <div className="overlay"></div>
//       <div className="modal">
//         <div>
//           <span className="close-button" onClick={onClose}>
//             X
//           </span>
//           <div className="modal-content">{children}</div>
//         </div>
//       </div>
//     </div>,
//     document.getElementById("modal")
//   );
// };

// export default Modal;