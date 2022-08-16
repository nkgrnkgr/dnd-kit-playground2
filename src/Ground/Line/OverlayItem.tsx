import { SortableItem } from "../../dnd/SortableItem";
import { Transparent } from "./Transparent";

type Props = {
  itemId: string;
};

export const OverLayItem: React.FC<Props> = ({ itemId }) => {
  return (
    <SortableItem itemId={itemId}>
      <Transparent />
    </SortableItem>
  );
};
