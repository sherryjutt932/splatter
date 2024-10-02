"use client";

import { useState, useEffect } from "react";
import { type FormFieldProps, useFormFieldProps } from "./Form";
import InputField from "./InputField";
import classes from "./cssUtility";

interface Props extends FormFieldProps<HTMLInputElement, number | null> {
  prefix?: string;
  decimalsLimit?: number;
  max?: number; // Add max prop to handle the maximum value
}

export default function CurrencyField(rawProps: Props) {
  const props = useFormFieldProps(rawProps);
  const [inputValue, setInputValue] = useState(props.value?.toString() || "");

  useEffect(() => {
    setInputValue(props.value?.toString() || "");
  }, [props.value]);

  const handleChange = (value: string) => {
    // Remove non-numeric characters except for the decimal point
    let sanitizedValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const decimalCount = (sanitizedValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      sanitizedValue = sanitizedValue.replace(/\./g, (match, index) =>
        index === sanitizedValue.indexOf(".") ? match : ""
      );
    }

    // Limit to two decimal places
    const parts = sanitizedValue.split(".");
    if (parts[1] && parts[1].length > (props.decimalsLimit || 0)) {
      parts[1] = parts[1].slice(0, props.decimalsLimit || 0);
      sanitizedValue = parts.join(".");
    }

    // Convert to numeric value
    const numericValue = sanitizedValue === "" ? null : parseFloat(sanitizedValue);

    // Check against max value and set to max if exceeded
    if (props.max !== undefined && numericValue !== null) {
      if (numericValue > props.max) {
        sanitizedValue = props.max.toString(); // Set the input value to the max
    }
    }

    setInputValue(sanitizedValue);

    if (props.onChange) {
      const finalValue = sanitizedValue === "" ? null : parseFloat(sanitizedValue);
      props.onChange(finalValue);
    }
  };

  const handleBlur = () => {
    let formattedValue = inputValue;

    // Remove trailing decimal point
    if (formattedValue.endsWith(".")) {
      formattedValue = formattedValue.slice(0, -1);
    }

    // Remove trailing zeros after decimal point
    if (formattedValue.includes(".")) {
      formattedValue = formattedValue.replace(/\.?0+$/, "");
    }

    setInputValue(formattedValue);

    if (props.onChange) {
      const numericValue = formattedValue === "" ? null : parseFloat(formattedValue);
      props.onChange(numericValue);
    }
  };

  return (
    <div className="relative">
      {props.prefix && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold pt-0.5">
          {props.prefix}
        </span>
      )}
      <InputField
        label={props.label}
        type="text"
        disabled={props.disabled}
        required={props.required}
        placeholder={props.placeholder}
        inputClassName={classes(
          props.inputClassName,
          props.prefix ? "pl-6" : ""
        )}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
