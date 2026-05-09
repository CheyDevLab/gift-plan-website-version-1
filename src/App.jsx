import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const currency = "INR";
const supabaseUrl = "https://mdpdmmrwvdlypxrowrkk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcGRtbXJ3dmRseXB4cm93cmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNjk1OTgsImV4cCI6MjA5Mzg0NTU5OH0.jGPNK-QQUYnS2-_Udm-D4SFsKhecoWW52o0QrSSdqVI";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const rawGifts = [
  [1, "BMW Motorsport Caven 2.0 Sneakers", "Buy", 6999, "Style / Clothes / Accessories", "https://in.puma.com/in/en/pd/bmw-motorsport-caven-2-0-sneakers/309174", "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/309174/01/sv01/fnd/IND/fmt/png/BMW-M-Motorsport-Caven-2.0-Sneakers", "PUMA x BMW", ["shoes", "style", "motorsport"], 5, "He literally asked for this. Clean sneakers + motorsport = perfect pick."],
  [2, "MAD MAX Spankers T-Shirt", "Buy", 1190, "Style / Clothes / Accessories", "https://spankersindia.com/products/mad-max", "https://spankersindia.com/cdn/shop/files/with_out_background_e8f06b28-5fab-4f61-96f8-493d5427c98d.png?v=1769170668&width=990", "SPANKERS.india", ["clothes", "t-shirt", "style"], 5, "He asked for this specifically. Bold tee, strong style pick."],
  [3, "Mark Unisex Acid Washed Oversized Tee", "Buy", 1199, "Style / Clothes / Accessories", "https://discovered.co.in/products/mark-unisex-acid-washed-oversized-tee?variant=51122609258798", "https://discovered.co.in/cdn/shop/files/6_1b092f01-5b57-4e64-b0a4-bcd30e8563c5.jpg?v=1762267804&width=1200", "discovered", ["clothes", "oversized tee", "style"], 5, "He asked for this specifically. Oversized, acid-washed, and easy to actually wear."],
  [4, "Armure Ear Cuff", "Buy", 360, "Style / Clothes / Accessories", "https://spoiledduckie.co.in/product/aegis/", "https://spoiledduckie.co.in/wp-content/uploads/2025/01/pixelcut_11-17.jpg", "spoiledduckie", ["accessories", "ear cuff", "style"], 5, "He asked for accessories specifically. Small, stylish, and budget-friendly."],
  [5, "Gym Tank Tops", "Buy", 900, "Gym / Fitness", "https://broncopolos.com/shop/category/men/tank-tops/", "https://broncopolos.com/images/spider-black-tank-for-men/540/1526.jpg", "broncopolos", ["gym", "clothes"], 5, "Gym tank tops. Price: one for 449 and 4 for 900. Great for his fitness side."],
  [6, "RC Jet Fighter", "Buy", 1499, "Cars / F1 / Toys", "https://viaanakidsstore.com/products/rc-jet-fighter-2-4ghz-360-stunt", "https://viaanakidsstore.com/cdn/shop/files/AD7714D5-4006-4CBC-88C6-3A5D7C3DC099.jpg?v=1774865213", "viaanakidsstore", ["toys", "rc"], 4.8, "Fun, flashy and very him."],
  [7, "Accessories & Rings", "Buy", 199, "Style / Clothes / Accessories", "https://cosmora.in/collections/under-199", "https://cosmora.in/cdn/shop/files/rn-image_picker_lib_temp_9ce3cee9-9aea-460e-b3cd-f925307b10f8.jpg?v=1770983713&width=720", "cosmora", ["accessories", "rings"], 4.5, "Under 199 accessories and rings. He loves accessories, so this is a nice add-on gift."],
  [8, "F1 Mini RC Car", "Buy", 1299, "Cars / F1 / Toys", "https://viaanakidsstore.com/products/trasped-1-64-2-4ghz-mini-r-c-speed-regulating-alloy-model-car", "https://viaanakidsstore.com/cdn/shop/files/AB4E435E-F913-4B5F-9FC7-BFEE1F53E8FE.jpg?v=1775367702", "viaanakidsstore", ["rc car", "f1", "toys"], 5, "F1 + RC = perfect combo."],
  [9, "Retro Game Box", "Buy", 1999, "Gaming / PC Nerd", "https://playretro.shop/products/extreme-mini-retro-game-box", "https://playretro.shop/cdn/shop/files/BlackYellowModernProductInstagramPost_35.png?v=1697056361&width=1346", "playretro", ["gaming", "retro"], 3.5, "Nostalgic gaming gift. Fun, but not the highest priority."],
  [10, "Gimi Michi Korean Kimchi Ramen Experience Box", "Buy", 339, "Food / Comfort Gifts", "https://amzn.in/d/03WTKfq7", "https://m.media-amazon.com/images/I/71yktt2iQqL._SX679_PIbundle-4,TopRight,0,0_AA679SH20_.jpg", "Amazon - Gimi Michi", ["ramen", "food"], 4, "Korean kimchi ramen experience box. Good food gift if he wants ramen/noodles."],
  [11, "Miniature Glow Duck Assorted Toy", "Buy", 25, "Other niche interests", "https://dawbu.com/products/miniature-glow-duck", "https://dawbu.com/cdn/shop/files/4qcu4r4qcu4r4_ada7a364-2a39-4069-88e1-8a71bdae054d.webp?v=1777995045&width=990", "dawbu", ["duck", "toys", "decor"], 5, "Tiny glow duck. He wants a pet call duck and loves ducks, so this is a perfect silly add-on."],
  [12, "Miniature Glow Cute Duck", "Buy", 30, "Other niche interests", "https://dawbu.com/products/miniature-glow-cute-duck-1pc", "https://dawbu.com/cdn/shop/files/Gemini_Generated_Image_xs45mtxs45mtxs45.webp?v=1771950949&width=990", "dawbu", ["duck", "toys", "decor"], 5, "Cute tiny duck decor/toy. Perfect because he loves ducks and wants a pet call duck."],
  [13, "Shin Ramyun", "Buy", 620, "Food / Comfort Gifts", "https://amzn.in/d/02XFiNXM", "https://m.media-amazon.com/images/I/511-S1Xi27L._PIbundle-5,TopRight,0,0_SX493SY506SH20_.jpg", "Amazon", ["ramen", "food"], 4, "Shin Ramyun pack. He has wanted to try this for a long time."],
  [14, "Korean Buldak Ramen Pack of 3", "Buy", 379, "Food / Comfort Gifts", "https://amzn.in/d/08AzzUzN", "https://m.media-amazon.com/images/I/511zvzVLJDL._PIbundle-3,TopRight,0,0_SX500SY430SH20_.jpg", "Amazon", ["ramen", "food"], 4, "Buldak ramen pack of 3. It is his fav ramen style, so this is a strong food pick."],
  [15, "ON Whey Protein Double Rich Chocolate Sachets", "Buy", 799, "Gym / Fitness", "https://www.optimumnutrition.co.in/products/gold-standard-100-whey-protein-powder-double-rich-chocolate-1116202?_pos=8&_sid=bdebdde18&_ss=r", "https://www.optimumnutrition.co.in/cdn/shop/files/748927967913_1.jpg?v=1775554936&width=1646", "optimumnutrition", ["protein powder", "gym"], 5, "Double Rich Chocolate whey protein sachets. Useful for gym and protein shakes."],
  [16, "MuscleBlaze Protein Powders", "Buy", 2000, "Gym / Fitness", "https://www.muscleblaze.com/sale/fitness-essentials", "https://img4.hkrtcdn.com/cdn-cgi/image/width=160,height=160,dpr=2/35591/prd_3559023-MuscleBlaze-Biozyme-IsoZero-4.4-lb-Low-Carb-Ice-Cream-Chocolate_o.jpg", "muscle blaze", ["protein powder", "gym"], 5, "Protein powders range. He has used MuscleBlaze before, including 2kg and combo packs, so this is a strong gym pick."],
  [17, "Portable Tripod Stand", "Buy", 899, "Other niche interests", "https://amzn.in/d/0daWdkmo", "https://m.media-amazon.com/images/I/61+dLLVTZXL._SX679_.jpg", "Amazon", ["photography", "useful"], 4, "Useful for clicking gym pump pictures, photos and videos without asking someone every time."],
  [18, "Men's Grooming / Self Care Session", "Buy", 1499, "Skincare / Self Care", "https://www.urbancompany.com/cart?city=city_hyderabad_v2&category=mens_grooming", "https://www.urbancompany.com/img?bucket=urbanclap-prod&quality=90&format=auto/w_128,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1680593623082-c90199.jpeg", "urban company", ["self care", "spa", "relaxation"], 5, "Grooming, haircare, facial or massage plan. Useful, relaxing and feels premium."],
  [19, "Dual Tip Markers Sketch Pens", "Buy", 99, "Drawing / Creative", "https://amzn.in/d/08wa0H3C", "https://m.media-amazon.com/images/I/71rgMu4KahL._SX679_.jpg", "Amazon", ["painting", "drawing", "coloring"], 5, "Affordable creative gift for drawing, coloring, doodling and getting back into hobbies."],
  [20, "Acrylic Color Paints Set", "Buy", 182, "Drawing / Creative", "https://dl.flipkart.com/s/Cc7VBUNNNN", "https://rukminim2.flixcart.com/image/2880/2880/xif0q/shopsy-paint/5/v/p/12-6-artist-acrylic-colors-set-12-shades-6-ml-each-professional-original-imagr4trph666fm2.jpeg?q=90", "Flipkart", ["painting", "drawing", "hobbies"], 5, "Acrylic paints set for painting, drawing and creative hobby comeback."],
  [21, "Painting Brush Set", "Buy", 99, "Drawing / Creative", "https://dl.flipkart.com/s/dfUZiVuuuN", "https://rukminim2.flixcart.com/image/2880/2880/xif0q/paint-brush/k/a/m/premium-handmade-artist-painting-brushes-for-acrylic-watercolor-original-imahmnd9r8rchfxh.jpeg?q=90", "Flipkart", ["painting", "drawing", "hobbies"], 5, "Brush set to pair with paints, sketchbooks and creative gifts."],
  [22, "Mobile Holder", "Buy", 79, "Other niche interests", "https://amzn.in/d/0anPNxCi", "https://m.media-amazon.com/images/I/616MiTrXBpL._SX679_.jpg", "Amazon", ["useful"], 4, "Small useful gift. He needs this, so it works as a practical add-on."],
  [23, "Set Him Up On A Date", "Handmade", 0, "Sports / Experiences", "", "", "experience gift", ["experience", "friends"], 4, "A funny, bold experience gift: help set him up on a date if he is comfortable with it."],
  [24, "Late Night Car Ride", "Handmade", 0, "Sports / Experiences", "", "", "experience gift", ["experience", "cars", "memories"], 5, "A proper late-night car ride with music, food stops and birthday memories."],
  [25, "Try Something New Day", "Handmade", 0, "Sports / Experiences", "", "", "experience gift", ["experience", "friends"], 4, "Plan any new experience he has not tried before: activity, food place, arcade, bowling, go-karting or something random."],
  [26, "Group Contribution Fund", "Contribution", 0, "Contribution", "", "", "group fund", ["contribution"], 5, "Contribute any amount toward bigger gifts, party expenses, experiences, or the 23-gift series."]
];

