import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Shield, AlertTriangle, Clock, Eye, ChevronRight } from 'lucide-react';

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

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  user: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  color: string;
  articles_count: number;
}

interface Props {
  featuredArticles: Article[];
  latestArticles: Article[];
  urgentAnnouncements: Announcement[];
  categories: Category[];
  [key: string]: unknown;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-500'
};

const priorityIcons = {
  low: Shield,
  medium: Shield,
  high: AlertTriangle,
  urgent: AlertTriangle
};

export default function Welcome({ featuredArticles, latestArticles, urgentAnnouncements, categories }: Props) {
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

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            🛡️ OKUTIMURKAB-CSIRT
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Portal Berita Keamanan Siber & Pemerintahan Daerah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => router.get('/articles')}
            >
              📰 Baca Artikel Terbaru
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={() => router.get('/announcements')}
            >
              📢 Lihat Pengumuman
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Urgent Announcements */}
        {urgentAnnouncements.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">🚨 Pengumuman Penting</h2>
            </div>
            <div className="space-y-4">
              {urgentAnnouncements.map((announcement) => {
                const IconComponent = priorityIcons[announcement.priority];
                return (
                  <Card key={announcement.id} className="border-l-4 border-l-red-500 bg-red-50">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-red-500" />
                          <Badge className={`${priorityColors[announcement.priority]} text-white`}>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {formatDate(announcement.created_at)}
                        </div>
                      </div>
                      <CardTitle className="text-lg">
                        <Link 
                          href={`/announcements/${announcement.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {announcement.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 line-clamp-2">{announcement.content}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-blue-100">
                              {getInitials(announcement.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{announcement.user.name}</span>
                        </div>
                        <Link 
                          href={`/announcements/${announcement.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                          Selengkapnya <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Artikel Unggulan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    {article.featured_image ? (
                      <img 
                        src={article.featured_image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Shield className="h-16 w-16 text-blue-400" />
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
                    <CardDescription className="line-clamp-2">
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
          </section>
        )}

        {/* Latest Articles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📰 Artikel Terbaru</h2>
            <Button 
              variant="outline" 
              onClick={() => router.get('/articles')}
              className="flex items-center gap-2"
            >
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
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
                  <CardDescription className="line-clamp-2">
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
        </section>

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📂 Kategori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.get(`/articles?category=${category.name.toLowerCase()}`)}
                >
                  <CardContent className="p-4 text-center">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.articles_count} artikel</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Quick Links */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔗 Menu Utama</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.get('/about')}>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">ℹ️</div>
                <h3 className="font-semibold text-lg mb-2">Tentang Kami</h3>
                <p className="text-gray-600 text-sm">Pelajari lebih lanjut tentang OKUTIMURKAB-CSIRT</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.get('/contact')}>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-semibold text-lg mb-2">Kontak</h3>
                <p className="text-gray-600 text-sm">Hubungi kami untuk informasi lebih lanjut</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.get('/login')}>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="font-semibold text-lg mb-2">Login</h3>
                <p className="text-gray-600 text-sm">Masuk untuk bergabung dalam diskusi</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}