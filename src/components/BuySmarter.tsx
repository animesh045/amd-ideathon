import React, { useState, useEffect } from 'react';
import { ShoppingCart, Globe, MapPin, ExternalLink, Tag, Zap, Search, Info, Map as MapIcon } from 'lucide-react';

interface PlatformPrice {
  platform: string;
  productName: string;
  price: number;
  delivery: string;
  link: string;
  badge?: 'Best Deal' | 'Fastest';
}

const platforms = [
  { name: 'Blinkit', baseLink: 'https://blinkit.com/s/?q=' },
  { name: 'Zepto', baseLink: 'https://www.zeptonow.com/search?query=' },
  { name: 'Swiggy Instamart', baseLink: 'https://www.swiggy.com/instamart/search?query=' },
  { name: 'BigBasket', baseLink: 'https://www.bigbasket.com/ps/?q=' },
  { name: 'JioMart', baseLink: 'https://www.jiomart.com/search/' },
];

interface BuySmarterProps {
  initialQuery?: string;
}

const BuySmarter: React.FC<BuySmarterProps> = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || 'Coconut Water');
  const [prices, setPrices] = useState<PlatformPrice[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.log('Location access denied', err)
    );
    handleSearch();
  }, [initialQuery]);

  const handleSearch = () => {
    if (!query) return;
    const mockPrices: PlatformPrice[] = platforms.map((p, idx) => ({
      platform: p.name,
      productName: `${query} Pack`,
      price: Math.floor(Math.random() * (200 - 40) + 40),
      delivery: idx === 0 ? '8 mins' : idx === 1 ? '12 mins' : '15-30 mins',
      link: `${p.baseLink}${encodeURIComponent(query)}`,
      badge: idx === 0 ? 'Fastest' : idx === 1 ? 'Best Deal' : undefined
    }));
    setPrices(mockPrices);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">🛒 Buy Smarter</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Compare prices and find {query} near you.</p>
      </header>

      <div style={{ display: 'flex', gap: '12px', maxWidth: '600px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search healthy product..."
            style={{ width: '100%', padding: '14px 14px 14px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }}
          />
        </div>
        <button onClick={handleSearch} style={{ padding: '0 24px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>Compare</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Globe color="var(--secondary)" size={20}/> Platform Comparison</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '11px' }}>PLATFORM</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '11px' }}>PRODUCT</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '11px' }}>PRICE</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '11px' }}>DELIVERY</th>
                <th style={{ padding: '16px' }}></th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px', fontWeight: 'bold' }}>{item.platform}</td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{item.productName}</td>
                  <td style={{ padding: '16px', fontWeight: 'bold', color: item.badge === 'Best Deal' ? 'var(--primary)' : 'white' }}>₹{item.price}</td>
                  <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{item.delivery}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', color: 'white', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>Order <ExternalLink size={12} /></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin color="var(--primary)" size={20}/> Local Market Search</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Searching for <strong>"{query}"</strong> near your coordinates.</p>
          
          <div style={{ width: '100%', height: '240px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', marginBottom: '20px', overflow: 'hidden' }}>
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng-0.01},${coords.lat-0.01},${coords.lng+0.01},${coords.lat+0.01}&layer=mapnik&marker=${coords.lat},${coords.lng}`}
              style={{ border: 'none', filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
            ></iframe>
          </div>

          <a 
            href={`https://www.google.com/maps/search/${encodeURIComponent(query)}+near+me/@${coords.lat},${coords.lng},15z`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '14px', background: 'var(--primary)', borderRadius: '12px', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}
          >
            <MapIcon size={18} /> Search on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuySmarter;