const gifts = rawGifts.map(([id, name, type, budget, interest, link, image, store, tags, liking, description]) => ({ id, name, type, budget, interest, link, image, store, tags, liking, description }));
const groups = ["Style / Clothes / Accessories", "Cars / F1 / Toys", "Room Decor / Gaming Setup", "Gym / Fitness", "Drawing / Creative", "Anime / Superheroes", "Sports / Experiences", "Gaming / PC Nerd", "Food / Comfort Gifts", "Skincare / Self Care", "Other niche interests", "Contribution"];
const budgetOptions = [["All", "all"], ["Free", "0"], ["< INR 500", "500"], ["< INR 1000", "1000"], ["< INR 2000", "2000"], ["< INR 5000", "5000"], ["< INR 8000", "8000"]];
const typeOptions = ["all", "Handmade", "Buy", "Contribution", "Gift Card"];
const likes = ["Cars, bikes, F1, Mercedes F1 dream-car energy, Max, Kimi, Antonelli", "Invincible, Blue Lock, Dragon Ball Z / Goku, Spider-Man", "Good shoes, good clothes, jewelry and accessories", "Gym, protein shakes, useful fitness stuff", "Tron-style room decor, LED lights, infinity mirror, gaming setup aesthetic", "Drawing, doodling, locked sketchbook, alcohol markers", "Badminton, basketball, bowling, table tennis, carrom, chess, Rubik's cube", "Video games, Valorant skins, PC hardware, Linux curiosity", "RC cars, toys he can flex, LEGO/F1 builds", "Pets: cats, call duck, spider-level random chaos", "Memes, humor, inside jokes", "Food/experiences: manchuria, fried rice, bowling, go-karting, arcade with friends"];
const wraps = [["classic", "Classic wrap", "Brown paper, ribbon, handwritten tag.", 40, "BOX"], ["premium", "Premium wrap", "Dark paper, gold accents, clean finish.", 80, "GIFT"], ["memory", "Memory wrap", "Tiny notes, doodles, and messages outside.", 100, "NOTE"], ["chaos", "Chaotic friends wrap", "Stickers, inside jokes, doodles, and full friend-group energy.", 120, "STAR"]].map(([id, title, description, price, icon]) => ({ id, title, description, price, icon }));

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value) {
  return `${currency} ${toNumber(value).toLocaleString("en-IN")}`;
}

