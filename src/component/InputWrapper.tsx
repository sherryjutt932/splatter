import classes from "./cssUtility";

interface InputWrapperProps {
  label: string;
  hideLabel?: boolean;
  hideOptional?: boolean;
  description?: string | React.ReactNode;
  error?: string;
  required: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export default function InputWrapper({
  label,
  hideLabel,
  hideOptional,
  description,
  required,
  error,
  disabled,
  readonly,
  className = "",
  children,
}: InputWrapperProps) {
  return (
    <label
      className={classes(
        `flex flex-col gap-1 w-full py-2 transition text-splatter-150/65
        focus-within:text-splatter-150/80 duration-100 placeholder-splatter-100/65 has-[:user-invalid:not(:focus)]:text-rose-300/90`,
        !readonly ? "hover:text-splatter-150/80" : "",
        disabled && !readonly && "pointer-events-none select-none opacity-50",
        className
      )}
    >
      {description ? (
        <>
          <p className="font-bold text-splatter-100/80">
            {!hideLabel && !hideOptional && <span>{label}</span>}
            {!required && (
              <span className="text-pink-200 ml-2">(optional)</span>
            )}
          </p>
          <p className="font-semibold text-splatter-150/65 mb-2 -mt-1">
            {description}
          </p>
        </>
      ) : (
        !hideLabel && (
          <span className="font-bold text-sm mb-1 -mt-1">
            {label}
            {!required && !hideOptional && (
              <span className="text-pink-200 ml-2">(optional)</span>
            )}
          </span>
        )
      )}

      <div className="contents text-splatter-100">{children}</div>
      {error && (
        <span className="-mb-3 font-bold text-xs pt-0.5 pl-px opacity-70 text-rose-200">
          {error}
        </span>
      )}
    </label>
  );
}
