import classes from "./cssUtility";
import { type FormFieldProps, useFormFieldProps } from "./Form";

interface Props extends FormFieldProps {
  type?: string;
  autofocus?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternError?: string;
}

export function InputField(rawProps: Props) {
  const props = useFormFieldProps(rawProps);

  return (
    <input
      className={classes(
        `p-2.5 h-12 font-bold rounded-md transition outline-none focus:ring-2 placeholder-splatter-100/60 bg-transparent ring-splatter-300/50 invalid:bg-rose-200/[8%] invalid:ring-rose-400/40 invalid:[background-image:radial-gradient(circle_at_6%_-20%,rgb(var(--color-rose-450)/6%)_0%,transparent_55%)] invalid:ring-2`,
        props.readonly
          ? "text-splatter-150/75"
          : "hocus:bg-splatter-200/15 hocus:shadow-md",
        props.inputClassName
      )}
      disabled={props.disabled}
      required={props.required}
      readOnly={props.readonly}
      autoComplete={props.autofill}
      autoFocus={rawProps.autofocus}
      minLength={rawProps.minLength}
      maxLength={rawProps.maxLength}
      placeholder={props.placeholder}
      pattern={props.pattern}
      title={props.patternError}
      type={props.type}
      value={props.value ?? ""}
      onChange={(e) => props.onChange?.(e.target.value)}
      onKeyDown={props.onKeyDown}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
}

export default InputField;
