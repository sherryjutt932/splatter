import InputWrapper from "./InputWrapper";
import { type FormFieldProps, useFormFieldProps } from "./Form";
import classes from "./cssUtility";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T = string>
  extends Omit<FormFieldProps<HTMLInputElement, string>, "value" | "onChange"> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
}

function DropdownField<T = string>(rawProps: Props<T>) {
  const props = useFormFieldProps(rawProps);

  const selectedOption = props.options.find(
    (option) => option.value === props.value
  );

  return (
    <InputWrapper {...props}>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <MenuButton
            className={classes(
              `inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-splatter-200/10 px-3 py-2.5 h-12 font-bold
              hocus:bg-splatter-200/15 transition outline-none focus:ring-2 ring-splatter-300/50`,
              props.disabled ? "opacity-50 cursor-not-allowed" : "",
              props.inputClassName
            )}
            disabled={props.disabled}
          >
            {selectedOption
              ? selectedOption.label
              : props.placeholder ?? "Select one"}
            <svg
              className="-mr-1 h-5 w-5 text-splatter-100"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.72-3.73a.75.75 0 111.06 1.06l-4.25 4.26a.75.75 0 01-1.06 0L5.23 8.28a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </MenuButton>
        </div>
        <MenuItems
          anchor="bottom start"
          className="w-[var(--button-width)] [--anchor-gap:8px] px-1.5 py-1 bg-splatter-200/5 backdrop-blur-xl right-0 z-10 rounded-md
         shadow-lg border border-none focus:outline-none max-h-60 overflow-y-auto"
        >
          <div className="py-1">
            {props.options.map((option, idx) => (
              <MenuItem key={idx}>
                <button
                  className={
                    "data-[focus]:bg-splatter-200/10 data-[focus]:text-white text-splatter-100 block w-full text-left px-3 py-2.5 rounded-md font-bold text-sm"
                  }
                  onClick={() => props.onChange(option.value)}
                >
                  {option.label}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </InputWrapper>
  );
}

export default DropdownField;
