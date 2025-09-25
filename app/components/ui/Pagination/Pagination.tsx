import cs from './Pagination.module.scss'
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/stores";
import {getPagProducts} from "@/app/stores/slices/productSlice";
type Props = {
    category:string;
}
export const Pagination = ({category}:Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const handlerLoadMore = () => {
        dispatch(getPagProducts(category))
    }
    return (
        <div className={cs.pagination_layout}>
            <button className={cs.pagination_button} onClick={handlerLoadMore}><span>Load more</span></button>
        </div>
    )
}