import React from "react";

const ErrorDisplay = ({ error }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">
      <div className="alert alert-error">
        <span>Error: {error?.message || "Something went wrong"}</span>
      </div>
    </div>
  );
};

export default ErrorDisplay;