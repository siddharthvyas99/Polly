import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TableRow = ({ data, destroyPoll, updatePoll, showPoll, isLoggedIn }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td
            className={classnames(
              "px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap text-bb-purple",
              {
                "cursor-pointer": isLoggedIn,
              },
              { "text-opacity-50": !isLoggedIn }
            )}
            onClick={() => isLoggedIn && showPoll(rowData.id)}
          >
            {rowData.title}
          </td>
          {isLoggedIn && (
            <>
              <td style={{ width: "164px" }}></td>
              <td className="px-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out ri-draft
                  ri-draft-5-line hover:text-bb-red"
                  onClick={() => updatePoll(rowData.id)}
                ></i>
              </td>
            </>
          )}
          {isLoggedIn && (
            <>
              <td style={{ width: "164px" }}></td>
              <td className="px-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-delete-bin-5-line hover:text-bb-red"
                  onClick={() => destroyPoll(rowData.id)}
                ></i>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPoll: PropTypes.func,
  updatePoll: PropTypes.func,
};

export default TableRow;
