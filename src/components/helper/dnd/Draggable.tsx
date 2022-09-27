import { useDraggable } from "@dnd-kit/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  id: string;
  data?: Record<string, unknown>;
};

export const Draggable: React.FC<Props> = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
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
