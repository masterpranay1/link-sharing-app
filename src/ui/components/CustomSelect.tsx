import Select, { components, ControlProps, Props } from "react-select";
import clsx from "clsx";

const Control = ({ children, ...props }: ControlProps<any, false>) => {
  // @ts-ignore
  const { iconUrl } = props.selectProps;
  const style = { cursor: "pointer", marginRight: "1em" };

  return (
    <components.Control {...props}>
      <span style={style}>
        <img src={iconUrl} />
        Image
      </span>
      {children}
    </components.Control>
  );
};

const CustomSelect = (props: Props<any>) => {
  // const styles: StylesConfig<any, false> = {
  //   control: (css) => ({ ...css, paddingLeft: "1rem" }),
  // };

  const options: any[] = [
    {
      value: "Youtube",
      label: "Youtube",
    },
    {
      value: "Github",
      label: "Github",
    },
    {
      value: "Linkedin",
      label: "Linkedin",
    },
  ];

  return (
    <>
      <label htmlFor="platform" className="text-sm text-slate-600 block mb-2">
        Platform
      </label>
      <Select
        {...props}
        components={{ Control }}
        unstyled
        // styles={styles}
        classNames={{
          option: ({ isSelected }) => {
            return clsx(
              "bg-white px-4 py-2 hover:bg-slate-100 border-b last:border-0 first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg",
              isSelected ? "bg-slate-200" : ""
            );
          },
          control: ({}) => clsx("border rounded-lg bg-white px-4 py-2"),
          menu: () => clsx("border rounded-lg mt-1"),
          dropdownIndicator: () => clsx(
            'text-violet-500'
          )
        }}
        options={options}
        isMulti={false}
        isSearchable={false}
        name="platform"
        // @ts-ignore
        iconUrl={null}
      />
    </>
  );
};

export default CustomSelect;
