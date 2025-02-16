import { useState } from "react";

export default function useControlUI() {
  const [isElementActive, setIsElementActive] = useState(false);

  return {
    isElementActive,
    setIsElementActive,
  };
}
