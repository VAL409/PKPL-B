import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onExploreCatalog }) {
  return (
    <section className="py-20 bg-stone-50/60 border-y border-stone-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Showcase */}
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/unggulan2.jpg"
                alt="Tentang GreenLeaf"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
              Kenali Kami
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 leading-tight mb-6">
              GreenLeaf: Sahabat Terbaik Menghijaukan Rumah Anda
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4 text-base">
              <strong>GreenLeaf</strong> adalah sahabat Anda dalam menghijaukan hunian modern. Kami menyediakan aneka tanaman hias berkualitas tinggi yang telah dirawat dengan teliti dan penuh dedikasi, siap menghiasi dan mempercantik interior maupun eksterior rumah Anda.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8 text-base">
              Kami percaya bahwa membawa elemen alam ke dalam ruang hidup sehari-hari terbukti dapat meningkatkan kualitas hidup, menyaring dan menjernihkan udara, serta menciptakan ketenangan batin dari rutinitas harian.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Tanaman segar siap display',
                'Pot & media tanam premium',
                'Garansi tanaman hidup',
                'Panduan perawatan lengkap',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-stone-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#2e6043] text-white hover:bg-emerald-800 transition-all shadow-md cursor-pointer"
            >
              Lihat Semua Tanaman
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
