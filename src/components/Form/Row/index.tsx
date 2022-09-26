import { useSelector } from "react-redux";
import { rowsSelector } from "../../../modules/rowsSlice";
import { RootState } from "../../../modules/store";
import { DraggableRow } from "./DraggableRow";
import { SortableRowItem } from "./SortableRowItem";

type Props = {
  rowId: string;
};

export const Row: React.FC<Props> = ({ rowId }) => {
  const itemIds =
    useSelector(
      (state: RootState) => rowsSelector.selectById(state, rowId)?.itemIds
    ) || [];

  return (
    <DraggableRow rowId={rowId}>
      {itemIds.map((id) => (
        <SortableRowItem key={id} itemId={id} rowId={rowId} />
      ))}
    </DraggableRow>
  );
};
