import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, Eye, Award, Phone, Mail } from 'lucide-react';



export default function About() {
  const services = [
    {
      icon: '🛡️',
      title: 'Incident Response',
      description: 'Respons cepat terhadap insiden keamanan siber 24/7'
    },
    {
      icon: '🔍',
      title: 'Vulnerability Assessment',
      description: 'Penilaian kerentanan sistem dan infrastruktur IT'
    },
    {
      icon: '📚',
      title: 'Security Awareness',
      description: 'Pelatihan dan edukasi keamanan siber untuk masyarakat'
    },
    {
      icon: '⚠️',
      title: 'Threat Intelligence',
      description: 'Analisis dan peringatan dini ancaman keamanan siber'
    },
    {
      icon: '🤝',
      title: 'Coordination',
      description: 'Koordinasi dengan stakeholder dan lembaga terkait'
    },
    {
      icon: '📈',
      title: 'Monitoring',
      description: 'Pemantauan kontinyu terhadap ancaman dan insiden'
    }
  ];

  const team = [
    {
      role: 'Security Manager',
      description: 'Memimpin tim dan strategi keamanan siber',
      icon: '👨‍💼'
    },
    {
      role: 'Incident Handler',
      description: 'Menangani respons insiden keamanan siber',
      icon: '👨‍💻'
    },
    {
      role: 'Security Analyst',
      description: 'Menganalisis ancaman dan kerentanan',
      icon: '👩‍🔬'
    },
    {
      role: 'Communications',
      description: 'Mengelola komunikasi dan koordinasi',
      icon: '👩‍💼'
    }
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛡️ OKUTIMURKAB-CSIRT
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Computer Security Incident Response Team Kabupaten Ogan Komering Ulu Timur
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Melindungi Infrastruktur Digital Daerah
          </Badge>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                🎯 Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Melindungi infrastruktur TI pemerintah daerah dari ancaman siber</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Memberikan respons cepat terhadap insiden keamanan siber</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Meningkatkan kesadaran keamanan siber masyarakat</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Berkolaborasi dengan stakeholder dalam menghadapi ancaman siber</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Eye className="h-6 w-6 text-green-600" />
                👁️ Visi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi pusat keunggulan keamanan siber terdepan di wilayah Sumatera Selatan, 
                yang mampu melindungi infrastruktur digital pemerintah daerah dan masyarakat 
                dari berbagai ancaman siber melalui tindakan preventif, responsif, dan edukatif.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🔧 Layanan Kami</h2>
            <p className="text-gray-600 text-lg">
              Kami menyediakan berbagai layanan keamanan siber untuk melindungi infrastruktur digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Structure */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">👥 Struktur Tim</h2>
            <p className="text-gray-600 text-lg">
              Tim ahli yang berdedikasi untuk menjaga keamanan siber wilayah
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{member.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.role}</h3>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-2">
                <Award className="h-8 w-8 text-yellow-500" />
                🏆 Pencapaian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Monitoring Keamanan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Insiden Ditangani</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-gray-600">Peserta Pelatihan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-gray-600">Instansi Terlindungi</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-gray-900 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">💼 Bergabung dengan Kami</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bersama-sama kita membangun ekosistem digital yang aman dan terpercaya untuk kemajuan daerah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => router.get('/contact')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Hubungi Kami
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => router.get('/articles')}
            >
              <Mail className="h-5 w-5 mr-2" />
              Baca Artikel
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}