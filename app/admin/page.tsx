'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RichTextEditor } from '@/components/RichTextEditor';
import api from '@/lib/axios';
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  type Product,
} from '@/hooks/useProducts';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  type Category,
} from '@/hooks/useCategories';
import { useAllOrders, useUpdateOrderStatus, type Order } from '@/hooks/useOrders';
import {
  useAllInquiries,
  useUpdateInquiryStatus,
  type Inquiry,
} from '@/hooks/useInquiries';
import {
  Package,
  Grid,
  ShoppingCart,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  CheckCircle,
  ChevronDown,
  LogOut,
  ArrowLeft,
  AlertCircle,
  ImageIcon,
} from 'lucide-react';
import { Lightbox } from '@/components/ui/Lightbox';

type Tab = 'products' | 'categories' | 'orders' | 'inquiries';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoggedIn, isAdmin, logout, login, loginLoading, loginError } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-primary mb-2">Admin Login</h1>
            <p className="text-slate-500 text-sm">Secure access to ChronoTrust dashboard</p>
          </div>
          
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              await login({ email, password });
            } catch (err) {
              // handled by useAuth hook
            }
          }} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Invalid admin credentials
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                placeholder="admin@chronotrust.io"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-70 flex justify-center items-center mt-2"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-primary transition-colors">
              &larr; Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-primary mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-6">You must be an administrator to view this dashboard.</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={logout}
              className="px-6 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Admin Header */}
      <header className="bg-primary text-white pt-38">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-serif text-xl">
                ChronoTrust Admin
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { id: 'products', label: 'Products', icon: Package },
                  { id: 'categories', label: 'Categories', icon: Grid },
                  { id: 'orders', label: 'Orders', icon: ShoppingCart },
                  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as Tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">{user?.email}</span>
              <Link
                href="/"
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <button
                onClick={logout}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'inquiries' && <InquiriesTab />}
      </main>
    </div>
  );
}

// Products Tab
function ProductsTab() {
  const { data: products, isLoading } = useProducts({ limit: 100 });
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    brand: '',
    model: '',
    description: '',
    price: '',
    images: [] as string[],
    categoryId: '',
    inStock: true,
    featured: false,
    sku: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeSection, setActiveSection] = useState<'basic' | 'seo'>('basic');

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      brand: '',
      model: '',
      description: '',
      price: '',
      images: [],
      categoryId: '',
      inStock: true,
      featured: false,
      sku: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: '',
    });
    setEditingProduct(null);
    setActiveSection('basic');
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      brand: product.brand || '',
      model: product.model || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      images: product.images || [],
      categoryId: product.categoryId || '',
      inStock: product.inStock,
      featured: product.featured,
      sku: product.sku || '',
      metaTitle: product.metaTitle || '',
      metaDescription: product.metaDescription || '',
      metaKeywords: product.metaKeywords || '',
      canonicalUrl: product.canonicalUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.url) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const setFeaturedImage = (indexToFeature: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      const [featured] = newImages.splice(indexToFeature, 1);
      newImages.unshift(featured);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price) || undefined,
      images: formData.images,
    };

    if (editingProduct) {
      await updateProduct.mutateAsync({ id: editingProduct.id, dto: data });
    } else {
      await createProduct.mutateAsync(data);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-primary">Products</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((product: Product) => (
                <tr key={product.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{product.title}</p>
                        <p className="text-xs text-slate-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{product.category?.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {product.price ? `$${product.price.toLocaleString()}` : 'Inquire'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Sold'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-serif text-xl text-primary">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveSection('basic')}
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeSection === 'basic'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('seo')}
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeSection === 'seo'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  SEO Settings
                </button>
              </div>

              {activeSection === 'basic' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          setFormData(prev => ({
                            ...prev,
                            title,
                            ...(!editingProduct && { slug, canonicalUrl: `https://chronotrust.io/product/${slug}` })
                          }));
                        }}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Slug (auto-generated if empty)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                        placeholder="Auto-generated from title"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Model
                      </label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                      Description
                    </label>
                    <RichTextEditor
                      content={formData.description}
                      onChange={(html) => setFormData({ ...formData, description: html })}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      >
                        <option value="">Select Category</option>
                        {categories?.map((cat: Category) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Images Upload */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                      Images
                    </label>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 group">
                          <Image
                            src={img}
                            alt="Product"
                            fill
                            className={`object-cover rounded-lg ${idx === 0 ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                          />
                          {idx === 0 && (
                            <div className="absolute top-1 left-1 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                              Main
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => setFeaturedImage(idx)}
                              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-white rounded-full text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Set Featured
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <span className="text-sm text-slate-600">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <span className="text-sm text-slate-600">Featured</span>
                    </label>
                  </div>
                </div>
              )}

              {activeSection === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      placeholder="SEO Title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 resize-none"
                      placeholder="SEO Description"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.metaKeywords}
                      onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      value={formData.canonicalUrl}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                      placeholder="https://example.com/product"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Categories Tab
function CategoriesTab() {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '' });

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '', metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '' });
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      metaTitle: category.metaTitle || '',
      metaDescription: category.metaDescription || '',
      metaKeywords: category.metaKeywords || '',
      canonicalUrl: category.canonicalUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      await updateCategory.mutateAsync({ id: editingCategory.id, dto: formData });
    } else {
      await createCategory.mutateAsync(formData);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure? This will affect products in this category.')) {
      await deleteCategory.mutateAsync(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-primary">Categories</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Slug</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Products</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category: Category) => (
                <tr key={category.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-primary">{category.name}</td>
                  <td className="px-4 py-3 text-slate-600">{category.slug}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {category._count?.products || 0} products
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-serif text-xl text-primary">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setFormData(prev => ({
                      ...prev,
                      name,
                      ...(!editingCategory && { slug, canonicalUrl: `https://chronotrust.io/category/${slug}` })
                    }));
                  }}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                  placeholder="SEO Title"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 resize-none"
                  placeholder="SEO Description"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                  placeholder="keyword1, keyword2"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40"
                  placeholder="https://example.com/category"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Orders Tab
