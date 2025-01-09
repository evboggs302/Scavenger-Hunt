import React from "react";
import { TeamCard } from "./TeamCard";
import { useHuntContext } from "@lib/context/HuntContext";

export const TeamCardList = () => {
  const { data } = useHuntContext();
  const teams = data?.hunt?.teams;

  const teamCards = teams
    ?.filter((tm) => tm !== null)
    .map((tm) => <TeamCard key={tm?._id} team={tm} />);

  return <div>{teamCards}</div>;
};
