import SectionBackground from './SectionBackground';

export default function Features() {
  const features = [
    {
      title: 'Kualitas Premium',
      desc: 'Setiap bunga dirangkai dengan teliti dan penuh cinta menggunakan bahan terbaik untuk hasil yang memukau.',
      icon: '✨'
    },
    {
      title: 'Bisa Custom',
      desc: 'Konsultasikan desain, ukuran, jenis bunga, hingga budget sesuai dengan keinginan dan kebutuhan Anda.',
      icon: '🎀'
    },
    {
      title: 'Pengiriman Aman',
      desc: 'Kami memastikan setiap pesanan dikemas dengan aman dan tiba di tangan Anda dalam kondisi sempurna.',
      icon: '🚚'
    }
  ];

  return (
    <section className="py-16 border-b border-sand/30 bg-cream relative overflow-hidden">
      <SectionBackground variant="features" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-sand/50">
          {features.map((f, i) => (
            <div key={i} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center py-5 md:p-8 hover:-translate-y-1 transition-transform duration-300 gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-blush rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl md:mb-6 shadow-sm">
                {f.icon}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-charcoal mb-1 md:mb-3">{f.title}</h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