function filterGifts(list, budget, type) {
  return list.filter((gift) => (budget === "all" || gift.budget <= Number(budget)) && (type === "all" || gift.type === type));
}

function sumTotal(list, wrap, delivery) {
  return list.reduce((sum, gift) => sum + toNumber(gift.budget), 0) + toNumber(wrap) + toNumber(delivery);
}

function stars(value) {
  return "⭐".repeat(Math.max(1, Math.round(Number(value || 0))));
}

const tests = [
  filterGifts(gifts, "all", "all").length === gifts.length,
  filterGifts(gifts, "500", "all").every((g) => g.budget <= 500),
  filterGifts(gifts, "all", "Contribution").every((g) => g.type === "Contribution"),
  sumTotal([{ budget: 100 }, { budget: 200 }], 40, 60) === 400,
  money(6999) === "INR 6,999",
  Boolean(gifts[0].image),
  Array.isArray(gifts[0].tags)
];

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl bg-white/85 shadow-md ${className}`}>{children}</div>;
}

function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <div className="relative mb-5 text-center">
          <button type="button" onClick={onClose} className="absolute right-0 top-0 rounded-full bg-slate-100 px-3 py-1 text-lg font-black text-slate-600">x</button>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">{title}</h2>
          {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Option({ active = false, title, description, onClick = () => {} }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-2xl border p-4 text-left transition ${active ? "border-pink-400 bg-pink-50 shadow-sm" : "border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/40"}`}>
      <p className="text-sm font-black text-slate-950">{title}</p>
      {description && <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>}
    </button>
  );
}

function FriendModal({ friend, setFriend, onSave, onClose, saving, error }) {
  return (
    <Modal title="Tell us who you are" subtitle="Required before selecting or submitting anything" onClose={onClose}>
      <div className="grid gap-4 text-sm">
        <input value={friend.name} onChange={(e) => setFriend({ ...friend, name: e.target.value })} placeholder="Your name (required)" className="rounded-2xl border border-slate-200 px-4 py-3" />
        <input value={friend.instagram} onChange={(e) => setFriend({ ...friend, instagram: e.target.value })} placeholder="Instagram ID (optional, useful)" className="rounded-2xl border border-slate-200 px-4 py-3" />
        <input value={friend.phone} onChange={(e) => setFriend({ ...friend, phone: e.target.value })} placeholder="Phone number (optional)" className="rounded-2xl border border-slate-200 px-4 py-3" />
        <input value={friend.relation} onChange={(e) => setFriend({ ...friend, relation: e.target.value })} placeholder="How do you know Abhinav?" className="rounded-2xl border border-slate-200 px-4 py-3" />
        {error && <p className="rounded-2xl bg-red-50 p-3 text-red-700">{error}</p>}
        <button type="button" onClick={onSave} disabled={saving} className="rounded-2xl bg-slate-950 px-5 py-4 font-black text-white disabled:opacity-60">{saving ? "Saving..." : "Save and continue"}</button>
      </div>
    </Modal>
  );
}

