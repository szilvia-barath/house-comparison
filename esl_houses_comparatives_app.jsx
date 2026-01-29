// src/App.js
// Minimalist ESL React App for Comparative & Superlative Adjectives (B1-safe ordering)
// TailwindCSS required

import React, { useState } from "react";

// INLINE HOUSES DATA
const HOUSES = [
  { id: 1, name: "The Tiny House", state: "Oregon", description: "A small, wooden house on wheels.", imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000", attributes: { size: "small", age: "new", price: "cheap", comfort: "cozy", vibe: "minimalist" } },
  { id: 2, name: "The Hollywood Mansion", state: "California", description: "A massive luxury estate with a pool.", imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000", attributes: { size: "massive", age: "modern", price: "luxury", comfort: "luxurious", vibe: "extravagant" } },
  { id: 3, name: "The Malibu Beach House", state: "California", description: "A bright house right on the ocean sand.", imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000", attributes: { size: "medium", age: "modern", price: "expensive", comfort: "luxurious", vibe: "breezy" } },
  { id: 4, name: "The Mountain Cabin", state: "Montana", description: "A rustic home made of heavy logs.", imageUrl: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=1000", attributes: { size: "medium", age: "old", price: "affordable", comfort: "cozy", vibe: "rustic" } },
  { id: 5, name: "The New York Loft", state: "New York", description: "An industrial space with high ceilings and brick walls.", imageUrl: "https://i.pinimg.com/1200x/4d/2f/e1/4d2fe1f6f22c7b348524b1601c1fa49c.jpg", attributes: { size: "large", age: "modern", price: "expensive", comfort: "standard", vibe: "urban" } },
  { id: 6, name: "The Suburban Family Home", state: "Ohio", description: "A traditional two-story house with a green lawn.", imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000", attributes: { size: "large", age: "modern", price: "affordable", comfort: "standard", vibe: "traditional" } },
  { id: 7, name: "The Desert Adobe", state: "Arizona", description: "A warm-colored house built for the desert sun.", imageUrl: "https://images.stockcake.com/public/a/4/a/a4a70eeb-d042-4a38-b3e3-9afbae45b38a_large/desert-adobe-home-stockcake.jpg", attributes: { size: "medium", age: "old", price: "affordable", comfort: "cozy", vibe: "warm" } },
  { id: 8, name: "The Victorian Lady", state: "San Francisco", description: "A historic house with many details and colors.", imageUrl: "https://i.pinimg.com/736x/84/b0/99/84b099df5728f110b2849fd9bf0d8357.jpg", attributes: { size: "large", age: "historic", price: "expensive", comfort: "standard", vibe: "ornate" } },
  { id: 9, name: "The Florida Trailer", state: "Florida", description: "A simple and practical one-story mobile home.", imageUrl: "https://alchetron.com/cdn/trailer-park-7bb48b8c-d4ae-4b9f-bcc8-cdd2003c6c8-resize-750.jpeg", attributes: { size: "small", age: "old", price: "cheap", comfort: "standard", vibe: "practical" } },
  { id: 10, name: "The Stone Castle", state: "Texas", description: "A unique house built like a small fortress.", imageUrl: "https://i.pinimg.com/1200x/b3/68/8e/b3688e866a7c5100ff3726c624553b87.jpg", attributes: { size: "massive", age: "new", price: "expensive", comfort: "luxurious", vibe: "grand" } },
  { id: 11, name: "The Seattle Houseboat", state: "Washington", description: "A floating home on the lake.", imageUrl: "https://snaphappytravel.com/wp-content/uploads/2024/07/sam-houseboat-seattle.jpg", attributes: { size: "small", age: "modern", price: "expensive", comfort: "cozy", vibe: "unique" } },
  { id: 12, name: "The Modern Glass House", state: "Connecticut", description: "A minimalist house with walls made of glass.", imageUrl: "https://polymer-process.com/wp-content/uploads/2023/06/Reflective-Exterior-modern-glass-house-768x506.jpg.webp", attributes: { size: "medium", age: "new", price: "luxury", comfort: "standard", vibe: "minimalist" } }
];

// B1-safe ranking maps for string attributes
const SIZE_ORDER = { small: 1, medium: 2, large: 3, massive: 4 };
const PRICE_ORDER = { cheap: 1, affordable: 2, expensive: 3, luxury: 4 };
const COMFORT_ORDER = { standard: 1, cozy: 2, luxurious: 3 };
const AGE_ORDER = { old: 1, historic: 2, modern: 3, new: 4 };

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="flex justify-center gap-4 p-4">
        <NavButton label="Discovery" onClick={() => setPage(1)} />
        <NavButton label="Comparison" onClick={() => setPage(2)} />
        <NavButton label="Superlatives" onClick={() => setPage(3)} />
      </nav>

      {page === 1 && <DiscoveryView />}
      {page === 2 && <ComparisonView />}
      {page === 3 && <SuperlativeView />}
    </div>
  );
}

function NavButton({ label, onClick }) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-white border text-lg font-semibold">
      {label}
    </button>
  );
}

// PAGE 1 – DISCOVERY
function DiscoveryView() {
  const [revealed, setRevealed] = useState(Array(12).fill(false));
  const toggleReveal = (index) => {
    const copy = [...revealed]; copy[index] = true; setRevealed(copy);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Why did this picture choose me?</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {HOUSES.map((house, index) => (
          <button key={house.name} onClick={() => toggleReveal(index)} className="relative focus:outline-none" aria-label={`House number ${index+1}`}>
            <img src={house.imageUrl} alt={`A house called ${house.name}`} className="w-full h-64 object-cover" />
            {!revealed[index] && (<div className="absolute inset-0 bg-gray-800 flex items-center justify-center"><span className="text-white text-4xl font-bold">{index+1}</span></div>)}
          </button>
        ))}
      </div>
    </main>
  );
}

// PAGE 2 – COMPARATIVES (with hint button)
function ComparisonView() {
  const [pair, setPair] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const rollDice = () => { const shuffled = [...HOUSES].sort(() => 0.5-Math.random()); setPair(shuffled.slice(0,2)); setShowHints(false); };

  return (
    <main>
      <div className="flex justify-center p-4 gap-4">
        <button onClick={rollDice} className="text-xl px-6 py-3 bg-white border">🎲 Roll the dice</button>
        {pair.length===2 && <button onClick={()=>setShowHints(!showHints)} className="text-xl px-6 py-3 bg-yellow-200 border">Show Hint</button>}
      </div>
      {pair.length===2 && (
        <>
          <div className="flex h-screen">{pair.map(h=> <img key={h.name} src={h.imageUrl} alt={h.name} className="w-1/2 object-cover" />)}</div>
          {showHints && <div className="p-6 text-xl space-y-2">{renderComparatives(pair[0], pair[1])}</div>}
        </>
      )}
    </main>
  );
}

// PAGE 3 – SUPERLATIVES (no example sentences)
function SuperlativeView() {
  const [group, setGroup] = useState([]);
  const rollDice = () => { const shuffled=[...HOUSES].sort(()=>0.5-Math.random()); setGroup(shuffled.slice(0,3)); };

  return (
    <main>
      <div className="flex justify-center p-4">
        <button onClick={rollDice} className="text-xl px-6 py-3 bg-white border">🎲 Roll for superlatives</button>
      </div>
      {group.length===3 && (
        <div className="flex">{group.map(h=> <img key={h.name} src={h.imageUrl} alt={h.name} className="w-1/3 h-96 object-cover" />)}</div>
      )}
    </main>
  );
}

// ESL LOGIC – COMPARATIVES (B1-safe string order)
function renderComparatives(a,b){
  return (
    <>
      <p>{a.name} is {SIZE_ORDER[a.attributes.size]>SIZE_ORDER[b.attributes.size] ? "bigger" : "smaller"} than {b.name}.</p>
      <p>{a.name} is {PRICE_ORDER[a.attributes.price]>PRICE_ORDER[b.attributes.price] ? "more expensive" : "cheaper"} than {b.name}.</p>
      <p>{a.name} is {COMFORT_ORDER[a.attributes.comfort]>COMFORT_ORDER[b.attributes.comfort] ? "more comfortable" : "less comfortable"} than {b.name}.</p>
      <p>{a.name} is {AGE_ORDER[a.attributes.age]>AGE_ORDER[b.attributes.age] ? "newer" : "older"} than {b.name}.</p>
    </>
  );
}

export default App;
