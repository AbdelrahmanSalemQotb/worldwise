import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [data, setData] = useState(function () {
    const data = JSON.parse(localStorage.getItem(key)) || initialState || [];
    return data;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(data));
    },
    [data, key]
  );

  return [data, setData];
}
