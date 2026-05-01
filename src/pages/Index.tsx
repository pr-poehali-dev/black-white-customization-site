import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_LOGO = "https://cdn.poehali.dev/projects/c3556d7a-0a92-41ba-b35e-bb5913447bb6/bucket/b4ea926f-ba05-4fe4-9c09-a7dfb5dbc07f.jpeg";
const IMG_SNEAKERS = "https://cdn.poehali.dev/projects/c3556d7a-0a92-41ba-b35e-bb5913447bb6/files/8c28422c-befd-487f-ba09-d943a60eb468.jpg";
const IMG_JACKET = "https://cdn.poehali.dev/projects/c3556d7a-0a92-41ba-b35e-bb5913447bb6/files/122575cb-6df9-4ce9-9f1c-c18c447de57e.jpg";
const IMG_FLATLAY = "https://cdn.poehali.dev/projects/c3556d7a-0a92-41ba-b35e-bb5913447bb6/files/da4e5428-8d80-4341-a5c5-b3c457122058.jpg";

const services = [
  { num: "01", title: "Роспись одежды", desc: "Куртки, худи, джинсы — превращаем в холст. Акрил, маркеры, аэрозоль. Ваш эскиз или наш." },
  { num: "02", title: "Кастом обуви", desc: "Кроссовки, ботинки, кеды. Перекрашиваем, расписываем, реставрируем. Тинта держится годами." },
  { num: "03", title: "Аксессуары", desc: "Сумки, рюкзаки, кепки, ремни. Всё, что носишь — может стать уникальным." },
  { num: "04", title: "Ребрендинг вещей", desc: "Старая любимая вещь потеряла вид? Перекроим, перекрасим, вернём к жизни — и лучше прежнего." },
];

const reviews = [
  {
    name: "Маша К.",
    city: "Москва",
    text: "Принесла старые Converse — вернула произведение искусства. Ребята слушают и делают именно то, что хочешь, не навязывают своё.",
    item: "Роспись кроссовок",
  },
  {
    name: "Дима Г.",
    city: "Санкт-Петербург",
    text: "Заказывал кастом на куртку — дали на выбор три варианта эскиза. В итоге сделали микс из двух. Полный кайф.",
    item: "Роспись куртки",
  },
  {
    name: "Аня В.",
    city: "Казань",
    text: "Перекройка — это не просто мастерская, это люди с головой. Сумка выглядит лучше, чем когда я её купила.",
    item: "Кастом сумки",
  },
  {
    name: "Игорь С.",
    city: "Москва",
    text: "Третий заказ подряд. Каждый раз — что-то новое, что-то лучшее. Сроки соблюдают, цены честные.",
    item: "Ребрендинг кепки",
  },
];

const works = [
  { img: IMG_SNEAKERS, tag: "Обувь", title: "Air Force × граффити", client: "Алексей, 24" },
  { img: IMG_JACKET, tag: "Одежда", title: "Байкерская куртка", client: "Светлана, 31" },
  { img: IMG_FLATLAY, tag: "Аксессуары", title: "Коллаборация для бренда", client: "@brand_x" },
];

