import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import { setSearchQuery } from "@/app/stores/slices/productSlice";
import { useEffect, useMemo, useState } from "react";
import classes from "./FilterInput.module.scss";

const DELAY = 500;
export const FilterInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.products);

  const [localValue, setLocalValue] = useState(searchQuery);

  const debouncedDispatch = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(setSearchQuery(value));
      }, DELAY);
    };
  }, [dispatch]);

  useEffect(() => {
    debouncedDispatch(localValue);
  }, [localValue, debouncedDispatch]);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className={classes.input}
      placeholder="Search..."
    />
  );
};
