import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ItemType } from "../../../modules/itemsSlice";

type Props = {
  itemId: string;
  rowId: string;
  type: ItemType;
  children: React.ReactNode;
};

export const SortableItem: React.FC<Props> = ({
  itemId,
  rowId,
  type,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${itemId}`,
      data: {
        rowId,
        type,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};