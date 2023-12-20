import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import Prose from 'components/prose';
import { getProduct } from 'lib/mock';
import Link from 'next/link';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds


export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product.body) return notFound();

  // const productJsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Product',
  //   name: product.title,
  //   description: product.description,
  //   image: product.featuredImage.url,
  //   offers: {
  //     '@type': 'AggregateOffer',
  //     availability: product.availableForSale
  //       ? 'https://schema.org/InStock'
  //       : 'https://schema.org/OutOfStock',
  //     priceCurrency: product.priceRange.minVariantPrice.currencyCode,
  //     highPrice: product.priceRange.maxVariantPrice.amount,
  //     lowPrice: product.priceRange.minVariantPrice.amount
  //   }
  // };

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      /> */}
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={[{
                src: product.body.image || '',
                altText: product.body.description || ''
              }]}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            {/* <ProductDescription product={product} /> */}
          </div>
        </div>
        <Suspense>
          {/* <RelatedProducts id={product.id} /> */}
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}



export async function Page({ params }: { params: { page: string } }) {
  const product = await getProduct(params.page);

  if (!product.body) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{product.body.name}</h1>
      <Prose className="mb-8" html={product.body.description as string} />
    </>
  );
}
