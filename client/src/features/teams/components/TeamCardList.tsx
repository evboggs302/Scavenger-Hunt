import { TeamCard } from "./TeamCard";
import { useHuntContext } from "@lib/context/HuntContext";
import { NoCardsToShowText } from "@lib/components/Cards/NoCardsToShowText";
import { CardListContainer } from "@lib/components/Cards/CardListContainer";

export const TeamCardList = () => {
  const { data } = useHuntContext();
  const teams = data?.hunt?.teams;

  const teamCards = teams
    ?.filter((tm) => tm !== null)
    .map((tm) => <TeamCard key={tm?._id} team={tm} />);

  if (teamCards && teamCards.length === 0) {
    return <NoCardsToShowText type="teams" />;
  }

  return <CardListContainer>{teamCards}</CardListContainer>;
};
