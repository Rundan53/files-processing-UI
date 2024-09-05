import React from "react";

function Initial({ text }) {
  return (
    <div className="w-[3rem] h-[3rem] text-[1.7rem] bg-blue-600 text-muted rounded-full grid place-items-center">
      {text}
    </div>
  );
}

export default Initial;