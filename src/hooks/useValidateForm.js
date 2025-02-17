import { useState } from "react";

export default function useQuiz() {
  const [formValidated, setFormValidated] = useState(false);

  const handleFormValidate = (event) => {
    const form = event.currentTarget;
    console.log("form.checkValidity(): ", form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setFormValidated(true);
    if (!form.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleFormValidate,
    formValidated,
  };
}
