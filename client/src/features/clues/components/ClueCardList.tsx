import React from "react";
import { ClueCard } from "./ClueCard";
import { useClueContext } from "@lib/context/ClueContext";

export const ClueCardList = () => {
  const { data } = useClueContext();
  const clueCards = data?.clues
    ?.filter((cl) => cl !== null)
    .map((clu) => <ClueCard key={clu?._id} clue={clu} />);
  return <div>{clueCards}</div>;
};
