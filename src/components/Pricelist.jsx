import SectionBackground from './SectionBackground';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Pricelist() {
  const prices = [
    { name: 'Sedap Malam pink', price: '15K' },
    { name: 'Casablanca Lily', price: '75K' },
    { name: 'Baby breathe', price: '35K' },
    { name: 'Mawar', price: '7K' },
    { name: 'Gerbera lokal', price: '4K' },
    { name: 'Gerbera Semi', price: '8K' },
    { name: 'Anthurium', price: '15K' },
    { name: 'Carnation', price: '5K' },
    { name: 'Chrysanthemum Toba', price: '20K' },
    { name: 'Gladiol', price: '15K' },
    { name: 'Aster', price: '5K' },
    { name: 'Pikok', price: '3.5K' },
    { name: 'Solidago', price: '4K' },
    { name: 'Taiwan leaves', price: '6K' },
    { name: 'Ruskus', price: '2K' },
    { name: 'Hydrangea lokal', price: '10K' },
  ];

  return (
    <section className="pt-10 pb-20 md:pt-12 md:pb-32 border-b border-sand/30 bg-[#fbf8f3] relative overflow-hidden">
      <SectionBackground variant="features" />

      {/* Background Ornaments (Bintang & Kilau) */}
      <div className="absolute top-[10%] left-[10%] text-[#D9A299]/40 text-3xl animate-[pulse_3s_infinite] pointer-events-none">✦</div>
      <div className="absolute bottom-[20%] right-[10%] text-[#DCC5B2]/40 text-4xl animate-[pulse_4s_infinite_1s] pointer-events-none">✧</div>
      <div className="absolute top-[50%] right-[5%] text-[#D9A299]/30 text-2xl animate-[pulse_2.5s_infinite_0.5s] pointer-events-none">✦</div>
      <div className="absolute bottom-[10%] left-[15%] text-[#DCC5B2]/30 text-2xl animate-[pulse_3.5s_infinite_1.5s] pointer-events-none">✧</div>

      {/* Dekorasi Tambahan */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-brand/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      {/* Pattern Titik Halus */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D9A299 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Menu Card with Elegant Double Border */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 shadow-[0_20px_60px_rgba(217,162,153,0.15)] border border-rose-brand/10">
          <div className="border-[2px] border-dashed border-rose-brand/30 rounded-[1.5rem] md:rounded-[2.5rem] py-12 px-6 md:px-16 relative overflow-hidden">

            {/* Dekorasi Bunga/Daun Pojok (Watermark) */}
            <svg className="absolute -top-6 -left-6 w-32 h-32 md:w-48 md:h-48 text-rose-brand/5 transform -rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C70 30 90 40 100 60 C80 50 60 70 50 100 C40 70 20 50 0 60 C10 40 30 30 50 0 Z" />
              <path d="M50 20 C60 40 80 50 90 60 C70 50 60 70 50 90 C40 70 30 50 10 60 C20 50 40 40 50 20 Z" opacity="0.5" />
            </svg>
            <svg className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 text-rose-brand/5 transform rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C70 30 90 40 100 60 C80 50 60 70 50 100 C40 70 20 50 0 60 C10 40 30 30 50 0 Z" />
              <path d="M50 20 C60 40 80 50 90 60 C70 50 60 70 50 90 C40 70 30 50 10 60 C20 50 40 40 50 20 Z" opacity="0.5" />
            </svg>

            {/* Header section inside the card */}
            <div className="text-center mb-12 relative z-10">
              <div className="inline-block relative mb-4">
                {/* Pita Estetik (Ribbon) */}
                <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-16 text-rose-brand/15 -z-10" viewBox="0 0 200 60" fill="currentColor">
                  <path d="M20 30 Q 100 -10 180 30 L 200 10 L 180 50 Q 100 10 20 50 L 0 10 Z" />
                </svg>
                <h2 className="font-display text-4xl md:text-6xl text-rose-brand font-bold tracking-tight">
                  <span className="text-rose-brand/40 hidden md:inline-block mr-2 text-3xl md:-translate-y-2">✦</span>
                  Pricelist Flowers
                  <span className="text-rose-brand/40 hidden md:inline-block ml-2 text-3xl md:-translate-y-2">✦</span>
                </h2>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-[1px] bg-charcoal/30"></div>
                <p className="text-charcoal tracking-[0.3em] text-xs md:text-sm font-medium uppercase">@JALE.FLORISTT</p>
                <div className="w-12 h-[1px] bg-charcoal/30"></div>
              </div>
            </div>

            {/* List Harga Kolom Kiri Kanan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 md:gap-y-5 relative z-10">
              {prices.map((item, i) => (
                <div key={i} className="flex items-end justify-between group">
                  <span className="text-charcoal font-medium text-base md:text-lg capitalize group-hover:text-rose-brand transition-colors">{item.name}</span>
                  <span className="flex-1 border-b-[2px] border-dotted border-charcoal/20 mx-3 md:mx-4 mb-2 opacity-70 group-hover:border-rose-brand/40 transition-colors"></span>
                  <div className="flex items-center gap-1">
                    <span className="text-rose-brand font-bold text-base md:text-lg">{item.price}</span>
                    <span className="text-xs text-muted/80 whitespace-nowrap hidden sm:inline">/ tangkai</span>
                    <span className="text-xs text-muted/80 whitespace-nowrap sm:hidden">/ tki</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Info & Call To Action */}
            <div className="mt-12 md:mt-16 flex flex-col items-center relative z-10">
              <p className="text-sm md:text-base text-muted/80 font-medium italic mb-5 text-center">
                For more additional details chat admin
              </p>
              <a
                href={`${getWhatsAppLink()}?text=${encodeURIComponent("Halo Admin Jalé Florist, saya ingin tanya-tanya atau informasi soal additional flowers")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="sm:hidden">Chat Admin</span>
                <span className="hidden sm:inline">Chat Admin via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
