import Button from "./Button";
const Modal = ({ task, onClose, onIsOpen, onDelete }) => {
  return (
    <>
      {onIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-xs justify-center items-center flex"
        >
          <div id="myModal" className="modal w-full md:w-[25%] h-[25%] mx-2">
            {/* <div className="header-confirm">
              <h3>Confirm Delete</h3>
            </div> */}
            <div className="modal-content">
              <p>Do you want to delete task ?</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: '100%',
              }}
            >
              <Button
                bgcolor="black"
                text="Confirm"
                onClick={() => onDelete(task._id)}
              />
              <Button bgcolor="darkred" text="Cancel" onClick={() => onClose()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
