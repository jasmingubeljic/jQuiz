import { useState } from "react";

export default function useManageQuiz() {
  const [formValidated, setFormValidated] = useState(false);
  const [form2Validated, setForm2Validated] = useState(false);

  const validate = (event, setValidatedState) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedState(true);
    if (!form.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  const handleFormValidate = (event) => validate(event, setFormValidated);
  const handleForm2Validate = (event) => validate(event, setForm2Validated);

  return {
    handleFormValidate,
    handleForm2Validate,
    formValidated,
    form2Validated,
  };
}
