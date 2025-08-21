import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Clock, Eye, MessageCircle, ArrowLeft, Share2 } from 'lucide-react';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
  };
  author_name?: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
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
  approved_comments: Comment[];
}

interface RelatedArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string;
  category: {
    name: string;
    color: string;
  };
  user: {
    name: string;
  };
}

interface Props {
  article: Article;
  relatedArticles: RelatedArticle[];
  [key: string]: unknown;
}

interface CommentFormData {
  content: string;
  author_name: string;
  author_email: string;
  [key: string]: string;
}

export default function ArticleShow({ article, relatedArticles }: Props) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm<CommentFormData>({
    content: '',
    author_name: '',
    author_email: '',
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/articles/${article.slug}/comments`, {
      onSuccess: () => {
        reset();
        setShowCommentForm(false);
      }
    });
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel telah disalin ke clipboard!');
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => router.get('/articles')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Artikel
        </Button>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Featured Image */}
          {article.featured_image && (
            <div className="aspect-video">
              <img 
                src={article.featured_image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-4">
              <Badge 
                style={{ backgroundColor: article.category.color }}
                className="text-white"
              >
                {article.category.name}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDate(article.published_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {article.views_count} views
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Author and Share */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100">
                    {getInitials(article.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{article.user.name}</div>
                  <div className="text-sm text-gray-500">Penulis</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={shareArticle}>
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <Separator className="my-8" />

            {/* Comments Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Komentar ({article.approved_comments.length})
                </h3>
                {!showCommentForm && (
                  <Button onClick={() => setShowCommentForm(true)}>
                    Tulis Komentar
                  </Button>
                )}
              </div>

              {/* Comment Form */}
              {showCommentForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Tulis Komentar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <div>
                        <Textarea
                          placeholder="Tulis komentar Anda..."
                          value={data.content}
                          onChange={(e) => setData('content', e.target.value)}
                          rows={4}
                          className={errors.content ? 'border-red-500' : ''}
                        />
                        {errors.content && (
                          <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                        )}
                      </div>

                      {/* Guest fields - shown when not authenticated */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            type="text"
                            placeholder="Nama Anda"
                            value={data.author_name}
                            onChange={(e) => setData('author_name', e.target.value)}
                            className={errors.author_name ? 'border-red-500' : ''}
                          />
                          {errors.author_name && (
                            <p className="text-sm text-red-500 mt-1">{errors.author_name}</p>
                          )}
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Email Anda"
                            value={data.author_email}
                            onChange={(e) => setData('author_email', e.target.value)}
                            className={errors.author_email ? 'border-red-500' : ''}
                          />
                          {errors.author_email && (
                            <p className="text-sm text-red-500 mt-1">{errors.author_email}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                          {processing ? 'Mengirim...' : 'Kirim Komentar'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowCommentForm(false)}
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {article.approved_comments.length > 0 ? (
                  article.approved_comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-100">
                              {getInitials(comment.user?.name || comment.author_name || 'A')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-sm">
                                {comment.user?.name || comment.author_name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.created_at)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Artikel Terkait</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <Badge 
                      style={{ backgroundColor: relatedArticle.category.color }}
                      className="text-white text-xs w-fit"
                    >
                      {relatedArticle.category.name}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">
                      <Link 
                        href={`/articles/${relatedArticle.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {relatedArticle.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {relatedArticle.excerpt || 'Tidak ada ringkasan tersedia.'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedArticle.user.name}</span>
                      <span>{formatDate(relatedArticle.published_at)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}