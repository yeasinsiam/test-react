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
    if (!fieldValue) validateFields();
  };

  const resetFieldValues = (fieldName, fieldValue) => {
    setValues(initialValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(validateFields());
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
  const [isError, setIsError] = useState(false);

  // const isError = useMemo(() => {
  //   for (const key in errors) {
  //     return Boolean(errors[key].length);
  //   }
  // }, [errors]);

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
    let isValidFormFields = true;

    // const validateVar = validate();
    for (const key in validationRules) {
      if (Object.hasOwnProperty.call(validationRules, key)) {
        const elementValidationRules = validationRules[key];

        // eslint-disable-next-line no-loop-func
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
                isValidFormFields = false;
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
    setIsError(!isValidFormFields);
    return isValidFormFields;
  };

  return { isError, errors, validateFields };
};