function GiftCard({ gift, selected, onToggle, compact = false }) {
  return (
    <Card className={`transition hover:-translate-y-1 hover:shadow-xl ${selected ? "ring-2 ring-pink-300" : ""}`}>
      <div className="flex h-full flex-col p-6">
        {gift.image && <img src={gift.image} alt={gift.name} className="mb-4 h-44 w-full rounded-2xl bg-slate-100 object-cover" />}
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500">{gift.store}</span>
          <span className="text-xs font-bold text-pink-600">{stars(gift.liking)}</span>
        </div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{gift.type}</span>
          <span className="text-sm font-bold text-slate-700">{gift.type === "Contribution" ? "Any amount" : money(gift.budget)}</span>
        </div>
        <h2 className="text-xl font-black">{gift.name}</h2>
        <div className="mt-2 flex flex-wrap gap-1">{gift.tags.map((tag) => <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-[10px]">{tag}</span>)}</div>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{gift.description}</p>
        <div className="mt-5 grid gap-2">
          <button type="button" onClick={() => onToggle(gift)} className={`rounded-2xl px-4 py-3 text-sm font-bold text-white ${selected ? "bg-pink-600" : "bg-slate-950"}`}>{selected ? "selected" : "select this gift"}</button>
          {gift.link ? <a href={gift.link} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700">{compact ? "open link" : "view product link"}</a> : <span className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-center text-xs font-semibold text-slate-400">idea-based gift, no fixed link</span>}
        </div>
      </div>
    </Card>
  );
}

function HeaderActions({ setIntro, setShowSubmit, setShowLikes, org }) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button type="button" onClick={() => setIntro(true)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow">open plan</button>
      <button type="button" onClick={() => setShowSubmit(true)} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow">submit a gift you are buying</button>
      <button type="button" onClick={() => setShowLikes(true)} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow">see things he likes</button>
      <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="rounded-2xl bg-pink-600 px-4 py-3 text-sm font-bold text-white shadow">take quick survey</a>
      <button type="button" onClick={org} className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-bold text-slate-950 shadow">join the org team</button>
    </div>
  );
}

function GiftSelector({ budget, setBudget, type, setType, view, setView, filtered, selected, toggle, setPage }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[150px_1fr]">
      <aside className="h-fit rounded-3xl bg-white/80 p-3 shadow-md lg:sticky lg:top-6">
        <h2 className="mb-3 text-sm font-black">Filters</h2>
        <label className="text-xs font-semibold text-slate-600">Budget<select value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs">{budgetOptions.map(([label, value]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="mt-3 block text-xs font-semibold text-slate-600">Type<select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs">{typeOptions.map((option) => <option key={option} value={option}>{option === "all" ? "All" : option}</option>)}</select></label>
      </aside>
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-3xl bg-white/70 p-3 shadow-sm">
          <button type="button" onClick={() => setView("grid")} className={`rounded-2xl px-4 py-2 text-xs font-black ${view === "grid" ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>grid view</button>
          <button type="button" onClick={() => setView("interest")} className={`rounded-2xl px-4 py-2 text-xs font-black ${view === "interest" ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>by interests</button>
          <p className="text-xs font-semibold text-slate-500">Grid is for browsing. Interests is for choosing based on what he likes.</p>
        </div>
        {view === "grid" && <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((gift) => <GiftCard key={gift.id} gift={gift} selected={selected.some((item) => item.id === gift.id)} onToggle={toggle} />)}</section>}
        {view === "interest" && <section className="grid gap-5">{groups.map((group) => { const items = filtered.filter((gift) => gift.interest === group); if (!items.length) return null; return <div key={group} className="rounded-[2rem] bg-white/85 p-5 shadow-md"><div className="mb-4 border-b border-slate-200 pb-3"><h2 className="text-2xl font-black text-slate-950">{group}</h2></div><div className="grid gap-3">{items.map((gift) => <GiftCard key={gift.id} gift={gift} selected={selected.some((item) => item.id === gift.id)} onToggle={toggle} compact />)}</div></div>; })}</section>}
        <div className="sticky bottom-5 mt-8 rounded-[2rem] bg-slate-950 p-4 text-white shadow-2xl"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-semibold">{selected.length === 0 ? "You can still preview checkout to see how it works." : `${selected.length} gift(s) selected.`}</p><button type="button" onClick={() => setPage("checkout")} className="rounded-2xl bg-pink-500 px-5 py-3 text-sm font-black text-white">{selected.length === 0 ? "Preview checkout" : "Continue to checkout"}</button></div></div>
      </div>
    </section>
  );
}

function Extras({ form, setForm, submit, suggestions, joinTeam, orgRef }) {
  return (
    <>
      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[2rem] bg-white/90 shadow-lg"><div className="p-6"><h2 className="text-2xl font-black">Drop your ideas</h2><p className="text-sm text-slate-500">Gift ideas, surprise ideas, party ideas, things he likes - anything useful goes here.</p><form onSubmit={submit} className="mt-5 grid gap-4"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-2xl border border-slate-200 px-4 py-3" /><input value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })} placeholder="Idea / thing he likes / party suggestion" className="rounded-2xl border border-slate-200 px-4 py-3" /><input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="Estimated budget, if any" className="rounded-2xl border border-slate-200 px-4 py-3" /><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Context, link, or why this could work" rows={4} className="rounded-2xl border border-slate-200 px-4 py-3" /><button type="submit" className="rounded-2xl bg-pink-600 px-4 py-4 text-base font-bold text-white">Submit idea</button></form>{suggestions.length > 0 && <div className="mt-6 rounded-3xl bg-slate-50 p-4"><p className="text-sm font-black text-slate-700">Recent ideas</p>{suggestions.slice(0, 3).map((suggestion) => <div key={suggestion.id} className="mt-2 rounded-2xl bg-white p-3 text-xs text-slate-600 shadow-sm"><strong>{suggestion.idea}</strong>{suggestion.name && <span> - {suggestion.name}</span>}</div>)}</div>}</div></Card>
        <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg"><h2 className="text-2xl font-black">Add your touch</h2><p className="mt-2 text-sm leading-6 text-slate-500">These are the things friends can submit so the surprise feels personal.</p>{["one word that describes him", "one memory with him", "something he always says", "a funny moment", "a birthday wish", "a gift or party idea"].map((item) => <div key={item} className="mt-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">{item}</div>)}<a href="https://forms.google.com" target="_blank" rel="noreferrer" className="mt-5 block rounded-2xl bg-slate-950 px-4 py-4 text-center text-sm font-bold text-white">open quick survey</a></div>
      </section>
      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1fr]">
        <div ref={orgRef} className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-lg"><h2 className="text-2xl font-black">JOIN THE ORGANIZING TEAM</h2><p className="mt-3 text-sm leading-6 text-slate-300">Want to be part of the chaos behind the scenes? We're putting the surprise, gifts, setup, and tiny details together.</p><p className="mt-3 text-sm leading-6 text-slate-300">Especially if you're in Hyderabad, this becomes way more fun and useful.</p><button type="button" onClick={joinTeam} className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950">I can help organize</button></div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-lg"><h2 className="text-2xl font-black">Wrapping ideas</h2><p className="mt-2 text-sm leading-6 text-slate-300">A few visual directions for gifts that need wrapping.</p><div className="mt-5 grid grid-cols-2 gap-3">{wraps.map((wrap) => <div key={wrap.id} className="overflow-hidden rounded-2xl bg-white/10"><div className="flex h-28 items-center justify-center bg-white/15 text-sm font-black">{wrap.icon}</div><div className="p-3"><p className="text-sm font-black text-white">{wrap.title} - {money(wrap.price)}</p><p className="mt-1 text-xs leading-5 text-slate-300">{wrap.description}</p></div></div>)}</div></div>
      </section>
    </>
  );
}

