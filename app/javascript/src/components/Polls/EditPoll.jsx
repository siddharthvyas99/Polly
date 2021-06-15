import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";

import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import { getFromLocalStorage } from "helpers/storage";

const EditPoll = ({ history }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const authUserId = getFromLocalStorage("authUserId");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  const [options, setOptions] = useState([]);

  if (!isLoggedIn) {
    history.push("/login");
  }

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      if (response.data.poll.creator_id == authUserId)
        setTitle(response.data.poll.title);
      setOptions(response.data.poll.poll_options);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update(id, {
        poll: { title, poll_options_attributes: options },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <PollForm
        title={title}
        options={options}
        setTitle={setTitle}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
        type="update"
      />
    </Container>
  );
};

export default EditPoll;
