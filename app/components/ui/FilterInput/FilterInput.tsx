import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import { setSearchQuery } from "@/app/stores/slices/productSlice";
import classes from './FilterInput.module.scss';

export const FilterInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.products);

    return (
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className={classes.input}
            placeholder="Search..."
        />
    );
}