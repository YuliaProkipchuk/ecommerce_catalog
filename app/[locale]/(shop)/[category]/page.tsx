import { CatalogPage } from '@/app/components/layout/CatalogPage/CatalogPage';
import { notFound } from 'next/navigation';

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
