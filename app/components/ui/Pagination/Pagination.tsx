import cs from './Pagination.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/stores";
import {useEffect} from "react";
import {getPagProducts} from "@/app/stores/slices/productSlice";
import {useTranslations} from "next-intl";
type Props = {
    category:string;
}
export const Pagination = ({category}:Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations()

    const handlerLoadMore = () => {
        dispatch(getPagProducts(category))
    }
    return (
        <div className={cs.pagination_layout}>
            <button className={cs.pagination_button} onClick={handlerLoadMore}><span>{t('load-more')}</span></button>
        </div>
    )
}