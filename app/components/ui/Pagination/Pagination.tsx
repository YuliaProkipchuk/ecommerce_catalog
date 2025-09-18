import cs from './Pagination.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/stores";
import {useEffect} from "react";
import {getPagProducts} from "@/app/stores/slices/productSlice";
import {useTranslations} from "next-intl";
export const Pagination = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {products} = useSelector((state:RootState) => state.products)
    const t = useTranslations()
    useEffect(() => {
        console.log(products)
    }, [products]);
    const handlerLoadMore = () => {
        dispatch(getPagProducts())
    }
    return (
        <>
            <button className={cs.pagination_button} onClick={handlerLoadMore}><span>{t('load-more')}</span></button>
        </>
    )
}