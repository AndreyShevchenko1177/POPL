/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";

function validation(keys, params, value) {
  const errors = {};
  keys.map((key) => {
    const notRequiredFields = params[key].required || value[key];
    if (notRequiredFields && params[key].minLength > value[key].length) {
      errors[key] = params[key].errors.minLength;
    }
    if (notRequiredFields && params[key].maxLength < value[key].length) {
      errors[key] = params[key].errors.maxLength;
    }
    if (
      notRequiredFields
      && params[key].regexp
      && !params[key].regexp.test(value[key])
    ) {
      errors[key] = params[key].errors.regexp;
    }
    if (params[key].equal && value[key] !== value.password) {
      errors[key] = params[key].errors.equal;
    }
    if (params[key].required && !value[key]) {
      errors[key] = params[key].errors.required;
    }
    if (
      params[key].type
      && params[key].type === "number"
      && value[key]
      && !Number(value[key])
    ) {
      errors[key] = params[key].errors.typeError;
    }
    if (params[key].dependencies) {
      params[key].dependencies.forEach((dep) => {
        if (params[key].reverseAction) {
          if (value[dep] && !value[key]) {
            errors[key] = params[key].errors[dep];
          }
        } else if (!value[dep] && !value[key]) {
          errors[key] = params[key].errors[dep];
        }
      });
    }
  });
  return errors;
}

export function ValidationProvider({ children, config, callCbAlways }) {
  const configKeys = Object.keys(config);
  const defaultValues = {};
  configKeys.forEach((key) => (defaultValues[key] = config[key].value));
  const [value, setValue] = useState(defaultValues);
  const [errors, setError] = useState({});

  const onChangeHandler = (event) => {
    if (config[event.target.name].elementType === "checkbox") {
      return setValue({ ...value, [event.target.name]: event.target.checked });
    }
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const onKeyDown = (event, cb, eventKey) => {
    if (event.key === eventKey) {
      submit(cb);
    }
  };

  const submit = (cb) => {
    const error = validation(configKeys, config, value);
    setError(error);
    if (Object.keys(error).length) {
      if (!callCbAlways) return;
    }
    return cb(value, error);
  };

  useEffect(() => {
    const configKeys = Object.keys(config);
    const defaultValues = {};
    configKeys.forEach((key) => (defaultValues[key] = config[key].value));
    setValue(defaultValues);
  }, [config]);

  return (
    <React.Fragment>
      {children(
        { submit, onChange: onChangeHandler, onKeyDown },
        value,
        errors,
      )}
    </React.Fragment>
  );
}
