import React, { useState, useEffect, useRef } from "react";
import TableRow from "./TableRow";
import Search from "./Search";
import NotFound from "./NotFound";
import DeleteSelectedButton from "./DeleteSelectedButton";
import Pagination from "./Pagination";
import EditModal from "./EditModal";

function Table({ tableData, setTableData, removeDataHandler }) {
  const [checked, setChecked] = useState(false);
  const headerCheckboxRef = useRef();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredData, setFilteredData] = useState([...tableData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditingUser, setCurrentEditingUser] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  useEffect(() => {
    setCurrentPage(1); // reset to first page when data changes
  }, [filteredData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  //store data from filteredData to paginatedData
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return; // ignore invalid page numbers
    }
    headerCheckboxRef.current.checked = false;
    setCurrentPage(newPage);
  }

  function selectAllHandler(event) {
    let checkboxes = document.querySelectorAll(".checkbox");
    let tableRows = document.querySelectorAll(".table-row");

    checkboxes?.forEach((checkbox, index) => {
      checkbox.checked = event.target.checked;
      if (checkbox.checked && tableRows[index]) {
        tableRows[index].style.background = "#e9ecef"; // Set the row color to gray when the checkbox is selected
      } else if (tableRows[index]) {
        tableRows[index].style.background = ""; // Remove the row color when the checkbox is deselected
      }
    });

    if (event.target.checked) {
      setSelectedRowIds(paginatedData.map((user) => user.id));
    } else {
      setSelectedRowIds([]);
    }
    setChecked(event.target.checked);
  }

  function deSelectTHeadCheckboxAfterDeleteRows() {
    let checkbox = document.getElementById("checkbox-all-search");
    checkbox.checked = false;
    setChecked(checkbox);
    setSelectedRowIds([]);
  }

  return (
    <div className="container">
      <Search userData={tableData} setFilteredData={setFilteredData} />
      <br />
      <div className="main">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th scope="col" className="head-cell">
                <div className="checkbox-container">
                  <input
                    ref={headerCheckboxRef}
                    id="checkbox-all-search"
                    type="checkbox"
                    className="checkbox"
                    value={checked}
                    onChange={selectAllHandler}
                  />
                  <label htmlFor="checkbox-all-search" className="sr">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="col-name">
                Name
              </th>
              <th scope="col" className="col-name">
                Email
              </th>
              <th scope="col" className="col-name">
                Role
              </th>
              <th scope="col" className="col-name">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length !== 0 ? (
              paginatedData.map((user) => {
                return (
                  <TableRow
                    key={user.id}
                    user={user}
                    selectedRowIds={selectedRowIds}
                    setSelectedRowIds={setSelectedRowIds}
                    removeDataHandler={removeDataHandler}
                    openEditModal={() => {
                      setIsModalOpen(true);
                      setCurrentEditingUser(user);
                    }}
                  />
                );
              })
            ) : (
              <NotFound />
            )}
          </tbody>
        </table>
      </div>
      <DeleteSelectedButton
        selectedRowIds={selectedRowIds}
        setSelectedRowIds={setSelectedRowIds}
        userData={tableData}
        setTableData={setTableData}
        deSelectTHeadCheckboxAfterDeleteRows={
          deSelectTHeadCheckboxAfterDeleteRows
        }
      />
      <div>
        <Pagination
          changePage={changePage}
          currentPage={currentPage}
          totalPages={totalPages}
          dataLength={filteredData.length}
        />
      </div>
      <EditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentEditingUser={currentEditingUser}
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
}

export default Table;
