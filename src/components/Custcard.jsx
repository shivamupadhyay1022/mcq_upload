import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Custcard(props) {
  const item = props.item;
  const [quest, setquest] = useState();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setquest(item.question);
  }, [item]);

  return (
    <div>
      {item.question}
      <button onClick={() => {onOpenModal();}} className="btn">
        open modal
      </button>

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my_modal_6" className="modal-toggle" /> */}
      <div className={ open ? "modal modal-open" : " modal"} >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{quest}</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <button onClick={() => {onCloseModal(); console.log(open)}} className="btn">
              Close!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Custcard;
