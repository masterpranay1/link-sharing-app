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
import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import LinkIcon from "@/assets/link-icon.png";
import { notifySuccess, notifyError } from "@/services/notification";
import { useGetLinks, useSaveLink, useDeleteLink } from "@/application/useLink";

const LinkWrapper = ({
  id,
  index,
  removeItem,
  onPlatformChange,
  onUrlChange,
  link,
}: {
  id: string;
  index: number;
  removeItem: (id: string) => void;
  onPlatformChange: (value: string, id: string, isOther: boolean) => void;
  onUrlChange: (value: string, id: string) => void;
  link?: { id: string; platform: string; url: string; isOther: boolean };
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
  const [otherPlatform, setOtherPlatform] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (link) {
      if (link.isOther) {
        setIsOtherSelected(true);
        setOtherPlatform(link.platform);
      }
      setUrl(link.url);
    }
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onChange = (e: any) => {
    if (e.value === "Other") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      onPlatformChange(e.value, id, false);
    }
  };

  const handleOtherPlatformChange = (e: any) => {
    setOtherPlatform(e.target.value);
    onPlatformChange(e.target.value, id, true);
  };

  const handleUrlChange = (e: any) => {
    setUrl(e.target.value);
    onUrlChange(e.target.value, id);
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-100 p-4 rounded">
      <div className="flex gap-2 text-slate-600">
        <span ref={setActivatorNodeRef} {...attributes} {...listeners}>
          =
        </span>
        <span className="font-bold">Link #{index + 1}</span>
        <span className="ml-auto cursor-pointer" onClick={() => removeItem(id)}>
          Remove
        </span>
      </div>

      <div className="input_wrapper mt-2">
        <CustomSelect
          onChange={onChange}
          value={
            link?.isOther
              ? { value: "Other", label: "Other" }
              : link?.platform
              ? { value: link.platform, label: link.platform }
              : null
          }
        />

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
              value={otherPlatform}
              onChange={handleOtherPlatformChange}
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
            placeholder="Enter the link"
            value={url}
            onChange={handleUrlChange}
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
  onPlatformChange,
  onUrlChange,
  links,
}: {
  formItems: { id: string }[];
  setFormItems: any;
  removeItem: (id: string) => void;
  onPlatformChange: (value: string, id: string, isOther: boolean) => void;
  onUrlChange: (value: string, id: string) => void;
  links: { id: string; platform: string; url: string; isOther: boolean }[];
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
          <LinkWrapper
            id={item.id}
            key={index}
            index={index}
            removeItem={removeItem}
            onPlatformChange={onPlatformChange}
            onUrlChange={onUrlChange}
            link={links.find((link) => link.id === item.id)}
          />
        ))}

        {formItems.length === 0 && (
          <div className="bg-slate-100 p-4 rounded">
            <div className="flex gap-2 items-center justify-center text-slate-600 w-full">
              <span className="font-bold text-center block">
                No links added yet
              </span>
              <span className="text-2xl block">🥲🥹</span>
            </div>
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default function LinkForm({ className, setReRenderMockup }: { className?: string; setReRenderMockup: any }) {
  const { getLinksHandler } = useGetLinks();
  const { saveLinkHandler } = useSaveLink();
  const { deleteLinkHandler } = useDeleteLink();

  const [formItems, setFormItems] = useState<{ id: string }[]>([]);

  const [links, setLinks] = useState<
    { id: string; platform: string; url: string; isOther: boolean }[]
  >([]);

  useEffect(() => {
    const getLinks = async () => {
      const response = await getLinksHandler();
      if (response) {
        const links = response;
        setLinks(links);
        setFormItems(links.map((link) => ({ id: `${link.id}` })));
      }
    };

    getLinks();
  }, []);

  const handlePlatformChange = (
    value: string,
    id: string,
    isOther: boolean
  ) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      const linkToChange:
        | { id: string; platform: string; url: string; isOther: boolean }
        | undefined = newLinks.find((link) => link.id === id);
      if (!linkToChange) return newLinks;
      linkToChange.platform = value;
      linkToChange.isOther = isOther;
      return newLinks;
    });
  };

  const handleUrlChange = (value: string, id: string) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      const linkToChange:
        | { id: string; platform: string; url: string; isOther: boolean }
        | undefined = newLinks.find((link) => link.id === id);
      if (!linkToChange) return newLinks;
      linkToChange.url = value;
      return newLinks;
    });
  };

  const handleAddItem = () => {
    setFormItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.push({ id: `${newItems.length + 1}` });
      return newItems;
    });

    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.push({
        id: `${newLinks.length + 1}`,
        platform: "",
        url: "",
        isOther: false,
      });
      return newLinks;
    });

    notifySuccess("Link added successfully");
  };

  const handleRemoveItem = async (id: string) => {
    notifySuccess("Link Removing in progress!!")
    setFormItems((prevItems) => {
      const newItems = [...prevItems];
      const itemToRemove: { id: string } | undefined = newItems.find(
        (item) => item.id === id
      );
      if (!itemToRemove) return newItems;
      newItems.splice(newItems.indexOf(itemToRemove), 1);
      return newItems;
    });

    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      const linkToRemove:
        | { id: string; platform: string; url: string; isOther: boolean }
        | undefined = newLinks.find((link) => link.id === id);
      if (!linkToRemove) return newLinks;
      newLinks.splice(newLinks.indexOf(linkToRemove), 1);
      return newLinks;
    });

    await deleteLinkHandler(id);

    setReRenderMockup(true);

    notifySuccess("Link removed successfully");
  };

  const handleSubmit = () => {
    
    if (links.length === 0) {
      notifyError("Please add atleast one link");
      return;
    }
    let isEmpty = false
    links.forEach((link) => {
      if (link.platform === "" || link.url === "") {
        notifyError("Please fill all the fields");
        isEmpty = true
        return;
      }
    });
    if (isEmpty) return;
    links.forEach(async (link) => {
      const response = await saveLinkHandler(
        link.id,
        link.url,
        link.platform,
        link.isOther
      );
      if (response) {
        setReRenderMockup(true);
        notifySuccess("Links saved successfully");
      } else {
        notifyError("Something went wrong");
      }
    });
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
        <LinkFormWrapper
          formItems={formItems}
          setFormItems={setFormItems}
          removeItem={handleRemoveItem}
          onPlatformChange={handlePlatformChange}
          onUrlChange={handleUrlChange}
          links={links}
        />
      </div>

      <div className="py-4 border-t sticky bg-white w-full bottom-0 left-0 flex">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-fit ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
