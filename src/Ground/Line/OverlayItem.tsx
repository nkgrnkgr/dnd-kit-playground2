import { useRecoilValue } from "recoil";
import { SortableItem } from "../../dnd/SortableItem";
import { activeElementPropertyState } from "../../store/activeElementProperty";
import { Transparent } from "./Transparent";

type Props = {
  itemId: string;
};

export const OverLayItem: React.FC<Props> = ({ itemId }) => {
  const { height, width } = useRecoilValue(activeElementPropertyState);

  return (
    <SortableItem itemId={itemId}>
      <Transparent height={height} width={width} />
    </SortableItem>
  );
};
