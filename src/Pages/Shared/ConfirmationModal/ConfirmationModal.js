import React from "react";

const ConfirmationModal = ({title, message, closeModal, modalData, successAction, successBtnName}) => {
  return (
    <div>
       
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-outline btn-md mr-3">
              {successBtnName}
            </label>
            <button className="btn btn-outline btn-md" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
