import React from "react";
import NotFoundImage from "../asset/no-data-found.png";

function NotFound() {
  return (
    <tr>
      <td className="not-found" colSpan="5">
        <img src={NotFoundImage} alt="No Data Found" />
      </td>
    </tr>
  );
}

export default NotFound;