function Checkout({ selected, setPage, mode, setMode, contrib, contribution, setContribution, normal, wrapId, setWrapId, delivery, setDelivery, fromName, setFromName, message, setMessage, decisions, update, giftTotal, selectedWrap, handledTotal, confirmed, confirmPlan, org, saveError, savingPlan }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_330px]">
      <div className="grid gap-5">
        <Card className="bg-white/90"><div className="p-6"><button type="button" onClick={() => setPage("select")} className="mb-4 rounded-2xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">Back to gifts</button><h2 className="text-3xl font-black">Checkout plan</h2><p className="mt-2 text-sm leading-6 text-slate-500">First choose the overall handling style. You can keep it simple, ask us to handle everything, or customize each selected gift separately.</p></div></Card>
        {selected.length === 0 && <Card><div className="p-6 text-sm leading-6 text-slate-600"><p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">checkout preview</p><h3 className="mt-1 text-2xl font-black text-slate-950">Here's what happens after you pick gifts</h3><p className="mt-2">No gifts are selected yet. After selecting gifts, choose one route:</p><div className="mt-5 grid gap-3 lg:grid-cols-3"><div className="rounded-2xl bg-slate-100 p-4"><p className="font-black text-slate-950">1. Handle it yourself</p><p className="mt-1 text-xs leading-5 text-slate-500">We mark it chosen. You buy/manage it.</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="font-black text-slate-950">2. We handle it</p><p className="mt-1 text-xs leading-5 text-slate-500">We buy, wrap, and coordinate. You pay.</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="font-black text-slate-950">3. Custom</p><p className="mt-1 text-xs leading-5 text-slate-500">Decide separately for each item.</p></div></div><button type="button" onClick={() => setPage("select")} className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Go select gifts</button></div></Card>}
        {normal.length > 0 && <Card className="bg-white/95"><div className="p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">Before checkout</p><h3 className="mt-1 text-2xl font-black">How do you want to handle this?</h3><div className="mt-5 grid gap-3 lg:grid-cols-3"><Option active={mode === "self"} title="I'll handle everything myself" description="We'll mark it chosen. Please buy it or free it up if plans change." onClick={() => setMode("self")} /><Option active={mode === "handled"} title="You handle everything, I'll pay" description="We buy, wrap, coordinate. You cover gift, wrapping and delivery." onClick={() => setMode("handled")} /><Option active={mode === "custom"} title="Custom" description="Choose buying, gift mode and wrapping separately." onClick={() => setMode("custom")} /></div></div></Card>}
        {contrib && <Card className="bg-white/95"><div className="p-6"><h3 className="text-2xl font-black">{contrib.name}</h3><p className="text-sm leading-6 text-slate-600">Enter the amount you want to contribute. Since this is a contribution, you can skip buying, gift mode and wrapping.</p><input value={contribution} onChange={(e) => setContribution(e.target.value)} placeholder="INR amount" className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" /></div></Card>}
        {mode === "self" && normal.length > 0 && <Card className="bg-white/95"><div className="p-6"><h3 className="text-2xl font-black">You'll handle everything</h3><p className="mt-2 text-sm leading-6 text-slate-600">We'll mark these gifts as chosen and off the racks. Please buy them, or tell us early so someone else can.</p>{normal.map((gift) => <div key={gift.id} className="mt-3 rounded-2xl bg-slate-100 p-4"><p className="font-black text-slate-950">{gift.name}</p><p className="mt-1 text-xs leading-5 text-slate-500">Marked as chosen by you once confirmed.</p></div>)}</div></Card>}
        {mode === "handled" && normal.length > 0 && <Card className="bg-white/95"><div className="p-6"><h3 className="text-2xl font-black">We'll handle everything</h3><p className="mt-2 text-sm leading-6 text-slate-600">Choose a wrapping style, add delivery charges if any, and write the message.</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{wraps.map((wrap) => <button key={wrap.id} type="button" onClick={() => setWrapId(wrap.id)} className={`overflow-hidden rounded-2xl border text-left ${wrapId === wrap.id ? "border-pink-400 bg-pink-50" : "border-slate-200 bg-white"}`}><div className="flex h-28 items-center justify-center bg-slate-100 text-sm font-black">{wrap.icon}</div><div className="p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-black text-slate-950">{wrap.title}</p><p className="text-sm font-black text-pink-600">{money(wrap.price)}</p></div><p className="mt-1 text-xs leading-5 text-slate-500">{wrap.description}</p></div></button>)}</div><div className="mt-5 grid gap-4 sm:grid-cols-2"><input value={delivery} onChange={(e) => setDelivery(e.target.value)} placeholder="Delivery charges, if any" className="rounded-2xl border border-slate-200 bg-white px-4 py-3" /><input value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="From name / goofy signature" className="rounded-2xl border border-slate-200 bg-white px-4 py-3" /></div><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message to go with the gift" rows={4} className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" /></div></Card>}
        {mode === "custom" && normal.map((gift) => { const current = decisions[gift.id] || {}; return <Card key={gift.id} className="bg-white/95"><div className="p-6"><h3 className="text-2xl font-black">{gift.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{gift.description}</p><div className="mt-5 grid gap-5"><div><p className="mb-3 text-sm font-black">1. Who handles buying?</p><div className="grid gap-3 md:grid-cols-3"><Option active={current.buyMode === "self"} title="I'll buy it myself" onClick={() => update(gift.id, "buyMode", "self")} /><Option active={current.buyMode === "handled"} title="You buy it" onClick={() => update(gift.id, "buyMode", "handled")} /><Option active={current.buyMode === "reserve"} title="Reserve this for me" description="Claim now, buy later. Please buy it or free it up later." onClick={() => update(gift.id, "buyMode", "reserve")} /></div></div><div><p className="mb-3 text-sm font-black">2. How should this count?</p><div className="grid gap-3 md:grid-cols-2"><Option active={current.giftMode === "individual"} title="My individual gift" onClick={() => update(gift.id, "giftMode", "individual")} /><Option active={current.giftMode === "series"} title="Part of the 23 gifts" onClick={() => update(gift.id, "giftMode", "series")} /></div></div><div><p className="mb-3 text-sm font-black">3. Wrapping?</p><div className="grid gap-3 md:grid-cols-2"><Option active={current.wrapMode === "self"} title="I'll wrap it" onClick={() => update(gift.id, "wrapMode", "self")} /><Option active={current.wrapMode === "handled"} title="You wrap it" onClick={() => update(gift.id, "wrapMode", "handled")} /></div></div></div></div></Card>; })}
      </div>
      <aside className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl lg:sticky lg:top-6"><h2 className="text-2xl font-black">Summary</h2><div className="mt-5 space-y-4">{selected.length === 0 && <p className="text-sm text-slate-300">Nothing selected yet.</p>}{contrib && <div className="rounded-2xl bg-white/10 p-4"><p className="font-black">Contribution</p><p className="mt-1 text-sm text-slate-300">Amount: {contribution ? money(contribution) : "not entered yet"}</p></div>}{normal.length > 0 && mode && <div className="rounded-2xl bg-white/10 p-4"><p className="font-black">Checkout mode</p><p className="mt-1 text-sm text-slate-300">{mode === "self" ? "You handle everything yourself" : mode === "handled" ? "We handle everything, you pay" : "Custom per gift"}</p></div>}{mode === "handled" && normal.length > 0 && <div className="rounded-2xl bg-white/10 p-4"><p className="font-black">Handled total</p><p className="mt-2 text-xs leading-5 text-slate-300">Gifts: {money(giftTotal)}</p><p className="text-xs leading-5 text-slate-300">Wrapping: {selectedWrap ? `${money(selectedWrap.price)} (${selectedWrap.title})` : "not selected"}</p><p className="text-xs leading-5 text-slate-300">Delivery: {money(delivery)}</p><p className="mt-2 text-lg font-black text-white">Total: {money(handledTotal)}</p>{fromName && <p className="mt-2 text-xs leading-5 text-slate-300">From: {fromName}</p>}</div>}{mode === "self" && normal.map((gift) => <div key={gift.id} className="rounded-2xl bg-white/10 p-4"><p className="font-black">{gift.name}</p><p className="mt-1 text-xs leading-5 text-pink-200">Please buy it, or tell us so someone else gets the chance.</p></div>)}{mode === "custom" && normal.map((gift) => { const current = decisions[gift.id] || {}; return <div key={gift.id} className="rounded-2xl bg-white/10 p-4"><p className="font-black">{gift.name}</p><p className="mt-2 text-xs leading-5 text-slate-300">Buying: {current.buyMode || "not selected"}</p><p className="text-xs leading-5 text-slate-300">Gift mode: {current.giftMode || "not selected"}</p><p className="text-xs leading-5 text-slate-300">Wrapping: {current.wrapMode || "not selected"}</p></div>; })}</div>{confirmed && <div className="mt-6 rounded-2xl bg-pink-500/20 p-4 text-center"><p className="text-sm font-black">Plan locked in!</p><p className="mt-1 text-xs text-pink-100">Saved to the backend.</p><button type="button" onClick={org} className="mt-3 rounded-xl bg-white px-4 py-2 text-xs font-black text-slate-900">JOIN THE TEAM</button></div>}{saveError && <p className="mt-4 rounded-2xl bg-red-500/20 p-3 text-xs font-bold text-red-100">{saveError}</p>}<button type="button" onClick={confirmPlan} disabled={savingPlan} className="mt-6 w-full rounded-2xl bg-pink-500 px-5 py-4 text-sm font-black text-white disabled:opacity-60">{savingPlan ? "Saving plan..." : "Confirm my plan"}</button></aside>
    </section>
  );
}

export default function AbhinavsGiftPlan() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("select");
  const [budget, setBudget] = useState("all");
  const [type, setType] = useState("all");
  const [selected, setSelected] = useState([]);
  const [intro, setIntro] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState({ name: "", idea: "", budget: "", note: "" });
  const [decisions, setDecisions] = useState({});
  const [contribution, setContribution] = useState("");
  const [mode, setMode] = useState("");
  const [wrapId, setWrapId] = useState("");
  const [delivery, setDelivery] = useState("");
  const [message, setMessage] = useState("");
  const [fromName, setFromName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [view, setView] = useState("grid");
  const [friend, setFriend] = useState({ name: "", instagram: "", phone: "", relation: "" });
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [friendId, setFriendId] = useState(null);
  const [savingFriend, setSavingFriend] = useState(false);
  const [friendError, setFriendError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [savingPlan, setSavingPlan] = useState(false);
  const orgRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIntro(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => filterGifts(gifts, budget, type), [budget, type]);
  const contrib = selected.find((gift) => gift.type === "Contribution");
  const normal = selected.filter((gift) => gift.type !== "Contribution");
  const selectedWrap = wraps.find((wrap) => wrap.id === wrapId);
  const giftTotal = normal.reduce((sum, gift) => sum + gift.budget, 0);
  const handledTotal = sumTotal(normal, selectedWrap?.price || 0, delivery);
  const deliveryAmount = toNumber(delivery);

  const requireFriend = () => {
    if (!friendId) {
      setShowFriendForm(true);
      return false;
    }
    return true;
  };

  const saveFriend = async () => {
    if (!friend.name.trim()) {
      setFriendError("Name is required.");
      return;
    }
    setSavingFriend(true);
    setFriendError("");
    const { data, error } = await supabase.from("friends").insert({ name: friend.name.trim(), instagram: friend.instagram.trim(), phone: friend.phone.trim(), relation: friend.relation.trim() }).select("id").single();
    setSavingFriend(false);
    if (error) {
      setFriendError(error.message || "Could not save your details.");
      return;
    }
    setFriendId(data.id);
    setShowFriendForm(false);
  };

  const saveClaim = async (gift, status) => {
    if (!friendId) return;
    await supabase.from("gift_claims").insert({ friend_id: friendId, gift_id: gift.id, gift_name: gift.name, status });
  };

  const toggle = async (gift) => {
    if (!requireFriend()) return;
    const exists = selected.some((item) => item.id === gift.id);
    setSelected((current) => exists ? current.filter((item) => item.id !== gift.id) : [...current, gift]);
    if (!exists) await saveClaim(gift, "selected");
  };

  const update = (id, key, value) => setDecisions((current) => ({ ...current, [id]: { buyMode: "", giftMode: "", wrapMode: "", ...(current[id] || {}), [key]: value } }));
  const clear = () => { setSelected([]); setDecisions({}); setContribution(""); setMode(""); setWrapId(""); setDelivery(""); setMessage(""); setFromName(""); setConfirmed(false); };
  const org = () => { setPage("select"); setTimeout(() => orgRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80); };

  const submit = async (event) => {
    event.preventDefault();
    setSaveError("");
    if (!requireFriend()) return;
    if (!form.idea.trim()) {
      setSaveError("Please enter an idea before submitting.");
      return;
    }
    const payload = { friend_id: friendId, name: form.name || friend.name, idea: form.idea, budget: form.budget, note: form.note };
    const { error } = await supabase.from("suggestions").insert(payload);
    if (error) { setSaveError(error.message); return; }
    setSuggestions((current) => [{ id: Date.now(), ...form }, ...current]);
    setForm({ name: "", idea: "", budget: "", note: "" });
    setSaveError("Idea submitted successfully.");
  };

  const joinTeam = async () => {
    if (!requireFriend()) return;
    const { error } = await supabase.from("organizing_team").insert({ friend_id: friendId, message: "Wants to help organize Abhinav's birthday." });
    if (error) setSaveError(error.message);
    else setSaveError("Added to organizing team list.");
  };

  const confirmPlan = async () => {
    setSaveError("");
    if (!requireFriend()) return;
    if (selected.length === 0) {
      setSaveError("Please select at least one gift or contribution before confirming.");
      return;
    }
    setSavingPlan(true);
    const selected_gifts = selected.map((gift) => ({ id: gift.id, name: gift.name, price: gift.budget, type: gift.type }));
    const { error } = await supabase.from("checkout_plans").insert({
      friend_id: friendId,
      mode: mode || "not_selected",
      selected_gifts,
      decisions,
      contribution_amount: toNumber(contribution),
      wrap_id: wrapId || null,
      delivery: deliveryAmount,
      message,
      from_name: fromName,
      total: handledTotal
    });
    if (error) {
      setSavingPlan(false);
      setSaveError(error.message);
      return;
    }
    await Promise.all(selected.map((gift) => saveClaim(gift, "confirmed")));
    setSavingPlan(false);
    setConfirmed(true);
    setSaveError("Plan saved successfully.");
    setTimeout(() => setConfirmed(false), 3500);
  };

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white"><div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" /><div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" /><div className="relative max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur sm:p-10"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-200 text-3xl text-slate-950 shadow-lg">GIFT</div><p className="mb-3 text-sm uppercase tracking-[0.4em] text-pink-200">secret mission</p><h1 className="text-4xl font-black leading-tight sm:text-5xl">you've been added to a mission.</h1><div className="mt-8 space-y-3 text-lg text-slate-200"><p>target: abhinav's birthday</p><p>objective: make it unforgettable.</p></div><div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 animate-pulse rounded-full bg-pink-300" /></div></div></main>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 text-slate-900">
      {showFriendForm && <FriendModal friend={friend} setFriend={setFriend} onSave={saveFriend} onClose={() => setShowFriendForm(false)} saving={savingFriend} error={friendError} />}
      {intro && <Modal title="Heyyyy!" subtitle="Glad to have you on track :)" onClose={() => setIntro(false)}><div className="space-y-4 text-center text-sm leading-7 text-slate-700 sm:text-base"><p>Abhinav has been an amazing friend, a constant companion, and part of so many memories through the years. So this time, we're going all in!</p><p>The theme is simple: his past, present, and future.</p><p>The plan is a proper surprise party and a 23-gift series, because he's turning 23. The theme is just the vibe, not a rule.</p><div className="rounded-3xl bg-pink-50 p-5 text-left"><p className="font-black text-slate-950">How to use this website:</p><ol className="mt-3 list-decimal space-y-2 pl-5"><li>Browse gift ideas or browse by interests.</li><li>Select one or more gifts, like adding them to a cart.</li><li>Go to checkout and choose who buys, who wraps, and how the gift should count.</li><li>You can reserve a gift now and buy it later, so nobody else picks the same one.</li></ol></div><button type="button" onClick={() => setIntro(false)} className="mt-4 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white">LET'S GO!</button></div></Modal>}
      {showLikes && <Modal title="things abhinav likes" subtitle="use this if you're confused about what to pick" onClose={() => setShowLikes(false)}><div className="grid gap-3">{likes.map((like) => <div key={like} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">{like}</div>)}</div></Modal>}
      {showSubmit && <Modal title="submit a gift you are buying" subtitle="so we can keep the records clean" onClose={() => setShowSubmit(false)}><div className="space-y-5 text-sm leading-6 text-slate-600"><p>Use the suggestions section for now, or pick the closest gift and confirm the checkout plan.</p></div></Modal>}
      <button type="button" onClick={() => setIntro(true)} className="fixed bottom-5 right-5 z-40 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl">open plan</button>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-xl backdrop-blur"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><h1 className="text-4xl font-black tracking-tight sm:text-6xl">Abhinav&apos;s Gift Plan</h1><p className="mt-4 max-w-2xl text-lg text-slate-600">Browse gift ideas, select what feels right, then confirm the plan on the checkout page.</p><HeaderActions setIntro={setIntro} setShowSubmit={setShowSubmit} setShowLikes={setShowLikes} org={org} />{friendId && <p className="mt-4 text-sm font-bold text-green-700">Saved as {friend.name}</p>}{saveError && <p className="mt-4 rounded-2xl bg-white p-3 text-sm font-bold text-slate-700">{saveError}</p>}</div><div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg"><p className="text-sm uppercase tracking-[0.3em] text-slate-300">Theme</p><p className="mt-2 text-2xl font-bold">Past. Present. Future.</p><p className="mt-3 text-sm leading-6 text-slate-300">23 gifts for his 23rd birthday, celebrating the memories that made him, who he is today, and everything he's going to become.</p></div></div></div>
        {!tests.every(Boolean) && <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">Some internal checks are failing.</div>}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-3xl bg-white/70 p-3 shadow-sm"><button type="button" onClick={() => setPage("select")} className={`rounded-2xl px-5 py-3 text-sm font-black ${page === "select" ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>1. Select gifts</button><button type="button" onClick={() => setPage("checkout")} className={`rounded-2xl px-5 py-3 text-sm font-black ${page === "checkout" ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>2. Checkout plan ({selected.length})</button>{selected.length > 0 && <button type="button" onClick={clear} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-700">clear selections</button>}</div>
        {page === "select" && <><GiftSelector budget={budget} setBudget={setBudget} type={type} setType={setType} view={view} setView={setView} filtered={filtered} selected={selected} toggle={toggle} setPage={setPage} /><Extras form={form} setForm={setForm} submit={submit} suggestions={suggestions} joinTeam={joinTeam} orgRef={orgRef} /></>}
        {page === "checkout" && <Checkout selected={selected} setPage={setPage} mode={mode} setMode={setMode} contrib={contrib} contribution={contribution} setContribution={setContribution} normal={normal} wrapId={wrapId} setWrapId={setWrapId} delivery={delivery} setDelivery={setDelivery} fromName={fromName} setFromName={setFromName} message={message} setMessage={setMessage} decisions={decisions} update={update} giftTotal={giftTotal} selectedWrap={selectedWrap} handledTotal={handledTotal} confirmed={confirmed} confirmPlan={confirmPlan} org={org} saveError={saveError} savingPlan={savingPlan} />}
      </section>
    </main>
  );
}
