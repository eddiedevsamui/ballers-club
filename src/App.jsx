import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Wine, Music, Star, CheckCircle, ChevronRight, MapPin, X, Send, Sparkles, Globe, Image as ImageIcon, Phone, Instagram, Facebook, Crown, LayoutGrid, Armchair } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [lang, setLang] = useState('en'); 
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    guests: 2,
    phone: '',
    notes: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.setHeaderColor('#000000');
    }
  }, []);

  // Content Dictionary
  const content = {
    en: {
      metaTitle: "Ballers Russian Strip Club - Koh Samui VIP Nightlife",
      metaDesc: "Experience the Golden Standard of nightlife in Koh Samui. Premium bottle service, stunning models, and private VIP parties. Book your table now.",
      clubName: "BALLERS RUSSIAN STRIP CLUB",
      location: "Koh Samui",
      openNow: "Open Now",
      until: "Daily 9PM - 4AM",
      heroTitle: "Experience the",
      heroGold: "Golden Standard",
      heroSub: "Koh Samui's premier nightlife destination.",
      tableRes: "Table Reservation",
      tableNormal: "Normal Table",
      tableVip: "VIP Sofa",
      tablePrivate: "Private Section",
      available: "Available",
      vipServices: "VIP Services",
      selectToBook: "Select to Book",
      back: "Back to Services",
      completeRes: "Complete Reservation",
      requesting: "Requesting:",
      labelName: "Full Name",
      labelDate: "Date",
      labelGuests: "Guests",
      labelPhone: "Telegram / Phone",
      labelNotes: "Special Requests",
      placeholderName: "Your Name",
      placeholderPhone: "@username or +66...",
      placeholderNotes: "Bottle preference, model requests...",
      btnConfirm: "Confirm Request",
      paymentNote: "Payment will be arranged via our manager after confirmation.",
      reqSent: "Request Sent",
      reqSub: "Your inquiry for",
      reqSub2: "has been received. Our VIP manager will contact you shortly.",
      resId: "Reservation ID",
      navClub: "CLUB",
      navMenu: "MENU",
      navGallery: "GALLERY",
      navContact: "CONTACT",
      exclusive: "EXCLUSIVE",
      contactTitle: "Get in Touch",
      socials: "Social Media",
      locationTitle: "Location",
      menuTitle: "Premium Bottle Service",
      recruitTitle: "Become Ballers Girls",
      recruitSub: "Join our elite team of models and hostesses.",
      applyBtn: "Apply Now"
    },
    ru: {
      metaTitle: "Ballers Русский Стрип Клуб - VIP Самуи",
      metaDesc: "Золотой стандарт ночной жизни на Самуи. Премиальный алкоголь, красивые модели и закрытые VIP вечеринки. Забронируйте стол сейчас.",
      clubName: "BALLERS РУССКИЙ СТРИП КЛУБ",
      location: "Самуи",
      openNow: "Открыто",
      until: "Ежедневно 21:00 - 04:00",
      heroTitle: "Почувствуй",
      heroGold: "Золотой Стандарт",
      heroSub: "Главное ночное заведение Самуи.",
      tableRes: "Бронь Столов",
      tableNormal: "Обычный Стол",
      tableVip: "VIP Диван",
      tablePrivate: "Приватная Секция",
      available: "Доступно",
      vipServices: "VIP Услуги",
      selectToBook: "Выберите для брони",
      back: "Назад к услугам",
      completeRes: "Завершение бронирования",
      requesting: "Запрос:",
      labelName: "Ваше Имя",
      labelDate: "Дата",
      labelGuests: "Гости",
      labelPhone: "Telegram / Телефон",
      labelNotes: "Особые пожелания",
      placeholderName: "Иван Петров",
      placeholderPhone: "@username или +66...",
      placeholderNotes: "Предпочтения по напиткам, моделям...",
      btnConfirm: "Подтвердить Запрос",
      paymentNote: "Оплата будет согласована с менеджером после подтверждения.",
      reqSent: "Запрос Отправлен",
      reqSub: "Ваш запрос на",
      reqSub2: "получен. Наш VIP-менеджер свяжется с вами в ближайшее время.",
      resId: "ID Брони",
      navClub: "КЛУБ",
      navMenu: "МЕНЮ",
      navGallery: "ГАЛЕРЕЯ",
      navContact: "КОНТАКТЫ",
      exclusive: "ЭКСКЛЮЗИВ",
      contactTitle: "Связаться с нами",
      socials: "Соцсети",
      locationTitle: "Местоположение",
      menuTitle: "Премиум Алкоголь",
      recruitTitle: "Стать Моделью Ballers",
      recruitSub: "Присоединяйтесь к нашей элитной команде.",
      applyBtn: "Подать Заявку"
    }
  };

  const t = content[lang];

  // Bottle Menu Data
  const bottles = [
    { name: "Grey Goose 1.75L", price: "15,000 THB", category: "Vodka" },
    { name: "Grey Goose 4.5L", price: "65,000 THB", category: "Vodka" },
    { name: "Hennessy VSOP 70cl", price: "11,000 THB", category: "Cognac" },
    { name: "Johnnie Walker Blue 75cl", price: "42,000 THB", category: "Whisky" },
    { name: "Patron Silver 75cl", price: "11,000 THB", category: "Tequila" },
    { name: "Don Julio 1942 75cl", price: "45,000 THB", category: "Tequila" },
    { name: "Château Gruaud Larose", price: "15,000 THB", category: "Red Wine" },
    { name: "Moët & Chandon Magnum 1.5L", price: "18,000 THB", category: "Champagne" },
    { name: "Moët & Chandon 3L", price: "45,000 THB", category: "Champagne" },
    { name: "Dom Pérignon 75cl", price: "38,000 THB", category: "Champagne" },
    { name: "Dom Pérignon 1.5L", price: "75,000 THB", category: "Champagne" },
    { name: "Armand de Brignac 75cl", price: "50,000 THB", category: "Champagne" }
  ];

  // Table Data
  const tables = [
    {
      id: 't1',
      title: t.tableNormal,
      count: "8",
      icon: <LayoutGrid className="w-5 h-5" />,
      description: lang === 'en' ? "Standard high table" : "Стандартный высокий стол",
      color: "from-neutral-800 to-neutral-900"
    },
    {
      id: 't2',
      title: t.tableVip,
      count: "2",
      icon: <Armchair className="w-5 h-5" />,
      description: lang === 'en' ? "Premium sofa seating" : "Премиум диваны",
      color: "from-[#BF953F]/20 to-black"
    },
    {
      id: 't3',
      title: t.tablePrivate,
      count: "1",
      icon: <Crown className="w-5 h-5" />,
      description: lang === 'en' ? "Exclusive private area" : "Эксклюзивная зона",
      color: "from-[#BF953F]/40 to-black"
    }
  ];

  // Services List
  const services = [
    {
      id: 1,
      title: lang === 'en' ? "Private Party" : "Частная Вечеринка",
      price: lang === 'en' ? "Start ฿30,000" : "От ฿30,000",
      icon: <Wine className="w-6 h-6" />,
      description: lang === 'en' 
        ? "Full club access with private security, dedicated hostess team, and premium bottle service."
        : "Полный доступ к клубу с частной охраной, командой хостес и премиальным обслуживанием.",
      isPopular: true
    },
    {
      id: 2,
      title: lang === 'en' ? "Bachelor Party" : "Мальчишник",
      price: lang === 'en' ? "Custom Package" : "Индивидуальный пакет",
      icon: <Users className="w-6 h-6" />,
      description: lang === 'en'
        ? "The ultimate send-off. Reserved VIP area, unlimited mixers, and special entertainment arrangements."
        : "Лучшие проводы холостяцкой жизни. VIP-зона, безлимитные напитки и особая программа.",
      isPopular: false
    },
    {
      id: 3,
      title: lang === 'en' ? "Pool Villa Party" : "Вечеринка на Вилле",
      price: lang === 'en' ? "Start ฿50,000" : "От ฿50,000",
      icon: <Music className="w-6 h-6" />,
      description: lang === 'en'
        ? "We bring the club to you. DJ, sound system, bar, and staff setup at your private villa."
        : "Мы привезем клуб к вам. Диджей, звук, бар и персонал на вашей частной вилле.",
      isPopular: false
    },
    {
      id: 4,
      title: lang === 'en' ? "Entertainer Models" : "Модели и Артисты",
      price: lang === 'en' ? "Inquire for Rates" : "По запросу",
      icon: <Sparkles className="w-6 h-6" />,
      description: lang === 'en'
        ? "Professional models, dancers, and atmosphere creators to elevate your private event experience."
        : "Профессиональные модели, танцоры и создатели атмосферы для вашего мероприятия.",
      isPopular: true
    }
  ];

  const galleryImages = Array.from({ length: 20 }, (_, i) => `/slider/${i + 1}.jpg`);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch('/api/send-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                service: selectedService?.title
            }),
        });

        if (response.ok) {
            setIsBooked(true);
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
            }
            setTimeout(() => {
                setIsBooked(false);
                setSelectedService(null);
                setActiveTab('home');
                setFormData({ name: '', date: '', guests: 2, phone: '', notes: '' });
            }, 3000);
        } else {
            alert("Connection Error. Please try again.");
        }
    } catch (error) {
        console.error("Booking Error:", error);
        alert("Could not send booking. Please check your connection.");
    } finally {
        setIsLoading(false);
    }
  };

  const GoldGradientText = ({ children, className = "" }) => (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] ${className}`}>
      {children}
    </span>
  );

  const GoldButton = ({ children, onClick, className = "", type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`relative overflow-hidden group w-full py-4 rounded-xl font-bold tracking-wider text-black
      bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] 
      hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 
      disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
            <span className="animate-pulse">Sending Request...</span>
        ) : children}
      </span>
      {!isLoading && <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />}
    </button>
  );

  const TableCard = ({ item }) => (
    <div 
        onClick={() => {
            setSelectedService(item);
            setActiveTab('booking');
        }}
        className={`bg-gradient-to-br ${item.color} rounded-xl p-4 border border-white/10 relative overflow-hidden group cursor-pointer`}
    >
        <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-full bg-black/40 text-[#BF953F]`}>
                {item.icon}
            </div>
            <span className="text-[10px] bg-black/40 px-2 py-1 rounded-full text-gray-300">
                {item.count} {t.available}
            </span>
        </div>
        <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
        <p className="text-[10px] text-gray-400">{item.description}</p>
        <div className="absolute inset-0 border-2 border-[#BF953F] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
    </div>
  );

  const ServiceCard = ({ service }) => (
    <div 
      onClick={() => {
        setSelectedService(service);
        setActiveTab('booking');
      }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#BF953F] to-[#4a3b18] rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500 blur-sm"></div>
      <div className="relative bg-black rounded-2xl p-6 h-full flex flex-col border border-[#333] group-hover:border-[#BF953F]/50 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black border border-[#333] group-hover:border-[#BF953F] transition-colors">
            <div className="text-[#BF953F]">
              {service.icon}
            </div>
          </div>
          {service.isPopular && (
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#BF953F] text-black tracking-wider">
              {t.exclusive}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
        
        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-[#BF953F] font-medium text-sm">{service.price}</span>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#BF953F] transition-colors" />
        </div>
      </div>
    </div>
  );

  if (isBooked) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="w-24 h-24 rounded-full bg-[#BF953F]/20 flex items-center justify-center mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-[#BF953F]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.reqSent}</h2>
        <p className="text-gray-400 mb-8 max-w-xs mx-auto">
          {t.reqSub} <span className="text-[#BF953F]">{selectedService?.title}</span> {t.reqSub2}
        </p>
        <div className="w-full max-w-xs p-4 bg-neutral-900/80 rounded-xl border border-[#BF953F]/30 backdrop-blur-md">
            <div className="text-sm text-gray-500 mb-1">{t.resId}</div>
            <div className="text-xl font-mono text-[#BF953F]">#BALLER-{Math.floor(Math.random() * 9000) + 1000}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white pb-20 selection:bg-[#BF953F] selection:text-black">
      {/* SEO Configuration - Native React 19 */}
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDesc} />
      <meta name="keywords" content="Koh Samui Nightlife, Russian Club Samui, Strip Club Koh Samui, VIP Party Samui, Ballers Club, Chaweng Nightlife" />
      <meta name="google-site-verification" content="70TrYsriChPSUZ6E1GX1u8C6CW6wKYLiR8GIZ3ImQSU" />
      
      {/* Open Graph / Facebook / LINE */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://apps.ballersviplounge.com/" />
      <meta property="og:title" content={t.metaTitle} />
      <meta property="og:description" content={t.metaDesc} />
      <meta property="og:image" content="https://apps.ballersviplounge.com/hero.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://apps.ballersviplounge.com/" />
      <meta property="twitter:title" content={t.metaTitle} />
      <meta property="twitter:description" content={t.metaDesc} />
      <meta property="twitter:image" content="https://apps.ballersviplounge.com/hero.jpg" />

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(191,149,63,0.3),transparent_70%)]"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Logo Image */}
              <img 
                  src="/logo.png" 
                  alt="Ballers Logo" 
                  className="w-10 h-10 flex-shrink-0 rounded-lg object-contain bg-black border border-[#BF953F]/30"
              />
              <div className="flex flex-col min-w-0">
                  <span className="text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase leading-tight text-white truncate">{t.clubName}</span>
                  <span className="text-[0.6rem] text-[#BF953F] tracking-[0.2em] uppercase mt-0.5">{t.location}</span>
              </div>
          </div>
          
          <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button 
                  onClick={() => setLang(l => l === 'en' ? 'ru' : 'en')}
                  className="w-10 h-9 flex items-center justify-center rounded-lg border border-[#BF953F]/30 hover:bg-[#BF953F]/10 text-[#BF953F] text-xs font-bold transition-all"
              >
                  {lang === 'en' ? 'RU' : 'EN'}
              </button>
              
              <a 
                  href="https://maps.app.goo.gl/ogaTcLNGELZu2EMo9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 flex-shrink-0 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-[#BF953F]/30"
              >
                  <MapPin className="w-5 h-5 text-[#BF953F]" />
              </a>
          </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
          {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Hero Section - Full Width & Immersive */}
              <div className="relative h-[75vh] min-h-[500px] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <img 
                    src="/hero.jpg" 
                    alt="Luxury Club" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pb-16">
                    <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-2 drop-shadow-2xl uppercase italic tracking-tighter">
                    {t.heroTitle} <br/>
                    <GoldGradientText>{t.heroGold}</GoldGradientText>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-200 line-clamp-2 drop-shadow-md max-w-[90%]">
                    {t.heroSub}
                    </p>
                </div>
              </div>

              {/* Open Hours Bar - Sticky below Header style but placed after hero */}
              <div className="bg-neutral-900 border-y border-[#BF953F]/20 py-4 px-6 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#BF953F]/10 text-[#BF953F]">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Open Hours</span>
                        <span className="text-sm text-white font-medium">{t.until}</span>
                    </div>
                 </div>
                 <span className="px-3 py-1 rounded-full bg-[#BF953F] text-black text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(191,149,63,0.4)] animate-pulse">
                    {t.openNow}
                 </span>
              </div>

              {/* Padded Content Section */}
              <div className="p-6 space-y-8">
                {/* Table Booking Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">{t.tableRes}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {tables.map(table => (
                            <TableCard key={table.id} item={table} />
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xl font-bold">{t.vipServices}</h2>
                        <span className="text-xs text-[#BF953F] uppercase tracking-wider">{t.selectToBook}</span>
                    </div>
                    
                    <div className="grid gap-4">
                        {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
              </div>
          </div>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
          <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between mb-6 border-b border-[#BF953F]/30 pb-4">
              <h2 className="text-2xl font-bold text-white">{t.menuTitle}</h2>
              <div className="p-2 bg-[#BF953F]/10 rounded-full">
                  <Wine className="w-6 h-6 text-[#BF953F]" />
              </div>
              </div>
              
              <div className="space-y-4"> 
              {bottles.map((bottle, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-xl bg-neutral-900 border border-white/10 p-4 flex items-center gap-4 transition-all hover:border-[#BF953F]/50 shadow-lg cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center border border-[#BF953F]/20 text-[#BF953F] shrink-0 group-hover:scale-110 transition-transform">
                      <Wine className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0 relative z-10">
                      <h3 className="text-white font-bold text-base mb-0.5 group-hover:text-[#BF953F] transition-colors">{bottle.name}</h3>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{bottle.category}</span>
                      </div>
                      
                      <div className="relative z-10">
                      <div className="text-[#BF953F] font-black text-sm bg-black/80 px-4 py-2 rounded-lg border border-[#BF953F]/30 shadow-[0_0_10px_rgba(191,149,63,0.1)]">
                          {bottle.price}
                      </div>
                      </div>
                  </div>
              ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-6 pb-20">Prices include service charge. VAT may apply.</p>
          </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
          <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-2xl font-bold mb-6 text-white border-b border-[#BF953F]/30 pb-4 inline-block">{t.navGallery}</h2>
              <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((src, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 border border-white/10 group">
                      <img 
                      src={src} 
                      alt={`Gallery ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
              ))}
              </div>
          </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
              <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">{t.contactTitle}</h2>
                  
                  {/* Socials Card */}
                  <div className="bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                      <h3 className="text-[#BF953F] text-sm font-bold uppercase tracking-wider mb-4">{t.socials}</h3>
                      <div className="space-y-4">
                          <a href="https://instagram.com/ballers.samui" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#BF953F] transition-colors group">
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#BF953F]/20 transition-colors">
                                  <Instagram className="w-5 h-5" />
                              </div>
                              <span className="font-medium">INSTAGRAM</span>
                          </a>
                          <a href="https://facebook.com/ballers.samui" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#BF953F] transition-colors group">
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#BF953F]/20 transition-colors">
                                  <Facebook className="w-5 h-5" />
                              </div>
                              <span className="font-medium">FACEBOOK</span>
                          </a>
                          <a href="https://t.me/ballersclubbot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#BF953F] transition-colors group">
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#BF953F]/20 transition-colors">
                                  <Send className="w-5 h-5" />
                              </div>
                              <span className="font-medium">TELEGRAM</span>
                          </a>
                      </div>
                  </div>

                  {/* Recruitment Card */}
                  <div className="bg-gradient-to-br from-neutral-900 to-black border border-[#BF953F]/30 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#BF953F]/10 rounded-full blur-xl"></div>
                      <h3 className="text-[#BF953F] text-sm font-bold uppercase tracking-wider mb-2">{t.recruitTitle}</h3>
                      <p className="text-gray-400 text-xs mb-4">{t.recruitSub}</p>
                      
                      {/* Recruitment Image */}
                      <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                          <img src="/become.jpg" alt="Become a Ballers Girl" className="w-full h-auto object-cover" />
                      </div>

                      <a 
                          href="https://wa.me/66943679730" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] hover:shadow-[0_0_15px_rgba(191,149,63,0.3)] transition-all"
                      >
                          {t.applyBtn}
                      </a>
                  </div>

                  {/* Map Card */}
                  <div className="bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-[#BF953F] text-sm font-bold uppercase tracking-wider">{t.locationTitle}</h3>
                          <a href="https://maps.app.goo.gl/ogaTcLNGELZu2EMo9" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                              Open Map <ChevronRight className="w-3 h-3" />
                          </a>
                      </div>
                      
                      <div className="rounded-xl overflow-hidden border border-white/10 h-64 w-full bg-neutral-800">
                          <iframe 
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.7262680196727!2d100.063498!3d9.532494200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f1be02d931e3%3A0x14a6068864d94e9!2sBallers%20Russian%20Strip%20Club!5e0!3m2!1sen!2sth!4v1768121205417!5m2!1sen!2sth" 
                              width="100%" 
                              height="100%" 
                              style={{border:0}} 
                              allowFullScreen="" 
                              loading="lazy" 
                              referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'booking' && (
          <div className="p-6 animate-in slide-in-from-right duration-500">
              <button 
                  onClick={() => setActiveTab('home')}
                  className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="text-sm font-medium">{t.back}</span>
              </button>

              <h1 className="text-2xl font-bold mb-2">{t.completeRes}</h1>
              <p className="text-sm text-gray-400 mb-8">
                  {t.requesting} <span className="text-[#BF953F]">{selectedService?.title}</span>
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="space-y-4">
                      <div className="relative group">
                          <label className="text-xs font-medium text-[#BF953F] uppercase tracking-wider mb-1 block ml-1">{t.labelName}</label>
                          <input 
                              type="text" 
                              required
                              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all"
                              placeholder={t.placeholderName}
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-medium text-[#BF953F] uppercase tracking-wider mb-1 block ml-1">{t.labelDate}</label>
                              <div className="relative">
                                  <input 
                                      type="date" 
                                      required
                                      className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all [&::-webkit-calendar-picker-indicator]:invert"
                                      value={formData.date}
                                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                                  />
                              </div>
                          </div>
                          <div>
                              <label className="text-xs font-medium text-[#BF953F] uppercase tracking-wider mb-1 block ml-1">{t.labelGuests}</label>
                              <div className="relative flex items-center bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
                                  <button type="button" onClick={() => setFormData(p => ({...p, guests: Math.max(1, p.guests - 1)}))} className="p-4 hover:bg-white/5 text-[#BF953F]">-</button>
                                  <input 
                                      type="number" 
                                      readOnly
                                      className="w-full bg-transparent text-center text-white focus:outline-none"
                                      value={formData.guests}
                                  />
                                  <button type="button" onClick={() => setFormData(p => ({...p, guests: p.guests + 1}))} className="p-4 hover:bg-white/5 text-[#BF953F]">+</button>
                              </div>
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-medium text-[#BF953F] uppercase tracking-wider mb-1 block ml-1">{t.labelPhone}</label>
                          <input 
                              type="tel" 
                              required
                              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all"
                              placeholder={t.placeholderPhone}
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                      </div>

                      <div>
                          <label className="text-xs font-medium text-[#BF953F] uppercase tracking-wider mb-1 block ml-1">{t.labelNotes}</label>
                          <textarea 
                              rows="3"
                              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all resize-none"
                              placeholder={t.placeholderNotes}
                              value={formData.notes}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                      </div>
                  </div>

                  <div className="pt-4 pb-8">
                      <GoldButton type="submit">
                          {t.btnConfirm} <Send className="w-4 h-4 ml-1" />
                      </GoldButton>
                      <p className="text-center text-xs text-gray-500 mt-4">
                          {t.paymentNote}
                      </p>
                  </div>
              </form>
          </div>
          )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-around z-50 pb-safe">
          <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#BF953F]' : 'text-gray-500'}`}
          >
              <Crown className="w-6 h-6" />
              <span className="text-[10px] font-medium tracking-wide">{t.navClub}</span>
          </button>
          <button 
              onClick={() => setActiveTab('menu')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'menu' ? 'text-[#BF953F]' : 'text-gray-500'}`}
          >
              <Wine className="w-6 h-6" />
              <span className="text-[10px] font-medium tracking-wide">{t.navMenu}</span>
          </button>
          <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'gallery' ? 'text-[#BF953F]' : 'text-gray-500'}`}
          >
              <ImageIcon className="w-6 h-6" />
              <span className="text-[10px] font-medium tracking-wide">{t.navGallery}</span>
          </button>
          <button 
              onClick={() => setActiveTab('contact')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'contact' ? 'text-[#BF953F]' : 'text-gray-500'}`}
          >
              <Phone className="w-6 h-6" />
              <span className="text-[10px] font-medium tracking-wide">{t.navContact}</span>
          </button>
      </nav>
      
      <style>{`
          .pb-safe {
              padding-bottom: env(safe-area-inset-bottom, 20px);
          }
      `}</style>
    </div>
  );
};

export default App;