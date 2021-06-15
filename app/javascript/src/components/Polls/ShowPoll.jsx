import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";

import Container from "components/Container";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import votesApi from "apis/votes";
import { getFromLocalStorage } from "helpers/storage";
import ProgressBar from "components/Polls/ProgressBar";

const Result = ({ options, selected, votedAt }) => {
  const countVotes = () => {
    const count = Object.values(options).reduce(
      (count, { vote }) => count + vote,
      0
    );
    return count;
  };

  const getVoteCount = vote => {
    const voteCount = countVotes() == 0 ? 1 : countVotes();
    return (vote * 100) / voteCount;
  };

  return (
    <>
      <ul className="mb-6 mt-3 px-6 pointer-events-none">
        {options.map(option => (
          <li className="my-6 block w-full" key={option.id}>
            <ProgressBar
              className={classnames(
                "border rounded-full h-10 w-3/4 inline-block cursor-pointer hover:bg-blue-300 hover:text-white",
                { "border-blue-500": selected == option.id }
              )}
              completed={getVoteCount(option.vote).toFixed(2)}
              option={option.option}
            />
          </li>
        ))}
      </ul>
      <h2>Thanks for voting !!</h2>

      <br />
      <br />

      {selected == -1 && (
        <p className="text-sm font-regular leading-5 text-bb-gray-600 text-opacity-50">
          Your vote was added on {new Date(votedAt).toString()}
        </p>
      )}
    </>
  );
};

const ShowPoll = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [hasVoted, setHasVoted] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const authUserId = getFromLocalStorage("authUserId");

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      setOptions(response.data.poll.poll_options);

      const voteResponse = await votesApi.show(`${id}?user_id=${authUserId}`);
      setAlreadyVoted(voteResponse.data.votedFor[0]);

      setPageLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const clickHandler = id => setSelected(id);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setOptions(state => {
        state.map(option => {
          if (option.id == selected) option.vote = ++option["vote"];
        });
        return state;
      });
      setHasVoted(true);
      await pollsApi.update(id, {
        poll: { poll_options_attributes: options },
      });

      await votesApi.create({ vote: { poll_id: id, user_id: authUserId } });

      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        {title}
      </h1>
      {!hasVoted && !alreadyVoted && (
        <>
          <ul className="mb-6 mt-3 px-6">
            {options.map(option => (
              <li
                className="my-6 block w-full"
                key={option.id}
                onClick={() => clickHandler(option.id)}
              >
                <span
                  className={classnames(
                    "border rounded-full p-3 w-3/4 inline-block cursor-pointer hover:bg-blue-300 hover:text-white",
                    { "bg-blue-300 text-white": selected == option.id }
                  )}
                >
                  {option.option}
                </span>
              </li>
            ))}
          </ul>
          {selected != -1 && (
            <div className="flex justify-center px-6">
              <Button
                loading={false}
                onClick={handleSubmit}
                buttonText="Submit"
              />
            </div>
          )}
        </>
      )}

      {hasVoted && !alreadyVoted && (
        <Result options={options} selected={selected} />
      )}

      {alreadyVoted && (
        <Result
          options={options}
          selected="-1"
          votedAt={alreadyVoted.created_at}
        />
      )}
    </Container>
  );
};

export default ShowPoll;
