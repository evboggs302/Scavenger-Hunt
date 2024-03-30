import React from "react";
import { useParams } from "react-router-dom";

export const HuntInfo = () => {
  const { id } = useParams();
  console.log(id);

  return <div>HuntInfo</div>;
};
