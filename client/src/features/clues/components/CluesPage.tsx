import { useClueContext } from "@lib/context/ClueContext";
import { ClueCard } from "./ClueCard";
import { ClueCardList } from "./ClueCardList";
import { ManageCluesMenu } from "./ManageCluesMenu";

export const CluesPage = () => {
  return (
    <>
      <div>
        <ManageCluesMenu />
      </div>
      <ClueCardList />
    </>
  );
};
