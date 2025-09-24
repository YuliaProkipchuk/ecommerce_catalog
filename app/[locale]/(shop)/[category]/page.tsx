import { CatalogPage } from '@/app/components/layout/CatalogPage/CatalogPage';
import { notFound } from 'next/navigation';

const categories = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};
type CategoryKey = keyof typeof categories;
const Page = () => {
  const { category } = useParams();
  const id = category as CategoryKey;
  const { products, countItemsPage, sortBy, searchQuery, loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTotalByCategory(id));

  useEffect(() => {
  if (products.length === 0 && !loading) {
      dispatch(getProductsStore()).then(() => {
        dispatch(getCategoryProducts(id));
      });
    } else {
      dispatch(getCategoryProducts(id));
    }
  }, [id, countItemsPage, sortBy, searchQuery, dispatch]); 

  
  if (loading) {
    return <Loader />;
type Categories = 'phones' | 'tablets' | 'accessories';
const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  function isValidCategoryKey(key: string): key is Categories {
    return ['phones', 'tablets', 'accessories'].includes(key as Categories);
  }

  if (!isValidCategoryKey(category)) {
    notFound();
  }

  return <CatalogPage category={category}/>;
};

export default Page;
