import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

function EditModal({
  isModalOpen,
  setIsModalOpen,
  currentEditingUser,
  tableData,
  setTableData,
}) {

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit User Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">Edit User</h2>
          <button className="modal-close-button" onClick={closeModal}>
            X
          </button>
        </div>

        {currentEditingUser && (
          <form
            className="modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              // Get the new values from the form
              const newName = e.target.elements.name.value;
              const newEmail = e.target.elements.email.value;

              // Create a new user object
              const updatedUser = {
                ...currentEditingUser,
                name: newName,
                email: newEmail,
              };

              // Update the user in the state
              setTableData(
                tableData.map((user) =>
                  user.id === updatedUser.id ? updatedUser : user
                )
              );

              // Close the modal
              closeModal();
            }}
          >
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={currentEditingUser.name}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={currentEditingUser.email}
                required
              />
            </div>
            <div>
              <button type="submit">Submit Changes</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default EditModal;
