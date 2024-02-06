import { useEffect, useMemo, useState } from "react";

export default function useForm(
  initialValue,
  validationRules,
  afterSubmitHandler
) {
  const [values, setValues] = useState(initialValue);
  const { isError, errors, validateFields } = useFromValidation(
    values,
    validationRules,
    initialValue
  );

  const setFieldValue = (fieldName, fieldValue) => {
    setValues((values) => {
      const oldValues = { ...values };
      oldValues[fieldName] = fieldValue;
      return oldValues;
    });
  };

  const resetFieldValues = (fieldName, fieldValue) => {
    setValues(initialValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) afterSubmitHandler(values);
  };

  return {
    values,
    isError,
    errors,
    setFieldValue,
    resetFieldValues,
    handleSubmit,
  };
}

const useFromValidation = (values, validationRules, initialValue) => {
  const initialErrorFormatField = useMemo(() => {
    const obj = {};
    for (const key in initialValue) {
      obj[key] = [];
    }
    return obj;
  }, []);
  const [errors, setErrors] = useState(initialErrorFormatField);

  const isError = useMemo(() => {
    for (const key in errors) {
      return Boolean(errors[key].length);
    }
  }, [errors]);

  const setError = (fieldName, msg, type) => {
    if (!errors[fieldName].find((err) => err.type === type))
      setErrors((errors) => {
        return {
          ...errors,
          [fieldName]: [...errors[fieldName], { type: "required", msg }],
        };
      });
  };
  const removeError = (fieldName, type) => {
    if (errors[fieldName].find((err) => err.type === type))
      setErrors((errors) => {
        return {
          ...errors,
          [fieldName]: errors[fieldName].filter((err) => err.type !== type),
        };
      });
  };

  const requiredValidationRule = (value) => {
    return value ? true : false;
  };

  const validateFields = () => {
    // const validateVar = validate();
    for (const key in validationRules) {
      if (Object.hasOwnProperty.call(validationRules, key)) {
        const elementValidationRules = validationRules[key];

        elementValidationRules.forEach((validationRule) => {
          // validateVar["required"];
          switch (validationRule) {
            case "required":
              if (!requiredValidationRule(values[key])) {
                setError(
                  key,
                  key.charAt(0).toUpperCase() + key.slice(1) + " is required",
                  "required"
                );
              } else {
                removeError(key, "required");
              }

              break;

            default:
              break;
          }
        });
      }
    }
    return false;
  };

  return { isError, errors, validateFields };
};
