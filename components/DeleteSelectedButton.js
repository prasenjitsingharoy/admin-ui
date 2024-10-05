import React from "react";
import { toast } from "react-toastify";

function DeleteSelectedButton({
  userData,
  setTableData,
  selectedRowIds,
  deSelectTHeadCheckboxAfterDeleteRows,
}) {

  function deleteSelected() {
    const newUserData = userData.filter(
      (user) => !selectedRowIds.includes(user.id)
    );

    if (newUserData.length === userData.length) return;

    toast.success("Selected row deleted successfully");
    setTableData(newUserData);
    // Clear selection after deletion
    deSelectTHeadCheckboxAfterDeleteRows();
  }

  return (
    <div>
      <button className="deleted-btn" onClick={deleteSelected}>
        Delete Selected
      </button>
    </div>
  );
}

export default DeleteSelectedButton;