export default function Index() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    const over = () => cursorRef.current?.classList.add("hovered");
    const out = () => cursorRef.current?.classList.remove("hovered");

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .hoverable").forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => window.removeEventListener("mousemove", move);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Кастомный курсор */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <button onClick={() => scrollTo("hero")} className="flex items-center">
          <img src={IMG_LOGO} alt="ПЕРЕКРОЙКА" className="h-10 w-auto" style={{filter:'invert(1)', mixBlendMode:'normal'}} />
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[["services","Услуги"],["about","О студии"],["works","Работы"],["reviews","Отзывы"],["contacts","Контакты"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-oswald text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">
              {label}
            </button>
          ))}
          <button onClick={() => scrollTo("order")} className="btn-invert text-sm">
            Заказать
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8">
          {[["hero","Главная"],["services","Услуги"],["about","О студии"],["works","Работы"],["reviews","Отзывы"],["contacts","Контакты"],["order","Заказать"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-caveat text-4xl font-semibold tracking-wide hover:text-white/60 transition-colors">
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img src={IMG_JACKET} alt="" className="w-full h-full object-cover opacity-20 scale-105" style={{filter:'grayscale(100%)'}} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <p className="line-num mb-6 animate-fade-up opacity-0">// студия кастомизации — Москва</p>
          <h1 className="font-caveat text-[clamp(4rem,12vw,10rem)] leading-[0.92] font-bold tracking-tight animate-fade-up opacity-0 delay-100">
            Твоя<br/>вещь.<br/>Твой<br/>язык.
          </h1>
          <p className="mt-8 font-oswald text-white/60 text-sm tracking-widest uppercase max-w-md animate-fade-up opacity-0 delay-300">
            Мы не делаем одинаковых вещей.<br/>Мы перекраиваем под тебя — буквально.
          </p>
          <div className="flex flex-wrap gap-4 mt-12 animate-fade-up opacity-0 delay-400">
            <button onClick={() => scrollTo("order")} className="btn-invert">Сделать заказ</button>
            <button onClick={() => scrollTo("works")} className="btn-outline">Смотреть работы</button>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 animate-fade-in opacity-0 delay-600">
          <span className="line-num rotate-90 origin-center">скролл</span>
          <div className="w-px h-16 bg-white/20" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/10 py-4 bg-[#111]">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill("ПЕРЕКРОЙКА · КАСТОМ · РОСПИСЬ · УНИКАЛЬНЫЕ ВЕЩИ · ").map((t, i) => (
            <span key={i} className="font-oswald text-xs tracking-widest uppercase text-white/30 mx-8">{t}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <h2 className="font-caveat text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
            Что мы умеем
          </h2>
          <p className="line-num hidden md:block">/ 04 услуги</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {services.map((s) => (
            <div key={s.num} className="hoverable border border-white/10 p-8 md:p-10 card-hover cursor-none group">
              <div className="flex items-start justify-between mb-6">
                <span className="line-num">{s.num}</span>
                <Icon name="ArrowUpRight" size={16} className="text-white/20 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-caveat text-3xl md:text-4xl font-bold mb-4">{s.title}</h3>
              <p className="font-oswald text-sm text-white/50 leading-relaxed tracking-wide">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 md:px-12 py-24 md:py-32 bg-white text-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-xs text-black/40 mb-6 tracking-widest">// о студии</p>
            <h2 className="font-caveat text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight mb-8">
              Мы не мастерская.<br/>Мы — соавторы.
            </h2>
            <p className="font-oswald text-sm text-black/60 leading-relaxed tracking-wide mb-6">
              Перекройка — студия, где каждый заказ начинается с разговора. Мы не рисуем по шаблону и не ставим поток. Три мастера, честные сроки, работа руками.
            </p>
            <p className="font-oswald text-sm text-black/60 leading-relaxed tracking-wide mb-10">
              С 2019 года мы сделали больше 800 уникальных работ. Ни одна не повторяется. Потому что вы — разные.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
              {[["800+","работ"],["5 лет","опыта"],["3","мастера"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-caveat text-4xl font-bold">{val}</div>
                  <div className="font-mono text-xs text-black/40 tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={IMG_SNEAKERS} alt="Работа студии" className="w-full aspect-[4/5] object-cover img-hover" style={{filter:'grayscale(100%)'}} />
            <div className="absolute -bottom-4 -left-4 bg-black text-white px-6 py-4">
              <p className="font-oswald text-xs tracking-widest uppercase">Москва, Арма</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <h2 className="font-caveat text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
            Примеры проектов
          </h2>
          <p className="line-num hidden md:block">/ избранное</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {works.map((w) => (
            <div key={w.title} className="hoverable bg-[#0a0a0a] group cursor-none overflow-hidden">
              <div className="overflow-hidden">
                <img src={w.img} alt={w.title} className="w-full aspect-[4/5] object-cover img-hover" style={{filter:'grayscale(100%)'}} />
              </div>
              <div className="p-6 border-t border-white/10">
                <p className="line-num mb-2">{w.tag}</p>
                <h3 className="font-caveat text-2xl font-bold mb-1">{w.title}</h3>
                <p className="font-mono text-xs text-white/30">{w.client}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-6 md:px-12 py-24 md:py-32 bg-[#111]">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <h2 className="font-caveat text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
            Говорят клиенты
          </h2>
          <p className="line-num hidden md:block">/ {reviews.length} отзыва</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {reviews.map((r) => (
            <div key={r.name} className="hoverable bg-[#111] p-8 md:p-10 card-hover cursor-none">
              <p className="font-caveat text-xl md:text-2xl font-semibold leading-relaxed mb-8 text-white/90">
                «{r.text}»
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div>
                  <p className="font-oswald text-sm tracking-widest">{r.name}</p>
                  <p className="line-num mt-1">{r.city}</p>
                </div>
                <span className="font-mono text-xs text-white/30 border border-white/10 px-3 py-1">{r.item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_FLATLAY} alt="" className="w-full h-full object-cover opacity-10" style={{filter:'grayscale(100%)'}} />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="line-num mb-6">// форма заказа</p>
          <h2 className="font-caveat text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-12">
            Расскажи что хочешь перекроить
          </h2>
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Имя"
                className="bg-transparent border border-white/20 px-5 py-4 font-oswald text-sm tracking-widest placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="bg-transparent border border-white/20 px-5 py-4 font-oswald text-sm tracking-widest placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
              />
            </div>
            <select className="bg-transparent border border-white/20 px-5 py-4 font-oswald text-sm tracking-widest text-white/60 focus:outline-none focus:border-white/60 transition-colors appearance-none">
              <option value="" className="bg-[#111]">Тип заказа</option>
              <option value="clothes" className="bg-[#111]">Роспись одежды</option>
              <option value="shoes" className="bg-[#111]">Кастом обуви</option>
              <option value="acc" className="bg-[#111]">Аксессуары</option>
              <option value="rebrand" className="bg-[#111]">Ребрендинг вещи</option>
            </select>
            <textarea
              placeholder="Опиши идею — или просто скажи что есть и что хочешь получить"
              rows={5}
              className="bg-transparent border border-white/20 px-5 py-4 font-oswald text-sm tracking-widest placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors resize-none"
            />
            <button type="submit" className="btn-invert self-start mt-4">
              Отправить заявку
            </button>
          </form>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="px-6 md:px-12 py-24 md:py-32 bg-white text-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-xs text-black/40 mb-6 tracking-widest">// контакты</p>
            <h2 className="font-caveat text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight mb-12">
              Приходи.<br/>Покажи.<br/>Обсудим.
            </h2>
            <div className="space-y-6">
              {[
                ["Адрес", "Москва, ул. Нижняя Сыромятническая, 10, Арма"],
                ["Часы работы", "Пн–Пт: 12:00–20:00 · Сб: 12:00–18:00"],
                ["Телефон", "+7 (999) 000-00-00"],
                ["Email", "hello@perekroika.ru"],
              ].map(([label, val]) => (
                <div key={label} className="border-b border-black/10 pb-6">
                  <p className="font-mono text-xs text-black/40 tracking-widest mb-2">{label}</p>
                  <p className="font-oswald text-sm tracking-wide">{val}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs text-black/40 mb-6 tracking-widest">// соцсети</p>
              <div className="space-y-4">
                {[["Instagram", "@perekroika.studio"],["Telegram", "@perekroika"],["VK", "vk.com/perekroika"]].map(([net, handle]) => (
                  <div key={net} className="flex items-center justify-between border-b border-black/10 pb-4 hoverable cursor-none group">
                    <span className="font-oswald text-sm tracking-widest">{net}</span>
                    <span className="font-mono text-xs text-black/40 group-hover:text-black transition-colors">{handle}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <button onClick={() => scrollTo("order")} className="w-full bg-black text-white font-oswald text-sm tracking-widest uppercase py-5 hover:bg-black/80 transition-colors">
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={IMG_LOGO} alt="ПЕРЕКРОЙКА" className="h-8 w-auto" style={{filter:'invert(1)'}} />
        <p className="line-num">© 2024 — Студия кастомизации</p>
        <p className="line-num">Сделано с характером</p>
      </footer>
    </div>
  );
}