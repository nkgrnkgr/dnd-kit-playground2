import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  itemId: string;
  children: React.ReactNode;
};

export const SortableItem: React.FC<Props> = ({ itemId, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `${itemId}` });

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
