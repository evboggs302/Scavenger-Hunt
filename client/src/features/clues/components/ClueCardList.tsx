import { CardListContainer } from "@lib/components/Cards/CardListContainer";
import { ClueCard } from "./ClueCard";
import { useClueContext } from "@lib/context/ClueContext";
import { NoCardsToShowText } from "@lib/components/Cards/NoCardsToShowText";

export const ClueCardList = () => {
  const { data } = useClueContext();

  const clueCards = data?.clues
    ?.filter((cl) => cl !== null)
    .map((clu) => <ClueCard key={clu?._id} clue={clu} />);

  if (clueCards && clueCards.length === 0) {
    return <NoCardsToShowText type="clues" />;
  }

  return <CardListContainer>{clueCards}</CardListContainer>;
};