function OrdersTab() {
  const { data: orders, isLoading } = useAllOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-600',
    PROCESSING: 'bg-blue-100 text-blue-600',
    SHIPPED: 'bg-purple-100 text-purple-600',
    DELIVERED: 'bg-green-100 text-green-600',
    CANCELLED: 'bg-red-100 text-red-600',
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-6">Orders</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {orders?.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-primary">{order.orderNumber}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-primary">
                    ${order.total.toLocaleString()}
                  </p>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedOrder === order.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-slate-100 p-4 bg-slate-50">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                        Customer
                      </p>
                      <p className="text-sm text-primary">{order.customerName}</p>
                      <p className="text-sm text-slate-600">{order.customerEmail}</p>
                      <p className="text-sm text-slate-600">{order.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                        Shipping Address
                      </p>
                      <p className="text-sm text-slate-600">{order.address}</p>
                      <p className="text-sm text-slate-600">
                        {order.city}, {order.state} {order.postalCode}
                      </p>
                      <p className="text-sm text-slate-600">{order.country}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden">
                              {item.product.images?.[0] ? (
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.title}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-primary">
                                {item.product.title}
                              </p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus.mutate({
                          id: order.id,
                          status: e.target.value as Order['status'],
                        })
                      }
                      className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/40"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>

                    {order.note && (
                      <p className="text-sm text-slate-600">Note: {order.note}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Inquiries Tab
function InquiriesTab() {
  const { data: inquiries, isLoading } = useAllInquiries();
  const updateInquiryStatus = useUpdateInquiryStatus();
  const [expandedInquiry, setExpandedInquiry] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const extractImageUrls = (message: string): string[] => {
    const urlRegex = /https?:\/\/[^\s,]+\.(jpg|jpeg|png|webp|gif)/gi;
    const matches = message.match(urlRegex);
    return matches || [];
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const statusColors: Record<string, string> = {
    OPEN: 'bg-yellow-100 text-yellow-600',
    IN_PROGRESS: 'bg-blue-100 text-blue-600',
    CLOSED: 'bg-green-100 text-green-600',
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-6">Inquiries</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries?.map((inquiry: Inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() =>
                  setExpandedInquiry(expandedInquiry === inquiry.id ? null : inquiry.id)
                }
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-primary">{inquiry.name}</p>
                    <p className="text-xs text-slate-500">{inquiry.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[inquiry.status]
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-slate-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedInquiry === inquiry.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedInquiry === inquiry.id && (
                <div className="border-t border-slate-100 p-4 bg-slate-50">
                  {inquiry.product && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                        {inquiry.product.images?.[0] ? (
                          <Image
                            src={inquiry.product.images[0]}
                            alt={inquiry.product.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">
                          About: {inquiry.product.title}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Message</p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                  </div>

                  {(() => {
                    const imageUrls = extractImageUrls(inquiry.message);
                    if (imageUrls.length > 0) {
                      return (
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase text-slate-500 mb-2 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Attached Images ({imageUrls.length})
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {imageUrls.map((url, idx) => (
                              <button
                                key={idx}
                                onClick={() => openLightbox(imageUrls, idx)}
                                className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200 hover:border-primary transition-all group cursor-pointer"
                              >
                                <Image
                                  src={url}
                                  alt={`Inquiry image ${idx + 1}`}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {inquiry.phone && (
                    <p className="text-sm text-slate-600 mb-4">
                      Phone: {inquiry.phone}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <select
                      value={inquiry.status}
                      onChange={(e) =>
                        updateInquiryStatus.mutate({
                          id: inquiry.id,
                          status: e.target.value as Inquiry['status'],
                        })
                      }
                      className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/40"
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
