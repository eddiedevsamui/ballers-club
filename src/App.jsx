import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Wine, Music, Star, CheckCircle, ChevronRight, MapPin, X, Send, Sparkles, Globe } from 'lucide-react';

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

  // Correctly closed useEffect
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
      clubName: "BALLERS RUSSIAN STRIP CLUB",
      location: "Koh Samui",
      openNow: "Open Now",
      until: "Until 4:00 AM",
      heroTitle: "Experience the",
      heroGold: "Golden Standard",
      heroSub: "Koh Samui's premier nightlife destination.",
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
      navEvents: "EVENTS",
      navProfile: "PROFILE",
      exclusive: "EXCLUSIVE"
    },
    ru: {
      clubName: "BALLERS РУССКИЙ СТРИП КЛУБ",
      location: "Самуи",
      openNow: "Открыто",
      until: "До 04:00",
      heroTitle: "Почувствуй",
      heroGold: "Золотой Стандарт",
      heroSub: "Главное ночное заведение Самуи.",
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
      navEvents: "СОБЫТИЯ",
      navProfile: "ПРОФИЛЬ",
      exclusive: "ЭКСКЛЮЗИВ"
    }
  };

  const t = content[lang];

  // Services
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
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(191,149,63,0.3),transparent_70%)]"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center gap-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 flex-shrink-0 rounded bg-gradient-to-tr from-[#BF953F] to-[#FBF5B7] flex items-center justify-center text-black font-black text-xs">
                B
            </div>
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
      <main className="p-6 relative z-10">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
              {/* Background Image */}
              <img 
                src="/hero.jpg" 
                alt="Luxury Club" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#BF953F] text-black text-[10px] font-bold uppercase tracking-wider">{t.openNow}</span>
                    <span className="text-xs text-gray-300 flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" /> {t.until}</span>
                </div>
                <h1 className="text-3xl font-bold leading-tight mb-2 drop-shadow-lg">
                  {t.heroTitle} <br/>
                  <GoldGradientText>{t.heroGold}</GoldGradientText>
                </h1>
                <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-md">
                  {t.heroSub}
                </p>
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
        )}

        {activeTab === 'booking' && (
          <div className="animate-in slide-in-from-right duration-500">
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
            <Wine className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{t.navClub}</span>
        </button>
        <button 
            onClick={() => {}}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
        >
            <Music className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{t.navEvents}</span>
        </button>
        <button 
            onClick={() => {}}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
        >
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{t.navProfile}</span>
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