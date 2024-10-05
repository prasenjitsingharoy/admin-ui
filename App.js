import { useEffect, useState } from "react";
import Table from "./components/Table";
import { apiUrl } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

function App() {
  const [tableData, setTableData] = useState([]);

  //handling state of spinner
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const output = await response.json();
      setTableData(output);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function removeDataHandler(id) {
    const newTableData = tableData.filter((data) => data.id !== id);
    toast.success("Deleted successfully");
    setTableData(newTableData);
  }

  return (
    <div className="app">
      {loading ? (
        <Spinner />
      ) : (
        <Table
          tableData={tableData}
          setTableData={setTableData}
          removeDataHandler={removeDataHandler}
        />
      )}
    </div>
  );
}

export default App;
