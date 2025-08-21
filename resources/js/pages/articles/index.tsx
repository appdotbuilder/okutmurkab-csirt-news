import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Clock, Eye } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string;
  views_count: number;
  category: {
    id: number;
    name: string;
    color: string;
  };
  user: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  articles: {
    data: Article[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
  };
  categories: Category[];
  filters: {
    category?: string;
    search?: string;
  };
  [key: string]: unknown;
}

export default function ArticlesIndex({ articles, categories, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/articles', { 
      search: searchTerm || undefined, 
      category: selectedCategory || undefined 
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    router.get('/articles');
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📰 Artikel</h1>
          <p className="text-gray-600">Jelajahi artikel terbaru tentang keamanan siber dan pemerintahan daerah</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Cari artikel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Cari
                </Button>
                {(searchTerm || selectedCategory) && (
                  <Button type="button" variant="outline" onClick={clearFilters}>
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.category) && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Filter aktif:</span>
            {filters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Pencarian: "{filters.search}"
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Kategori: {categories.find(c => c.slug === filters.category)?.name}
              </Badge>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {articles.data.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.data.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    {article.featured_image ? (
                      <img 
                        src={article.featured_image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">📄</div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        style={{ backgroundColor: article.category.color }}
                        className="text-white text-xs"
                      >
                        {article.category.name}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="h-3 w-3" />
                        {article.views_count}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      <Link 
                        href={`/articles/${article.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt || 'Tidak ada ringkasan tersedia.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-gray-100">
                            {getInitials(article.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{article.user.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatDate(article.published_at)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {articles.last_page > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  {articles.links.map((link, index) => {
                    if (!link.url) {
                      return (
                        <span key={index} className="px-3 py-2 text-gray-400 cursor-not-allowed">
                          {link.label === '&laquo; Previous' ? '← Sebelumnya' : 
                           link.label === 'Next &raquo;' ? 'Selanjutnya →' : link.label}
                        </span>
                      );
                    }
                    
                    return (
                      <Button
                        key={index}
                        variant={link.active ? "default" : "outline"}
                        size="sm"
                        onClick={() => link.url && router.get(link.url)}
                        dangerouslySetInnerHTML={{ 
                          __html: link.label === '&laquo; Previous' ? '← Sebelumnya' : 
                                  link.label === 'Next &raquo;' ? 'Selanjutnya →' : link.label 
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada artikel ditemukan</h3>
            <p className="text-gray-600 mb-4">
              Coba ubah filter pencarian atau kembali ke beranda untuk melihat artikel terbaru.
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => router.get('/')} variant="outline">
                Kembali ke Beranda
              </Button>
              <Button onClick={clearFilters}>
                Reset Filter
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}