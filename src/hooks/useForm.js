import { useState } from "react";

export default function useForm(
  initialValue,
  validationRules,
  afterSubmitHandler
) {
  const [values, setValues] = useState(initialValue);

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
              if (!requiredValidationRule(values[key])) console.log("siam");

              break;

            default:
              break;
          }
        });
      }
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) afterSubmitHandler(values);
  };

  return { values, setFieldValue, resetFieldValues, handleSubmit };
}
