import { useDraggable } from "@dnd-kit/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  itemId: string;
};

export const Draggable: React.FC<Props> = ({ children, itemId }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ItemId-${itemId}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};
