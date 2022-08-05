import React, { useEffect, useState } from "react";

const useDebounce = (initialValue, delay) => {
  const [debounce, setDebounce] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(initialValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);
  return debounce;
};

export default useDebounce;
