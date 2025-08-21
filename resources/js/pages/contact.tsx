import React from 'react';
import { useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Shield, AlertTriangle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  [key: string]: string;
}



export default function Contact() {
  const { data, setData, post, processing, errors, reset } = useForm<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📞 Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tim OKUTIMURKAB-CSIRT siap membantu Anda dalam masalah keamanan siber dan informasi terkait
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">💌 Kirim Pesan</CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini dan kami akan merespons secepat mungkin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="nama@email.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subjek *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      value={data.subject}
                      onChange={(e) => setData('subject', e.target.value)}
                      className={errors.subject ? 'border-red-500' : ''}
                      placeholder="Topik pesan Anda"
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Pesan *
                    </label>
                    <Textarea
                      id="message"
                      value={data.message}
                      onChange={(e) => setData('message', e.target.value)}
                      className={errors.message ? 'border-red-500' : ''}
                      placeholder="Tulis pesan Anda dengan detail..."
                      rows={6}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardHeader>
                <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  🚨 Kontak Darurat
                </CardTitle>
                <CardDescription className="text-red-600">
                  Untuk insiden keamanan siber yang memerlukan respons cepat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium text-red-700">Hotline 24/7</div>
                      <div className="text-red-600">+62 123-456-7890</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium text-red-700">Email Darurat</div>
                      <div className="text-red-600">emergency@okutimurkab-csirt.go.id</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regular Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  📋 Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Alamat Kantor</div>
                    <div className="text-gray-600">
                      Jl. Pemerintahan No. 1<br />
                      Ogan Komering Ulu Timur<br />
                      Sumatera Selatan 32312
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Telepon Kantor</div>
                    <div className="text-gray-600">+62 735-123-456</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Email Resmi</div>
                    <div className="text-gray-600">info@okutimurkab-csirt.go.id</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Jam Operasional</div>
                    <div className="text-gray-600">
                      Senin - Jumat: 08:00 - 17:00 WIB<br />
                      Sabtu: 08:00 - 12:00 WIB<br />
                      <span className="text-red-600 font-medium">Hotline darurat: 24/7</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  ⏱️ Waktu Respons
                </h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Insiden Kritikal:</span>
                    <span className="font-medium">≤ 1 jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insiden Tinggi:</span>
                    <span className="font-medium">≤ 4 jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pertanyaan Umum:</span>
                    <span className="font-medium">≤ 24 jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Konsultasi:</span>
                    <span className="font-medium">≤ 2 hari kerja</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Tips Menghubungi Kami</h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚨 Insiden Keamanan</h3>
                  <p className="text-sm text-gray-600">
                    Untuk insiden keamanan yang sedang berlangsung, gunakan hotline darurat 24/7 kami.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📝 Informasi Detail</h3>
                  <p className="text-sm text-gray-600">
                    Sertakan informasi selengkap mungkin agar kami dapat memberikan bantuan yang tepat.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔒 Kerahasiaan</h3>
                  <p className="text-sm text-gray-600">
                    Semua informasi yang Anda berikan akan dijaga kerahasiaannya sesuai protokol keamanan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}