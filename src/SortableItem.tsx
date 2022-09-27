import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  // const t: Transform | null = transform ? { ...transform, scaleX: 1 } : null;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  console.log(style);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
