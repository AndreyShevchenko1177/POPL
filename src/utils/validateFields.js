/* eslint-disable max-len */
import React from "react";

function validation(keys, params, value) {
  const errors = {};
  keys.map((key) => {
    if (params[key].minLength > (value[key] && value[key].value.length)) {
      errors[key] = params[key].errors.minLength;
    }
    if (params[key].maxLength < (value[key] && value[key].value.length)) {
      errors[key] = params[key].errors.minLength;
    }
    if (params[key].required && (!value[key] || !value[key].value)) {
      errors[key] = params[key].errors.required;
    }
    if (
      params[key].confirmPassword &&
      value[key] &&
      value[key].value !== value.password.value
    ) {
      errors[key] = params[key].errors.confirmPassword;
    }
    if (
      params[key].regexp &&
      value[key] &&
      !params[key].regexp.test(value[key].value)
    ) {
      errors[key] = params[key].errors.regexp;
    }
  });
  return errors;
}

export default function getFields(params, options = {}) {
  const paramsKeys = Object.keys(params);

  const getElements = ({
    key,
    errors,
    index,
    value,
    onChangeHandler,
    label,
    error,
    handleClickShowPassword,
    showPassword,
    apiError,
  }) => {
    if (!options.customFields) {
      return (
        <input
          style={
            typeof options.styles?.field === "string"
              ? {}
              : !errors[key]
              ? options.styles?.field
              : options.styles?.fieldError
          }
          className={
            typeof options.styles?.field === "string"
              ? !errors[key]
                ? options.styles?.field
                : options.styles?.fieldError
              : ""
          }
          key={index}
          placeholder={key}
          name={key}
          value={!value[key] ? "" : value[key].value}
          onChange={onChangeHandler}
        />
      );
    }
    if (typeof options.customFields === "function") {
      return (
        <options.customFields
          placeholder={key}
          name={key}
          value={!value[key] ? "" : value[key].value}
          onChange={onChangeHandler}
        />
      );
    }
    if (typeof options.customFields === "object" && options.customFields[key]) {
      const CustomComponent = options.customFields[key];
      return (
        <CustomComponent
          name={key}
          value={!value[key] ? "" : value[key].value}
          onChange={onChangeHandler}
          handleClickShowPassword={handleClickShowPassword}
          label={label}
          fullwidth={"true"}
          error={apiError || !!error}
          errorText={apiError ? "Some field is incorrect" : error}
          showPassword={showPassword}
        />
      );
    }

    return (
      <input
        style={
          typeof options.styles?.field === "string"
            ? {}
            : !errors[key]
            ? options.styles?.field
            : options.styles?.fieldError
        }
        className={
          typeof options.styles?.field === "string"
            ? !errors[key]
              ? options.styles?.field
              : options.styles?.fieldError
            : ""
        }
        key={index}
        placeholder={key}
        name={key}
        value={!value[key] ? "" : value[key].value}
        onChange={onChangeHandler}
      />
    );
  };

  const components = paramsKeys.map(
    (key, index) => ({
      value,
      setValue,
      errors,
      handleClickShowPassword,
      showPassword,
      apiError,
    }) => {
      const onChangeHandler = (event) => {
        setValue({
          ...value,
          [event.target.name]: {
            ...value[event.target.name],
            value: event.target.value,
          },
        });
      };
      return (
        <React.Fragment key={index}>
          {
            <div
              style={
                typeof options.styles?.container === "string"
                  ? {}
                  : options.styles?.container
              }
              className={
                typeof options.styles?.container === "string"
                  ? options.styles?.container
                  : ""
              }
            >
              {options.showLabel && errors[key] && (
                <label
                  style={
                    typeof options.styles?.label === "string"
                      ? {}
                      : options.styles?.label
                  }
                  className={
                    typeof options.styles?.label === "string"
                      ? options.styles?.label
                      : ""
                  }
                >
                  {errors[key]}
                </label>
              )}
              {getElements({
                key,
                errors,
                index,
                value,
                onChangeHandler,
                label: params[key].label,
                error: errors[key],
                handleClickShowPassword,
                showPassword,
                apiError,
              })}
            </div>
          }
        </React.Fragment>
      );
    }
  );
  if (options.separate) {
    return [...components, (value) => validation(paramsKeys, params, value)];
  }
  return [components, (value) => validation(paramsKeys, params, value)];
}
