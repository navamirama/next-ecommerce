"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96"
      style={{ backgroundColor: "black", color: "white" }}
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
