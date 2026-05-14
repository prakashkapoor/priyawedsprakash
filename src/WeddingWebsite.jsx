import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Phone, Users, Camera, Gift, Bell, Menu, X, ChevronRight, Plane, Hotel, Car, Music, Sparkles, Check } from 'lucide-react';

export default function WeddingWebsite() {
  // ===========================================================================
  // CONFIG — Edit all wedding details here
  // ===========================================================================
  const WEDDING = {
    bride: { name: 'प्रिया प्रियतम', nameEn: 'Priya Priytam', initial: 'P' },
    groom: { name: 'प्रकाश कुमार', nameEn: 'Prakash Kumar', initial: 'P' },
    hashtag: '#PrakashWedsPriya',
    weddingDate: '2026-06-19T15:00:00+05:30',
    quote: 'खुशियाँ तभी पूरी लगती हैं, जब अपने साथ हों',
    quoteEn: 'The happiest moments are the ones shared with loved ones',
    storyHi:
      'परिवारों के प्यार और आशीर्वाद के साथ, प्रिया और प्रकाश अपनी नई जिंदगी की शुरुआत करने जा रहे हैं। अब बस इंतज़ार है आप सबके साथ मिलकर इस खुशी को हँसी, मस्ती, नाच-गाने और ढेर सारी यादों के साथ मनाने का। आप सबके बिना यह खुशी अधूरी लगेगी।',
    storyEn:
      'With the love and blessings of their families, Priya and Prakash are ready to begin a beautiful new chapter together. Now it’s time to celebrate this special occasion with laughter, dance, great food, and the people who matter the most.',
    contacts: [
      { name: 'श्री राजेश कुमार सिंह (राजन सिंह) / Sh. Rajesh Kumar Singh', role: 'Bride\'s Father / वधू के पिता', phone: '+91 9470011194' },
    ],
  };

  // ===========================================================================
  // 📋 GOOGLE SHEETS CONFIG — Paste your Apps Script Web App URL below
  // After deploying the Apps Script, replace the placeholder URL with the
  // one ending in /exec
  // ===========================================================================
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxL-OLqawa0-7eVI9O2mZJr-Dm_nMooCV5wvtvFqffTPXtuJ6ojU0BWe84apo0KpS5Z/exec';
  const WEDDING_SIDE = 'Bride'; // Change to 'Groom' for the groom-side site

  // ===========================================================================
  // 📸 GOOGLE DRIVE PHOTO UPLOAD CONFIG
  // 1. Create a folder in Google Drive named "Prakash & Priya Wedding Photos"
  // 2. Right-click → Share → Change to "Anyone with the link" → "Editor" access
  //    (This allows guests to upload without signing in to your account)
  // 3. Copy the folder URL and paste it below
  //
  // Example: https://drive.google.com/drive/folders/1ABC123xyz...
  // ===========================================================================
  const PHOTO_UPLOAD_URL = 'https://drive.google.com/drive/folders/17pN4Yym_NVngkGlkxT6jCzgqChbXv7B2?usp=drive_link';
  const PHOTO_VIEW_URL = https://drive.google.com/drive/folders/17pN4Yym_NVngkGlkxT6jCzgqChbXv7B2?usp=drive_link; // Same folder for viewing; or use a separate gallery URL

  const EVENTS = [
    {
      key: 'devpuja',
      name: 'देवपूजा, मण्डपाच्छादन, मटकोर हल्दी कलश',
      nameEn: 'Devpuja, Mandapacchadan, Matkor & Haldi Kalash',
      date: '2026-06-17',
      dateLabel: 'Wed, 17 Jun',
      time: 'पूरे दिन / All Day',
      tithi: 'ज्येष्ठ शुक्ल पक्ष तृतीया',
      venue: 'Singh Residence',
      venueLine2: 'Village — Shahjahanpur, Dist. Patna',
      dress: 'Traditional · Yellow / Cream / पीला, क्रीम',
      mapUrl: 'https://maps.google.com/?q=Shahjahanpur+Patna+Bihar',
      contact: 'श्री राजेश कुमार सिंह · +91 9470011194',
      color: 'amber',
      icon: '🛕',
    },
    {
      key: 'ghritdhari',
      name: 'घृतधारी एवं मेहंदी',
      nameEn: 'Ghritdhari & Mehendi',
      date: '2026-06-18',
      dateLabel: 'Thu, 18 Jun',
      time: 'संध्या / Evening',
      tithi: 'ज्येष्ठ शुक्ल पक्ष चतुर्थी',
      venue: 'Singh Residence',
      venueLine2: 'Village — Shahjahanpur, Dist. Patna',
      dress: 'Festive · Green / हरा',
      mapUrl: 'https://maps.google.com/?q=Shahjahanpur+Patna+Bihar',
      contact: 'श्री राजेश कुमार सिंह · +91 9470011194',
      color: 'green',
      icon: '💚🎶',
    },
    {
      key: 'wedding',
      name: 'शुभ विवाह एवं प्रीतिभोज',
      nameEn: 'The Wedding & Pritibhoj',
      date: '2026-06-19',
      dateLabel: 'Fri, 19 Jun',
      time: 'प्रीतिभोज: संध्या 7 बजे से आपके आगमन तक',
      tithi: 'ज्येष्ठ शुक्ल पक्ष पंचमी',
      venue: 'Singh Residence',
      venueLine2: 'Village — Shahjahanpur, Dist. Patna',
      dress: 'Formal Indian Attire / पारंपरिक भारतीय परिधान',
      mapUrl: 'https://maps.google.com/?q=Shahjahanpur+Patna+Bihar',
      contact: 'श्री राजेश कुमार सिंह · +91 9470011194',
      color: 'red',
      icon: '👰🤵',
      highlight: true,
    },
  ];

  // ===========================================================================
  // STATE
  // ===========================================================================
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [musicOn, setMusicOn] = useState(false);
  const [rsvp, setRsvp] = useState({
    name: '',
    attending: '',
    guests: 1,
    meal: 'veg',
    accommodation: 'no',
    events: [],
    travel: '',
    phone: '',
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState(null);
  const [liveUpdates, setLiveUpdates] = useState([
    { id: 1, time: 'Posted just now', title: 'Welcome! / स्वागत है', body: 'The countdown has begun. We can\'t wait to celebrate with you. Bookmark this page for live updates during the wedding week. / शुभ घड़ी की प्रतीक्षा शुरू हो गई है। शादी सप्ताह की ताज़ा सूचना के लिए इस पेज को सहेज लें।', type: 'info' },
  ]);

  // ===========================================================================
  // COUNTDOWN
  // ===========================================================================
  useEffect(() => {
    const target = new Date(WEDDING.weddingDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ===========================================================================
  // SECTION SCROLL TRACKING
  // ===========================================================================
  useEffect(() => {
    const sections = ['home', 'story', 'events', 'rsvp', 'travel', 'gallery', 'gifts', 'updates'];
    const handler = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ===========================================================================
  // HELPERS
  // ===========================================================================
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setNavOpen(false);
    }
  };

  const addToCalendar = (event) => {
    const start = new Date(event.date + 'T' + (event.time.includes('PM') ? '17:00' : '10:00') + ':00+05:30');
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.nameEn + ' - Prakash & Priya')}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent('Dress code: ' + event.dress)}&location=${encodeURIComponent(event.venue + ', ' + event.venueLine2)}`;
    window.open(url, '_blank');
  };

  // ===========================================================================
  // 📤 RSVP SUBMIT → Google Sheets
  // ===========================================================================
  const submitRsvp = async () => {
    if (!rsvp.name || !rsvp.attending) return;

    setRsvpSubmitting(true);
    setRsvpError(null);

    const payload = {
      name: rsvp.name,
      side: WEDDING_SIDE,
      attending: rsvp.attending,
      guests: rsvp.guests,
      meal: rsvp.meal,
      events: rsvp.events,
      accommodation: rsvp.accommodation,
      travel: rsvp.travel,
      phone: rsvp.phone || '',
      message: rsvp.message,
    };

    try {
      // Note: 'no-cors' mode is required for Google Apps Script.
      // We can't read the response, but the data will still be saved.
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setRsvpSubmitted(true);
      setLiveUpdates((prev) => [
        { id: Date.now(), time: 'Just now', title: 'New RSVP', body: `${rsvp.name} ${rsvp.attending === 'yes' ? 'is joining' : 'sent regrets'} ❤️`, type: 'rsvp' },
        ...prev,
      ]);
    } catch (err) {
      setRsvpError('Could not save RSVP. Please try again or call us directly.');
      console.error('RSVP submission failed:', err);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `💍 सादर आमंत्रण 💍\n\nपरिवार के प्यार और आशीर्वाद के साथ,\n${WEDDING.bride.nameEn} ❤️ ${WEDDING.groom.nameEn}\nआपको अपने विवाह समारोह में सपरिवार आमंत्रित करते हैं।\n\n📅 19 June 2026\n\nAap sabke bina ye khushi adhuri lagegi. Zaroor aaiyega ✨\n\n${WEDDING.hashtag}\n\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const colorClasses = {
    amber: 'bg-amber-50 border-amber-300 text-amber-900',
    orange: 'bg-orange-50 border-orange-300 text-orange-900',
    yellow: 'bg-yellow-50 border-yellow-300 text-yellow-900',
    green: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    red: 'bg-red-50 border-red-400 text-red-900',
    rose: 'bg-rose-50 border-rose-300 text-rose-900',
  };

  const navItems = [
    { id: 'home', label: 'Home', hi: 'मुख्य' },
    { id: 'story', label: 'Our Story', hi: 'कहानी' },
    { id: 'events', label: 'Events', hi: 'कार्यक्रम' },
    { id: 'rsvp', label: 'RSVP', hi: 'उत्तर दें' },
    { id: 'travel', label: 'Travel & Stay', hi: 'यात्रा' },
    { id: 'gallery', label: 'Gallery', hi: 'गैलरी' },
    { id: 'gifts', label: 'Blessings', hi: 'आशीर्वाद' },
    { id: 'updates', label: 'Live', hi: 'सूचना' },
  ];

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="min-h-screen bg-[#FDF6E9] text-stone-800" style={{ fontFamily: '"Cormorant Garamond", "Tiro Devanagari Hindi", serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&family=Great+Vibes&family=Marcellus&display=swap');

        body { margin: 0; }
        .font-serif-display { font-family: 'Cormorant Garamond', serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-deco { font-family: 'Marcellus', serif; letter-spacing: 0.08em; }
        .font-hindi { font-family: 'Tiro Devanagari Hindi', serif; }

        .mandala-bg {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(184, 91, 31, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 0, 0, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.04) 0%, transparent 60%);
        }

        .paper-texture {
          background-color: #FDF6E9;
          background-image:
            radial-gradient(at 88% 12%, rgba(255,237,213,0.5) 0px, transparent 50%),
            radial-gradient(at 2% 92%, rgba(254,215,170,0.4) 0px, transparent 50%);
        }

        .marigold-border {
          background-image: linear-gradient(90deg, #F59E0B 25%, #DC2626 25%, #DC2626 50%, #F59E0B 50%, #F59E0B 75%, #DC2626 75%);
          background-size: 16px 100%;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        .float-slow { animation: float-slow 6s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, #B45309 0%, #FBBF24 50%, #B45309 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.8s ease-out both; }

        .ornament::before, .ornament::after {
          content: "❋";
          color: #B45309;
          margin: 0 1rem;
          font-size: 0.7em;
          vertical-align: middle;
        }

        .countdown-num {
          font-variant-numeric: tabular-nums;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #FDF6E9; }
        ::-webkit-scrollbar-thumb { background: #B45309; border-radius: 4px; }

        html { scroll-behavior: smooth; }

        /* Diya pattern */
        .diya-pattern {
          background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(180, 83, 9, 0.03) 20px, rgba(180, 83, 9, 0.03) 40px);
        }
      `}</style>

      {/* ================ TOP MARIGOLD STRIP ================ */}
      <div className="marigold-border h-2 fixed top-0 left-0 right-0 z-50" />

      {/* ================ NAV ================ */}
      <nav className="fixed top-2 left-0 right-0 z-40 bg-[#FDF6E9]/95 backdrop-blur border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-red-700 flex items-center justify-center text-white font-deco text-sm shadow-md group-hover:scale-110 transition">
              P&P
            </div>
            <div className="hidden sm:block">
              <div className="font-script text-xl text-red-900 leading-none">Priya &amp; Prakash</div>
              <div className="text-[10px] text-amber-700 tracking-widest uppercase">19 · 06 · 2026</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-sm font-deco transition-all rounded ${
                  activeSection === item.id
                    ? 'text-red-900 bg-amber-100'
                    : 'text-stone-600 hover:text-red-900 hover:bg-amber-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMusicOn(!musicOn)}
              className="p-2 rounded-full hover:bg-amber-100 transition"
              title={musicOn ? 'Mute' : 'Play music'}
            >
              <Music size={18} className={musicOn ? 'text-red-700 animate-pulse' : 'text-stone-400'} />
            </button>
            <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden p-2 rounded hover:bg-amber-100">
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="lg:hidden border-t border-amber-200 bg-[#FDF6E9]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-6 py-3 border-b border-amber-100 flex justify-between items-center ${
                  activeSection === item.id ? 'bg-amber-50 text-red-900' : 'text-stone-700'
                }`}
              >
                <span className="font-deco">{item.label}</span>
                <span className="font-hindi text-sm text-amber-700">{item.hi}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ================ HOME / HERO ================ */}
      <section id="home" className="relative pt-24 sm:pt-28 min-h-screen flex items-center mandala-bg paper-texture overflow-hidden">
        {/* Decorative corner ornaments */}
        <div className="absolute top-20 left-4 sm:left-10 text-6xl sm:text-8xl text-amber-300/30 float-slow font-hindi">॥</div>
        <div className="absolute bottom-10 right-4 sm:right-10 text-6xl sm:text-8xl text-red-300/30 float-slow font-hindi" style={{ animationDelay: '2s' }}>॥</div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center relative z-10">
          {/* Shri Ganesh */}
          <div className="fade-up font-hindi text-amber-700 text-sm sm:text-base mb-6 tracking-widest">
            ॥ श्री गणेशाय नमः ॥
          </div>

          {/* Couple names */}
          <div className="fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="font-deco text-xs sm:text-sm text-amber-800 tracking-[0.3em] mb-2">
              TOGETHER WITH THEIR FAMILIES
            </div>
            <div className="font-hindi text-xs sm:text-sm text-amber-800 mb-4">
              अपने परिवारों के साथ
            </div>

            <div className="space-y-2 sm:space-y-4">
              <h1 className="font-script text-5xl sm:text-7xl md:text-8xl gold-shimmer leading-none">
                {WEDDING.bride.nameEn}
              </h1>
              <div className="flex items-center justify-center gap-4 my-3">
                <div className="h-px w-12 sm:w-24 bg-amber-600/40" />
                <div className="font-deco text-2xl sm:text-3xl text-red-900">&amp;</div>
                <div className="h-px w-12 sm:w-24 bg-amber-600/40" />
              </div>
              <h1 className="font-script text-5xl sm:text-7xl md:text-8xl gold-shimmer leading-none">
                {WEDDING.groom.nameEn}
              </h1>
            </div>

            <div className="font-hindi text-base sm:text-xl text-stone-700 mt-6">
              {WEDDING.bride.name} &nbsp;◆&nbsp; {WEDDING.groom.name}
            </div>
          </div>

          {/* Date */}
          <div className="fade-up mt-10 inline-block" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4 sm:gap-6 justify-center">
              <div className="text-right">
                <div className="font-deco text-xs text-amber-800 tracking-widest">FRIDAY</div>
                <div className="font-serif-display text-2xl sm:text-3xl text-red-900">June</div>
              </div>
              <div className="font-serif-display text-6xl sm:text-8xl text-red-900 leading-none px-4 border-x-2 border-amber-600/30">
                19
              </div>
              <div className="text-left">
                <div className="font-deco text-xs text-amber-800 tracking-widest">2026</div>
                <div className="font-serif-display text-2xl sm:text-3xl text-red-900">Patna</div>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="fade-up mt-12" style={{ animationDelay: '0.6s' }}>
            <div className="text-xs font-deco text-amber-800 tracking-widest mb-1 ornament">
              <span>THE COUNTDOWN BEGINS</span>
            </div>
            <div className="font-hindi text-xs text-amber-800 mb-4">शुभ घड़ी की प्रतीक्षा</div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              {[
                { val: timeLeft.days, label: 'Days', hi: 'दिन' },
                { val: timeLeft.hours, label: 'Hours', hi: 'घंटे' },
                { val: timeLeft.minutes, label: 'Min', hi: 'मिनट' },
                { val: timeLeft.seconds, label: 'Sec', hi: 'सेकंड' },
              ].map((b, i) => (
                <div key={i} className="bg-white/60 backdrop-blur border border-amber-200 rounded-lg p-2 sm:p-4 shadow-sm">
                  <div className="font-serif-display text-2xl sm:text-4xl text-red-900 countdown-num">
                    {String(b.val).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-deco text-amber-700 tracking-widest mt-1">{b.label}</div>
                  <div className="font-hindi text-[10px] text-amber-800 mt-0.5">{b.hi}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => scrollTo('rsvp')}
              className="group inline-flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-full font-deco text-sm tracking-widest shadow-lg hover:shadow-xl transition"
            >
              <Heart size={16} className="group-hover:scale-110 transition" />
              SAVE THE DATE / तिथि सुरक्षित करें
            </button>
            <button
              onClick={() => scrollTo('events')}
              className="inline-flex items-center gap-2 bg-white border-2 border-amber-600 text-amber-900 hover:bg-amber-50 px-6 py-3 rounded-full font-deco text-sm tracking-widest transition"
            >
              <Calendar size={16} />
              VIEW EVENTS / कार्यक्रम देखें
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-deco text-sm tracking-widest transition"
            >
              SHARE / साझा करें
            </button>
          </div>

          {/* Hashtag */}
          <div className="fade-up mt-10 font-deco text-sm text-amber-800 tracking-widest" style={{ animationDelay: '1s' }}>
            {WEDDING.hashtag}
          </div>
        </div>
      </section>

      {/* ================ STORY ================ */}
      <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#FDF6E9] to-amber-50/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-hindi text-amber-700 text-sm mb-3">॥ हमारी कहानी ॥</div>
          <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">Our Story</h2>
          <p className="font-hindi text-stone-700 mt-1">हमारी कहानी</p>
          <div className="flex justify-center my-6">
            <div className="h-px w-20 bg-amber-600/40" />
            <Heart size={14} className="mx-3 text-red-700" fill="currentColor" />
            <div className="h-px w-20 bg-amber-600/40" />
          </div>

          <p className="font-hindi text-base sm:text-lg text-stone-700 italic mb-4">
            "{WEDDING.quote}"
          </p>
          <p className="font-serif-display text-lg sm:text-xl text-stone-700 italic mb-8">
            "{WEDDING.quoteEn}"
          </p>

          <p className="font-hindi text-base sm:text-lg text-stone-700 leading-relaxed max-w-3xl mx-auto mb-6">
            {WEDDING.storyHi}
          </p>
          <p className="font-serif-display text-lg sm:text-xl text-stone-700 leading-relaxed max-w-3xl mx-auto">
            {WEDDING.storyEn}
          </p>

          {/* Timeline */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: '✨',
                titleEn: 'How we met',
                titleHi: 'पहली मुलाक़ात',
                bodyEn: 'Two families came together through shared connections. The first meeting felt like home.',
                bodyHi: 'दो परिवार साझे रिश्तों के माध्यम से एक हुए। पहली मुलाक़ात ऐसी लगी जैसे अपना घर हो।',
              },
              {
                icon: '👰🤵',
                titleEn: 'A New Beginning',
                titleHi: 'नई शुरुआत',
                bodyEn: 'With the blessings of their families, Priya and Prakash are ready to begin this beautiful journey together and create a lifetime of memories.',
                bodyHi: 'परिवारों के आशीर्वाद के साथ, प्रिया और प्रकाश अब अपनी नई जिंदगी की शुरुआत करने जा रहे हैं और साथ मिलकर खूबसूरत यादें बनाने के लिए तैयार हैं।',
              },
              {
                icon: '🎉',
                titleEn: 'Lifetime Commitment',
                titleHi: 'जीवनभर का साथ',
                bodyEn: 'Now we invite you to witness our forever begin — with sindoor, vows, and a lot of joy.',
                bodyHi: 'अब हम आपको आमंत्रित करते हैं कि हमारे सदा-सर्वदा की शुरुआत के साक्षी बनें — सिंदूर, वचन, और असीम आनंद के साथ।',
              },
            ].map((s, i) => (
              <div key={i} className="bg-white/60 border border-amber-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-deco text-sm tracking-widest text-amber-800 mb-1">{s.titleEn.toUpperCase()}</div>
                <div className="font-hindi text-sm text-red-900 mb-3">{s.titleHi}</div>
                <p className="font-serif-display text-stone-700 leading-relaxed mb-2">{s.bodyEn}</p>
                <p className="font-hindi text-sm text-stone-600 leading-relaxed">{s.bodyHi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ EVENTS ================ */}
      <section id="events" className="py-20 sm:py-28 px-4 sm:px-6 diya-pattern">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-hindi text-amber-700 text-sm mb-3">॥ मांगलिक कार्यक्रम ॥</div>
            <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">Wedding Events</h2>
            <p className="font-hindi text-stone-700 mt-3 text-base">तीन दिनों का उत्सव — हम आशा करते हैं आप सभी कार्यक्रमों में पधारेंगे</p>
            <p className="font-serif-display text-stone-600 mt-1">Three days of celebration. We hope to see you at all of them.</p>
          </div>

          <div className="space-y-5">
            {EVENTS.map((ev, idx) => (
              <div
                key={ev.key}
                className={`relative rounded-2xl border-2 p-5 sm:p-7 shadow-sm hover:shadow-lg transition-all ${colorClasses[ev.color]} ${
                  ev.highlight ? 'ring-2 ring-offset-2 ring-red-300' : ''
                }`}
              >
                <div className="grid sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-start">
                  {/* Date block */}
                  <div className="text-center sm:border-r sm:border-current/20 sm:pr-6 min-w-[100px]">
                    <div className="text-4xl mb-1">{ev.icon}</div>
                    <div className="font-deco text-xs tracking-widest opacity-70">{ev.dateLabel.split(',')[0]}</div>
                    <div className="font-serif-display text-3xl font-bold leading-none my-1">{ev.dateLabel.split(' ')[1]}</div>
                    <div className="font-deco text-xs tracking-widest opacity-70">{ev.dateLabel.split(' ')[2]?.toUpperCase()}</div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="font-hindi text-lg sm:text-xl font-semibold">{ev.name}</div>
                    <div className="font-script text-2xl sm:text-3xl">{ev.nameEn}</div>
                    {ev.tithi && (
                      <div className="font-hindi text-xs italic opacity-70">({ev.tithi})</div>
                    )}
                    <div className="flex items-start gap-2 text-sm opacity-80">
                      <Calendar size={14} className="mt-1 flex-shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm opacity-80">
                      <MapPin size={14} className="mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{ev.venue}</div>
                        <div className="text-xs">{ev.venueLine2}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm opacity-80">
                      <Sparkles size={14} className="mt-1 flex-shrink-0" />
                      <span><span className="font-deco text-xs tracking-widest">DRESS / पोशाक:</span> {ev.dress}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm opacity-80">
                      <Phone size={14} className="mt-1 flex-shrink-0" />
                      <span>{ev.contact}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => addToCalendar(ev)}
                      className="text-xs font-deco tracking-widest px-3 py-2 rounded bg-white/70 hover:bg-white border border-current/30 transition"
                    >
                      + CALENDAR / कैलेंडर
                    </button>
                    <a
                      href={ev.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-deco tracking-widest px-3 py-2 rounded bg-white/70 hover:bg-white border border-current/30 transition text-center"
                    >
                      MAP / नक्शा →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center font-serif-display italic text-stone-600">
            All ceremonies are held at the Singh residence in Shahjahanpur, Patna.
            <br />
            <span className="font-hindi not-italic text-stone-700">समस्त वैवाहिक कार्यक्रम मेरे निवास स्थान, ग्राम-शाहजहाँपुर, पटना में संपन्न होंगे।</span>
          </div>
        </div>
      </section>

      {/* ================ RSVP ================ */}
      <section id="rsvp" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-amber-50/40 to-[#FDF6E9]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-hindi text-amber-700 text-sm mb-3">॥ कृपया उत्तर दें ॥</div>
            <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">RSVP</h2>
            <p className="font-hindi text-stone-700 mt-3">कृपया <span className="font-semibold">31 मई 2026</span> तक उत्तर दें</p>
            <p className="font-serif-display text-stone-600 mt-1">
              Kindly respond by <span className="font-semibold">31 May 2026</span>
            </p>
          </div>

          {!rsvpSubmitted ? (
            <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-5">
              {/* Name */}
              <div>
                <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">YOUR NAME * / आपका नाम</label>
                <input
                  type="text"
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="Full name as on invite / पूरा नाम"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-600 font-serif-display text-lg"
                />
              </div>

              {/* Attending */}
              <div>
                <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">WILL YOU BE JOINING? * / क्या आप पधार रहे हैं?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'yes', label: 'Joyfully Accept', sub: 'सहर्ष स्वीकार' },
                    { val: 'no', label: 'Regretfully Decline', sub: 'क्षमा करें' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setRsvp({ ...rsvp, attending: opt.val })}
                      className={`p-4 rounded-lg border-2 transition text-left ${
                        rsvp.attending === opt.val
                          ? 'border-red-700 bg-red-50'
                          : 'border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="font-deco text-sm tracking-wide">{opt.label}</div>
                      <div className="font-hindi text-xs text-amber-800 mt-1">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {rsvp.attending === 'yes' && (
                <>
                  {/* Guest count */}
                  <div>
                    <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">NUMBER OF GUESTS / अतिथियों की संख्या</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setRsvp({ ...rsvp, guests: Math.max(1, rsvp.guests - 1) })}
                        className="w-10 h-10 rounded-full border-2 border-amber-400 hover:bg-amber-100 font-bold"
                      >−</button>
                      <div className="font-serif-display text-3xl text-red-900 w-12 text-center">{rsvp.guests}</div>
                      <button
                        onClick={() => setRsvp({ ...rsvp, guests: Math.min(20, rsvp.guests + 1) })}
                        className="w-10 h-10 rounded-full border-2 border-amber-400 hover:bg-amber-100 font-bold"
                      >+</button>
                      <span className="text-sm text-stone-600 ml-2">including yourself / आप सहित</span>
                    </div>
                  </div>

                  {/* Events attending */}
                  <div>
                    <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">WHICH EVENTS? / किन कार्यक्रमों में आएँगे?</label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {EVENTS.map((ev) => (
                        <label
                          key={ev.key}
                          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                            rsvp.events.includes(ev.key)
                              ? 'border-red-700 bg-red-50'
                              : 'border-amber-200 hover:border-amber-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={rsvp.events.includes(ev.key)}
                            onChange={(e) => {
                              const events = e.target.checked
                                ? [...rsvp.events, ev.key]
                                : rsvp.events.filter((k) => k !== ev.key);
                              setRsvp({ ...rsvp, events });
                            }}
                            className="accent-red-700"
                          />
                          <span className="text-sm">{ev.icon} {ev.nameEn}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Meal */}
                  <div>
                    <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">MEAL PREFERENCE / भोजन पसंद</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'veg', label: '🌱 Veg' },
                        { val: 'jain', label: '🙏 Jain' },
                      ].map((m) => (
                        <button
                          key={m.val}
                          onClick={() => setRsvp({ ...rsvp, meal: m.val })}
                          className={`p-3 rounded-lg border-2 transition ${
                            rsvp.meal === m.val ? 'border-red-700 bg-red-50' : 'border-amber-200'
                          }`}
                        >
                          <span className="text-sm">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div>
                    <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">NEED ACCOMMODATION? / आवास की आवश्यकता?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ val: 'yes', label: 'Yes, please / हाँ' }, { val: 'no', label: 'No, thanks / नहीं' }].map((a) => (
                        <button
                          key={a.val}
                          onClick={() => setRsvp({ ...rsvp, accommodation: a.val })}
                          className={`p-3 rounded-lg border-2 transition ${
                            rsvp.accommodation === a.val ? 'border-red-700 bg-red-50' : 'border-amber-200'
                          }`}
                        >
                          <span className="text-sm">{a.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel */}
                  <div>
                    <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">TRAVEL DETAILS (optional) / यात्रा विवरण</label>
                    <input
                      type="text"
                      value={rsvp.travel}
                      onChange={(e) => setRsvp({ ...rsvp, travel: e.target.value })}
                      placeholder="e.g. Arriving 18 Jun by train, leaving 22 Jun / 18 जून ट्रेन से आगमन"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">PHONE NUMBER (optional) / फ़ोन नंबर</label>
                    <input
                      type="tel"
                      value={rsvp.phone}
                      onChange={(e) => setRsvp({ ...rsvp, phone: e.target.value })}
                      placeholder="+91 ____ ___ ___"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label className="font-deco text-xs tracking-widest text-stone-700 block mb-2">A MESSAGE FOR THE COUPLE (optional) / नवदम्पति के लिए संदेश</label>
                <textarea
                  value={rsvp.message}
                  onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
                  rows={3}
                  placeholder="Send your blessings, wishes, or just say hi 💌 / आशीर्वाद एवं शुभकामनाएँ"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-600 font-serif-display"
                />
              </div>

              {/* Error message */}
              {rsvpError && (
                <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm">
                  ⚠️ {rsvpError}
                </div>
              )}

              <button
                onClick={submitRsvp}
                disabled={!rsvp.name || !rsvp.attending || rsvpSubmitting}
                className="w-full bg-red-800 hover:bg-red-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white py-4 rounded-lg font-deco tracking-widest shadow-lg transition"
              >
                {rsvpSubmitting ? 'SENDING... / भेज रहे हैं...' : 'SUBMIT RSVP / उत्तर भेजें →'}
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-emerald-300 rounded-2xl p-8 text-center shadow-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Check size={32} className="text-emerald-700" />
              </div>
              <div className="font-hindi text-amber-700 mb-2">॥ धन्यवाद ॥</div>
              <h3 className="font-script text-4xl text-red-900 mb-3">Thank You!</h3>
              <p className="font-serif-display text-stone-700 leading-relaxed">
                {rsvp.attending === 'yes'
                  ? `We can't wait to celebrate with you, ${rsvp.name}! We'll be in touch with more details soon.`
                  : `Thank you for letting us know, ${rsvp.name}. We'll miss you and will send blessings your way. 💛`}
              </p>
              <p className="font-hindi text-stone-600 leading-relaxed mt-3">
                {rsvp.attending === 'yes'
                  ? `${rsvp.name} जी, आपके साथ इस ख़ुशी के पल मनाने का इंतज़ार है! जल्द ही और विवरण भेजेंगे।`
                  : `${rsvp.name} जी, सूचित करने के लिए धन्यवाद। आपकी कमी खलेगी, हमारी शुभकामनाएँ आपके साथ हैं। 💛`}
              </p>
              <button
                onClick={() => { setRsvpSubmitted(false); setRsvpError(null); setRsvp({ name: '', attending: '', guests: 1, meal: 'veg', accommodation: 'no', events: [], travel: '', phone: '', message: '' }); }}
                className="mt-6 text-sm font-deco tracking-widest text-amber-800 hover:text-red-900 underline"
              >
                Submit another RSVP / दूसरा उत्तर भेजें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================ TRAVEL & STAY ================ */}
      <section id="travel" className="py-20 sm:py-28 px-4 sm:px-6 mandala-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-hindi text-amber-700 text-sm mb-3">॥ यात्रा एवं आवास ॥</div>
            <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">Travel &amp; Stay</h2>
            <p className="font-hindi text-stone-700 mt-3">पटना (शाहजहाँपुर) तक कैसे पहुँचें</p>
            <p className="font-serif-display text-stone-600 mt-1">Getting to Shahjahanpur, Patna</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* By Air */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
              <Plane size={28} className="text-amber-700 mb-3" />
              <h3 className="font-deco text-lg tracking-widest text-red-900 mb-1">BY AIR</h3>
              <div className="font-hindi text-sm text-amber-800 mb-3">हवाई मार्ग से</div>
              <div className="space-y-2 text-sm text-stone-700">
                <div><strong>Patna Airport (PAT)</strong> / पटना हवाई अड्डा — Main hub, well-connected to all major cities</div>
                <div className="text-xs text-amber-800 mt-3">
                  Pickup can be arranged. Mark "Need Pickup" in RSVP travel field.<br />
                  <span className="font-hindi">पिकअप की व्यवस्था की जा सकती है। RSVP में बताएँ।</span>
                </div>
              </div>
            </div>

            {/* By Train */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
              <Car size={28} className="text-amber-700 mb-3" />
              <h3 className="font-deco text-lg tracking-widest text-red-900 mb-1">BY TRAIN</h3>
              <div className="font-hindi text-sm text-amber-800 mb-3">रेल मार्ग से</div>
              <div className="space-y-2 text-sm text-stone-700">
                <div><strong>Patna Jn (PNBE)</strong> / पटना जं — main station, well-connected</div>
                <div><strong>Rajendra Nagar Terminal (RJPB)</strong> / राजेन्द्र नगर — alternate Patna station</div>
                <div><strong>Danapur (DNR)</strong> / दानापुर — alternate</div>
                <div><strong>Daniyawan</strong> / दनियावां — alternate</div>
              </div>
            </div>

            {/* Weather */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-deco text-lg tracking-widest text-red-900 mb-1">☀️ WEATHER IN JUNE</h3>
              <div className="font-hindi text-sm text-amber-800 mb-3">जून का मौसम</div>
              <div className="text-sm text-stone-700 space-y-1">
                <div>Expect <strong>32–38°C</strong> · humid, occasional rain</div>
                <div className="font-hindi text-xs">तापमान 32–38°C · उमस, हल्की बारिश की संभावना</div>
                <div className="mt-2">Pack: light cotton, breathable kurta, umbrella</div>
                <div className="font-hindi text-xs">सुझाव: हल्के सूती कपड़े, कुर्ता, छाता ज़रूर रखें</div>
                <div className="text-xs mt-2 italic">Indoor venues are AC. / स्थल वातानुकूलित हैं।</div>
              </div>
            </div>

            {/* Local Transport */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-deco text-lg tracking-widest text-red-900 mb-1">🛺 LOCAL TRANSPORT</h3>
              <div className="font-hindi text-sm text-amber-800 mb-3">स्थानीय यातायात</div>
              <div className="text-sm text-stone-700 space-y-1">
                <div><strong>Ola/Uber outstation</strong> / <span className="font-hindi">सीमित उपलब्धता</span></div>
                <div><strong>Local taxi, bus</strong> / <span className="font-hindi">ऑटो/रिक्शा खूब मिलेंगे</span></div>
                <div className="text-xs mt-3 italic">
                  Family cars available for pickup from station and airport.<br />
                  <span className="font-hindi">कार्यक्रमों के बीच आने-जाने के लिए परिवार की गाड़ियाँ उपलब्ध हैं।</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ GALLERY ================ */}
      <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#FDF6E9] to-rose-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-hindi text-amber-700 text-sm mb-3">॥ चित्र वीथिका ॥</div>
            <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">Gallery</h2>
            <p className="font-hindi text-stone-700 mt-3">शादी-पूर्व क्षण एवं यादें</p>
            <p className="font-serif-display text-stone-600 mt-1">Pre-wedding moments &amp; memories</p>
          </div>

          {/* Placeholder gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-amber-100 via-rose-100 to-orange-100 border border-amber-200 flex items-center justify-center text-4xl hover:scale-105 transition cursor-pointer shadow-sm"
                style={{ transform: i % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
              >
                {['💑', '🌸', '💍', '🎉', '🪔', '💐', '🌼', '✨'][i]}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={PHOTO_UPLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-full font-deco text-sm tracking-widest shadow-md transition"
              >
                <Camera size={16} />
                UPLOAD YOUR PHOTOS / फ़ोटो अपलोड करें
              </a>
              <a
                href={PHOTO_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-amber-600 text-amber-900 hover:bg-amber-50 px-6 py-3 rounded-full font-deco text-sm tracking-widest transition"
              >
                VIEW ALL PHOTOS / सभी फ़ोटो देखें →
              </a>
            </div>
            <div className="max-w-md mx-auto">
              <p className="text-xs text-stone-600 font-serif-display italic">
                Click "Upload" to add your photos to our shared Google Drive folder.
              </p>
              <p className="text-xs text-stone-600 font-hindi italic mt-1">
                कृपया अपनी फ़ोटो हमारे Google Drive फ़ोल्डर में अपलोड करें।
              </p>
              <p className="text-xs text-stone-500 mt-2 font-serif-display">
                Also share on social media using <span className="font-semibold text-amber-800">{WEDDING.hashtag}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================ GIFTS / BLESSINGS ================ */}
      <section id="gifts" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-hindi text-amber-700 text-sm mb-3">॥ आशीर्वाद ॥</div>
            <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">Blessings</h2>
            <p className="font-hindi text-stone-700 mt-3">आपकी उपस्थिति ही हमारे लिए सबसे बड़ा उपहार है</p>
            <p className="font-serif-display text-stone-600 mt-1">
              Your presence is the greatest gift. But if you wish to bless us further...
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 border-2 border-rose-200 rounded-2xl p-8 text-center shadow-sm">
              <Heart size={36} className="text-rose-700 mx-auto mb-4" fill="currentColor" />
              <h3 className="font-deco text-lg tracking-widest text-red-900 mb-1">DIGITAL BLESSINGS</h3>
              <div className="font-hindi text-sm text-amber-800 mb-4">डिजिटल आशीर्वाद</div>
              <p className="text-sm text-stone-700 mb-2">Leave a wish in our RSVP form — we'll read each one ❤️</p>
              <p className="font-hindi text-sm text-stone-600 mb-4">हमारे RSVP form में अपना आशीर्वाद छोड़ें — हम हर एक को पढ़ेंगे ❤️</p>
              <button
                onClick={() => scrollTo('rsvp')}
                className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-full font-deco text-sm tracking-widest shadow-md transition mt-2"
              >
                LEAVE A BLESSING →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================ LIVE UPDATES ================ */}
      <section id="updates" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-rose-50/30 to-[#FDF6E9]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-hindi text-amber-700 text-sm mb-3">॥ ताज़ा सूचना ॥</div>
            <h2 className="font-script text-5xl sm:text-6xl text-red-900 mb-2">Live Updates</h2>
            <p className="font-hindi text-stone-700 mt-3">शादी सप्ताह की ताज़ा घोषणाएँ</p>
            <p className="font-serif-display text-stone-600 mt-1">
              Real-time announcements during the wedding week
            </p>
          </div>

          <div className="space-y-3">
            {liveUpdates.map((u) => (
              <div
                key={u.id}
                className={`border-l-4 rounded-r-lg p-4 shadow-sm ${
                  u.type === 'rsvp'
                    ? 'border-emerald-500 bg-emerald-50'
                    : u.type === 'alert'
                    ? 'border-red-500 bg-red-50'
                    : 'border-amber-500 bg-amber-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Bell size={16} className="mt-1 flex-shrink-0 text-amber-700" />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-deco text-sm tracking-widest text-stone-800">{u.title.toUpperCase()}</h4>
                      <span className="text-xs text-stone-500">{u.time}</span>
                    </div>
                    <p className="text-sm text-stone-700 mt-1 font-serif-display">{u.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-stone-600 font-serif-display italic">
            Updates posted by family during the wedding week. Keep this page bookmarked!
            <br />
            <span className="font-hindi not-italic">शादी सप्ताह के दौरान परिवार द्वारा अद्यतन। इस पेज को सहेज कर रखें!</span>
          </div>

          {/* Emergency contacts */}
          <div className="mt-10 bg-white border-2 border-red-200 rounded-2xl p-6">
            <h3 className="font-deco text-sm tracking-widest text-red-900 mb-1 text-center">🚨 EMERGENCY CONTACTS</h3>
            <div className="font-hindi text-xs text-amber-800 text-center mb-4">आपातकालीन सम्पर्क</div>
            <div className="space-y-3">
              {WEDDING.contacts.map((c, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-amber-100 last:border-0 pb-2 last:pb-0">
                  <div>
                    <div className="font-semibold text-stone-800">{c.name}</div>
                    <div className="text-xs text-amber-700 font-deco tracking-wide">{c.role.toUpperCase()}</div>
                  </div>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, '')}`}
                    className="font-mono text-sm text-red-800 hover:underline flex items-center gap-1"
                  >
                    <Phone size={14} /> {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================ FOOTER ================ */}
      <footer className="bg-gradient-to-b from-[#FDF6E9] to-red-900 text-amber-100 py-12 px-4 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-script text-4xl gold-shimmer mb-2">
            {WEDDING.bride.nameEn} &amp; {WEDDING.groom.nameEn}
          </div>
          <div className="font-deco text-sm tracking-widest text-amber-300 mb-6">
            19 · 06 · 2026 · PATNA
          </div>
          <div className="font-hindi text-amber-200 text-sm mb-6">
            ॥ आपकी स्नेहिल उपस्थिति ही हमारे लिए सबसे बड़ा उपहार है ॥
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <Heart size={16} className="text-amber-300" fill="currentColor" />
          </div>
          <p className="text-xs text-amber-300/80 font-serif-display">
            Made with love by the Singh family · {WEDDING.hashtag}
          </p>
          <p className="font-hindi text-xs text-amber-300/80 mt-1">
            सिंह परिवार द्वारा प्रेम से निर्मित
          </p>
        </div>
        <div className="marigold-border h-2 mt-12 -mx-4" />
      </footer>
    </div>
  );
}
