import React from "react";

export default React.memo(function Cell({ value, index, onClick }) {
  // console.log(value);

  const cellClick = () => onClick({ index: index });

  let token;
  switch (value) {
    case 1:
        token = "X";
        break;
    case -1:
        token = "O";
        break;
    default:
        token = ""
  }

  return (
    <div className="h-16 w-16 flex justify-center items-center text-white border text-4xl border-white" onClick={cellClick}>
      {token}
    </div>
  );
});
