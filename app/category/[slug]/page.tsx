import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPageClient } from './CategoryPageClient';
import api from '@/lib/axios';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string) {
  try {
    const { data } = await api.get(`/categories/slug/${slug}`);
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found | ChronoTrust',
      description: 'The requested category could not be found.',
    };
  }

  const title = category.metaTitle || `${category.name} | ChronoTrust`;
  const description = category.metaDescription || category.description?.slice(0, 160) || `Browse ${category.name} luxury timepieces at ChronoTrust`;
  const canonical = category.canonicalUrl || `https://chronotrust.io/category/${slug}`;

  return {
    title,
    description,
    keywords: category.metaKeywords || 'luxury watches, timepieces, buy watches',
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      images: category.image ? [category.image] : [],
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryPageClient slug={slug} />;
}
