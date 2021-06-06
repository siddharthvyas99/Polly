import React from "react";
import Table from "./Table";

const ListPolls = ({ data, destroyPoll, updatePoll, showPoll, isLoggedIn }) => {
  return (
    <Table
      data={data}
      destroyPoll={destroyPoll}
      updatePoll={updatePoll}
      showPoll={showPoll}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default ListPolls;
