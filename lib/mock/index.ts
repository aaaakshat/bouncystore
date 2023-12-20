import { Product } from './types';

const products: Product[] = [
  {
    name: 'Bananas',
    description: 'Yummy yellow fruit',
    id: 'id_banana001',
    price: 400,
    currency: 'USD',
    image: '/images/banana.jpg'
  },
  {
    name: 'Jupiter',
    description: 'Yummy yellow planet',
    id: 'id_jupiter001',
    price: 10000,
    currency: 'USD',
    image: '/images/jupiter.png'
  },
  {
    name: 'Bananas2',
    description: 'Yummy yellow fruit2',
    id: 'id_banana002',
    price: 520,
    currency: 'USD',
    image: '/images/banana.jpg'
  }
];

export async function getProducts({
  cache = 'force-cache',
  headers,
  query
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
}): Promise<{ status: number; body: Product[] } | never> {
  return { status: 200, body: products };
}

export async function getProduct(id: string):
  Promise<{ status: number; body?: Product } | never> {
  return { status: 200, body: products.find((product) => product.id == id) };
}
