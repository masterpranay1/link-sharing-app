import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { useState } from "react";

const LinkWrapper = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, transition: null });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-slate-100 p-4"
    >
      Link Wrapper {id}
    </div>
  );
};

const LinkFormWrapper = () => {
  const [formItems, setFormItems] = useState([
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (active.id !== over?.id) {
          setFormItems((prevItems) => {
            const newItems = [...prevItems];
            const draggedItem = newItems.find(
              (item) => item.id === active.id
            ) as { id: string };
            const overIndex = newItems.findIndex(
              (item) => item.id === over?.id
            );
            newItems.splice(newItems.indexOf(draggedItem), 1);
            newItems.splice(overIndex, 0, draggedItem);
            return newItems;
          });
        }
      }}
    >
      <SortableContext items={formItems.map((item) => item.id)}>
        {formItems.map((item) => (
          <LinkWrapper id={item.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default function LinkForm() {
  return (
    <div className="flex flex-col gap-4 m-4 sm:m-0 sm:my-4 p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-slate-600">
        Customize your links
      </h1>
      <p className="text-gray-400">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>

      {/* Add new Link Button - Outline */}
      <button className="border border-violet-400 rounded-md p-2 text-violet-600 font-semibold hover:text-white hover:bg-violet-400 transition-all">
        + Add new link
      </button>

      <LinkFormWrapper />
    </div>
  );
}
