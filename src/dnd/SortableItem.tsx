import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  itemId: string;
  rowId: string;
  children: React.ReactNode;
};

export const SortableItem: React.FC<Props> = ({ itemId, rowId, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${itemId}`,
      data: {
        rowId,
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
