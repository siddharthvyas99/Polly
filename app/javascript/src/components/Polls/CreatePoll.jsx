import React, { useState } from "react";
import { either, isEmpty, isNil } from "ramda";

import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/polls";
import { getFromLocalStorage } from "helpers/storage";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("Best OS for ROR development");
  const [options, setOptions] = useState([
    { option: "Mac" },
    { option: "Ubuntu" },
    { option: "Windows" },
    { option: "Debian" },
  ]);
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  if (!isLoggedIn) {
    history.push("/login");
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.create({
        poll: { title, poll_options_attributes: options },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm
        setTitle={setTitle}
        options={options}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;
