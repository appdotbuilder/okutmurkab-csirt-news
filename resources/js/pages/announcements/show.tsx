import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Shield, Clock, ArrowLeft, Share2 } from 'lucide-react';

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

interface Props {
  announcement: Announcement;
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

export default function AnnouncementShow({ announcement }: Props) {
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

  const shareAnnouncement = () => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link pengumuman telah disalin ke clipboard!');
    }
  };

  const IconComponent = priorityIcons[announcement.priority];
  const borderColor = announcement.priority === 'urgent' ? 'border-l-red-500' : 
                     announcement.priority === 'high' ? 'border-l-orange-500' :
                     announcement.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500';
  
  const bgColor = announcement.priority === 'urgent' ? 'bg-red-50' : 
                 announcement.priority === 'high' ? 'bg-orange-50' :
                 announcement.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50';

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => router.get('/announcements')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Pengumuman
        </Button>

        {/* Announcement Content */}
        <Card className={`border-l-4 ${borderColor} ${bgColor} overflow-hidden`}>
          <CardContent className="p-8">
            {/* Priority and Meta */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <IconComponent className={`h-6 w-6 ${
                  announcement.priority === 'urgent' ? 'text-red-500' : 
                  announcement.priority === 'high' ? 'text-orange-500' :
                  announcement.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <Badge className={`${priorityColors[announcement.priority]} text-white text-sm px-3 py-1`}>
                  PRIORITAS {priorityLabels[announcement.priority].toUpperCase()}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={shareAnnouncement}>
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {announcement.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-white">
                  {getInitials(announcement.user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">{announcement.user.name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(announcement.created_at)}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="whitespace-pre-wrap text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: announcement.content.replace(/\n/g, '<br>') }}
              />
            </div>

            <Separator className="my-8" />

            {/* Call to Action */}
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 mb-4">
                Tetap ikuti pengumuman terbaru dari OKUTIMURKAB-CSIRT
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => router.get('/announcements')} variant="outline">
                  Lihat Pengumuman Lain
                </Button>
                <Button onClick={() => router.get('/')}>
                  Kembali ke Beranda
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}