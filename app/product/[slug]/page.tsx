import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductPageClient } from './ProductPageClient';
import api from '@/lib/axios';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const { data } = await api.get(`/products/slug/${slug}`);
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | ChronoTrust',
      description: 'The requested product could not be found.',
    };
  }

  const title = product.metaTitle || `${product.title} | ChronoTrust`;
  const description = product.metaDescription || product.description?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Luxury timepieces at ChronoTrust';
  const canonical = product.canonicalUrl || `https://chronotrust.io/product/${slug}`;

  return {
    title,
    description,
    keywords: product.metaKeywords || 'luxury watches, timepieces, buy watches',
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      images: product.images?.[0] ? [product.images[0]] : [],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
