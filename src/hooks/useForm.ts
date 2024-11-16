import { useState, useEffect } from 'react';
import { Schema, ValidationError } from 'yup';

interface FormSchema {
  [fieldName: string]: {
    type: 'text' | 'number' | 'email' | 'date';
    label: string;
    validate?: (value: any) => string | undefined;
    initialValue?: any;
  };
}

const useForm = (initialSchema: FormSchema): {
  values: { [fieldName: string]: any };
  errors: { [fieldName: string]: string | undefined };
  setValue: (fieldName: string, value: any) => void;
  handleSubmit: (onSubmit: (values: any) => void) => (event: any) => void;
  isValid: boolean;
} => {
  const [values, setValues] = useState<{ [fieldName: string]: any }>({});
  const [errors, setErrors] = useState<{ [fieldName: string]: string | undefined }>({});
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const initialValues: { [fieldName: string]: any } = {};
    for (const fieldName in initialSchema) {
      initialValues[fieldName] = initialSchema[fieldName].initialValue;
    }
    setValues(initialValues);
  }, [initialSchema]);

  const setValue = (fieldName: string, value: any): void => {
    setValues(prevValues => ({ ...prevValues, [fieldName]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: undefined }));
  };

  const handleSubmit = (onSubmit: (values: any) => void) => async (event: any): Promise<void> => {
    event.preventDefault();
    setIsValidating(true);
    setErrors({});

    try {
      const schema: Schema<any> = {};
      for (const fieldName in initialSchema) {
          const field = initialSchema[fieldName];
          let yupSchema = null;

          switch (field.type) {
              case 'text': yupSchema = yup.string().required(`The ${field.label} field is required`); break;
              case 'number': yupSchema = yup.number().required(`The ${field.label} field is required`); break;
              case 'email': yupSchema = yup.string().email(`The ${field.label} must be a valid email`).required(`The ${field.label} field is required`); break;
              case 'date': yupSchema = yup.date().required(`The ${field.label} field is required`); break;
          }
          if (yupSchema && field.validate) {
              yupSchema = yupSchema.test({
                  name: 'customValidation',
                  test: (value) => field.validate(value) === undefined,
                  message: field.validate
              })
          }
          if (yupSchema) schema[fieldName] = yupSchema;
      }
      const validatedValues = await schema.validate(values, {abortEarly: false});
      onSubmit(validatedValues);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        const validationErrors: { [fieldName: string]: string | undefined } = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Form submission error:", error);
        // Handle other errors appropriately
      }
    } finally {
      setIsValidating(false);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return { values, errors, setValue, handleSubmit, isValid };
};

export default useForm;
```