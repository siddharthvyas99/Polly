import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  options,
  setTitle,
  setOptions,
  loading,
  handleSubmit,
}) => {
  const handleChange = (e, idx) => {
    e.preventDefault();
    setOptions(preState => {
      const curState = [...preState];
      curState[idx].option = e.target.value;
      return curState;
    });
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Docs Revamp"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        label="First Poll Option"
        placeholder="Option"
        value={options[0].option}
        onChange={e => handleChange(e, 0)}
      />
      <Input
        label="Second Poll Option"
        placeholder="Option"
        value={options[1].option}
        onChange={e => handleChange(e, 1)}
      />
      <Input
        label="Third Poll Option"
        placeholder="Option"
        value={options[2].option}
        onChange={e => handleChange(e, 2)}
      />
      <Input
        label="Fourth Poll Option"
        placeholder="Option"
        value={options[3].option}
        onChange={e => handleChange(e, 3)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;
