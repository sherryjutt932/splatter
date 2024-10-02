import React, { createContext, useContext } from "react";

export interface FormFieldProps<E extends HTMLElement = HTMLInputElement, V = string> {
	label: string;
	hideLabel?: boolean;
	hideOptional?: boolean;
  description?: string;
	placeholder?: string;
	autofill?: AutoFillField | 'sex'; // apparently 'sex' is recognized, but not in the typedef.
  error?: string;

	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;

	value: V | null;
  onChange?: (value: V) => void;
	onKeyDown?: (e: React.KeyboardEvent<E>) => void;
  onFocus?: (e: React.FocusEvent<E>) => void;
  onBlur?: (e: React.FocusEvent<E>) => void;

  className?: string;
  inputClassName?: string;
}

export interface FormContext {
	disabled: boolean;
	isInForm: boolean;
}

const FormContext = createContext<FormContext>({
	disabled: false,
	isInForm: false
});

export function useForm() {
	return useContext(FormContext);
}

interface Props {
	disabled?: boolean;
	onSubmit?: (e: React.FormEvent) => void;
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
}

export default function Form(props: Props) {
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		props.onSubmit?.(e);
	}

	return (
		<FormContext.Provider value={{ disabled: props.disabled ?? false, isInForm: true }}>
			<form className={props.className} onSubmit={handleSubmit}>
				{props.children}
			</form>
		</FormContext.Provider>
	);
}

// Any is appropriate here, as we don't want to assert the type of the form value.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormFieldProps<T extends FormFieldProps<never, any>>(props: T):
	T & { required: boolean, disabled: boolean, readonly: boolean } {

	const { disabled, isInForm } = useForm();

	return {
		...props,
		disabled: props.disabled || disabled || (props.readonly ?? false),
		required: (props.required ?? !isInForm) || (props.readonly ?? false),
		readonly: props.readonly ?? false
	}
}
