import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  children: React.ReactNode;
  id: string;
  data: Record<string, unknown>;
};

export const Sortable: React.FC<Props> = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data,
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
