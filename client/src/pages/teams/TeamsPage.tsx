import React from "react";
import { TeamCardContent } from "./TeamCardContent";
import { useHuntContext } from "@/lib/context/HuntContext";

export const TeamsPage = () => {
  const { data } = useHuntContext();

  const teams = data?.hunt?.teams;

  // const teamCards = teams?.map((tm, dex) => (
  //   <CardComponent
  //     key={tm?._id}
  //     title={`Team ${dex + 1}`}
  //     content={
  //       <TeamCardContent members={tm.members} number={tm.device_number} />
  //     }
  //   />
  // ));

  // return <Row gutter={16}>{teamCards}</Row>;
  return <></>;
};
