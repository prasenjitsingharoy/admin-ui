import React from "react";

function TableRow({
  user,
  selectedRowIds,
  setSelectedRowIds,
  removeDataHandler,
  openEditModal,
}) {
  return (
    <tr
      className={`table-row ${
        selectedRowIds.includes(user.id) ? "selected-row" : ""
      }`}
      key={user.id}
    >
      <td className="table-desc">
        <div className="checkbox-container">
          <input
            id="row-checkbox"
            type="checkbox"
            className="checkbox"
            checked={selectedRowIds.includes(user.id)}
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedRowIds([...selectedRowIds, user.id]);
              } else {
                setSelectedRowIds(
                  selectedRowIds.filter((id) => id !== user.id)
                );
              }
            }}
          />
          <label htmlFor="checkbox-table-search-1" className="sr">
            checkbox
          </label>
        </div>
      </td>
      <td className="table-data">{user.name}</td>
      <td className="table-data">{user.email}</td>
      <td className="table-data">{user.role}</td>
      <td className="table-action">
        <button className="edit-btn" onClick={openEditModal}>
          Edit
        </button>
        <button
          className="remove-btn"
          onClick={() => removeDataHandler(user.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
