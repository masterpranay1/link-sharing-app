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
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import LinkIcon from "@/assets/link-icon.png";
import { notifySuccess } from "@/services/notification";

const LinkWrapper = ({
  id,
  index,
  removeItem,
}: {
  id: string;
  index: number;
  removeItem: (id: string) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id, transition: null });

  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onChange = (e: any) => {
    if (e.value === "Other") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-100 p-4 rounded">
      <div className="flex gap-2 text-slate-600">
        <span ref={setActivatorNodeRef} {...attributes} {...listeners}>
          =
        </span>
        <span className="font-bold">Link #{index + 1}</span>
        <span className="ml-auto cursor-pointer" onClick={() => removeItem(id)}>Remove</span>
      </div>

      <div className="input_wrapper mt-2">
        <CustomSelect onChange={onChange} />

        {isOtherSelected && (
          <label
            htmlFor="other-platform-text"
            className="px-4 py-2 bg-white rounded-lg mt-2 block border"
          >
            <input
              type="text"
              name="other-platform-text"
              className="w-full focus:outline-none"
              placeholder="Enter the platform name"
            />
          </label>
        )}

        <label
          htmlFor="link"
          className="text-sm text-slate-600 block mt-4 mb-2"
        >
          Link
        </label>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border">
          <img src={LinkIcon} alt="link-icon" className="w-6 h-6" />
          <input
            type="text"
            className="w-full focus:outline-none"
            name="link"
          />
        </div>
      </div>
    </div>
  );
};

const LinkFormWrapper = ({
  formItems,
  setFormItems,
  removeItem,
}: {
  formItems: { id: string }[];
  setFormItems: any;
  removeItem: (id: string) => void;
}) => {
  // const [formItems, setFormItems] = useState(items);

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
          setFormItems((prevItems: { id: string }[]) => {
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
        {formItems?.map((item, index) => (
          <LinkWrapper id={item.id} key={index} index={index} removeItem={removeItem}/>
        ))}

        {
          formItems.length === 0 && (
            <div className="bg-slate-100 p-4 rounded">
              <div className="flex gap-2 items-center justify-center text-slate-600 w-full">
                <span className="font-bold text-center block">No links added yet</span>
                <span className="text-2xl block">🥲🥹</span>
              </div>
            </div>
          )
        }
      </SortableContext>
    </DndContext>
  );
};

export default function LinkForm({ className }: { className?: string }) {
  const [formItems, setFormItems] = useState([
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]);


  const handleAddItem = () => {
    setFormItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.push({ id: `${newItems.length + 1}` });
      return newItems;
    });

    notifySuccess("Link added successfully");
  };

  const handleRemoveItem = (id: string) => {
    setFormItems((prevItems) => {
      const newItems = [...prevItems];
      const itemToRemove: { id: string } | undefined = newItems.find(
        (item) => item.id === id
      );
      if (!itemToRemove) return newItems;
      newItems.splice(newItems.indexOf(itemToRemove), 1);
      return newItems;
    });

    notifySuccess("Link removed successfully");
  };

  return (
    <div
      className={`flex flex-col gap-4 p-4 bg-white rounded-lg relative ${className}`}
    >
      <h1 className="text-2xl font-bold text-slate-600">
        Customize your links
      </h1>
      <p className="text-gray-400">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>

      {/* Add new Link Button - Outline */}
      <button
        onClick={handleAddItem}
        className="border border-violet-400 rounded-md p-2 text-violet-600 font-semibold hover:text-white hover:bg-violet-400 transition-all"
      >
        + Add new link
      </button>

      <div className="flex flex-col gap-4">
        <LinkFormWrapper formItems={formItems} setFormItems={setFormItems} removeItem={handleRemoveItem}/>
      </div>

      <div className="py-4 border-t sticky bg-white w-full bottom-0 left-0 flex">
        <button className="w-full sm:w-fit ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
          Submit
        </button>
      </div>
    </div>
  );
}
