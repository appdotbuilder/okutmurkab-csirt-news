import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertTriangle, Shield, Clock, ChevronRight } from 'lucide-react';

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

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  announcements: {
    data: Announcement[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
  };
  [key: string]: unknown;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-500'
};

const priorityLabels = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
  urgent: 'Mendesak'
};

const priorityIcons = {
  low: Shield,
  medium: Shield,
  high: AlertTriangle,
  urgent: AlertTriangle
};

export default function AnnouncementsIndex({ announcements }: Props) {
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

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📢 Pengumuman</h1>
          <p className="text-gray-600">Informasi penting dan pengumuman resmi dari OKUTIMURKAB-CSIRT</p>
        </div>

        {/* Announcements List */}
        {announcements.data.length > 0 ? (
          <>
            <div className="space-y-6 mb-8">
              {announcements.data.map((announcement) => {
                const IconComponent = priorityIcons[announcement.priority];
                const borderColor = announcement.priority === 'urgent' ? 'border-l-red-500' : 
                                  announcement.priority === 'high' ? 'border-l-orange-500' :
                                  announcement.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500';
                
                const bgColor = announcement.priority === 'urgent' ? 'bg-red-50' : 
                               announcement.priority === 'high' ? 'bg-orange-50' :
                               announcement.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50';

                return (
                  <Card key={announcement.id} className={`border-l-4 ${borderColor} ${bgColor} hover:shadow-md transition-shadow`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className={`h-6 w-6 ${
                            announcement.priority === 'urgent' ? 'text-red-500' : 
                            announcement.priority === 'high' ? 'text-orange-500' :
                            announcement.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                          }`} />
                          <Badge className={`${priorityColors[announcement.priority]} text-white`}>
                            {priorityLabels[announcement.priority]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {formatDate(announcement.created_at)}
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-3">
                        <Link 
                          href={`/announcements/${announcement.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {announcement.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {announcement.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-white">
                              {getInitials(announcement.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{announcement.user.name}</span>
                        </div>
                        <Link 
                          href={`/announcements/${announcement.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                          Baca Selengkapnya <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {announcements.last_page > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  {announcements.links.map((link, index) => {
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada pengumuman</h3>
            <p className="text-gray-600 mb-4">
              Belum ada pengumuman yang dipublikasikan. Kembali lagi nanti untuk informasi terbaru.
            </p>
            <Button onClick={() => router.get('/')} variant="outline">
              Kembali ke Beranda
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}