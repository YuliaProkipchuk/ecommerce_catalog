import React from 'react';
import { CreateProduct } from '@/app/components/(pages)/ProductDetails/ProductDetails';

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <CreateProduct slug={slug} />
    </>
  );
}

export default Page;
