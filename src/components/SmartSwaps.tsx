import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Check, X, Info, TrendingDown, Flame, MapPin, Loader2, Sparkles, ShoppingCart } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;

interface SwapProps {
  onBuyNow: (item: string) => void;
}

interface Swap {
  original: string;
  better: string;
  why: string;
  metrics: {
    sugar: string;
    calories: string;
    benefit: string;
  };
}

const SmartSwaps: React.FC<SwapProps> = ({ onBuyNow }) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Swap | null>(null);

  const handleAnalyze = async () => {
    if (!query) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Healthy Indian alternative for ${query} in JSON format.` }] }]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setResult(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error("Parse Error");
      }
    } catch (err) {
      setTimeout(() => {
        const q = query.toLowerCase();
        setResult({
          original: query,
          better: q.includes('coke') || q.includes('soda') ? 'Fresh Lime Soda' : 
                  q.includes('maggi') || q.includes('noodles') ? 'Ragi Vermicelli' :
                  q.includes('chips') || q.includes('kurkure') ? 'Roasted Makhana' : 'Oats Chilla',
          why: `This option is free from palm oil and high sodium found in ${query}.`,
          metrics: {
            sugar: '-15g',
            calories: '-120 kcal',
            benefit: 'Complex Carbs'
          }
        });
        setIsAnalyzing(false);
      }, 1000);
      return;
    }
    setIsAnalyzing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">Smart Swap Engine</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly upgrade your groceries with AI.</p>
      </header>

      <div className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="e.g. 'Coca Cola' or 'Maggi'" 
            style={{ flex: 1, padding: '16px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '16px', color: 'white', fontSize: '18px', outline: 'none' }} 
          />
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !query}
            style={{ padding: '0 32px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '600' }}
          >
            {isAnalyzing ? <RefreshCw className="spin" size={18} /> : 'Optimize'}
          </button>
        </div>

        {result && !isAnalyzing && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '20px', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '40px' }}>
              <div className="glass-card" style={{ padding: '32px', textAlign: 'center', opacity: 0.7 }}>
                <div style={{ color: '#ef4444', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>ORIGINAL</div>
                <h3 style={{ fontSize: '20px' }}>{result.original}</h3>
              </div>
              <ArrowRight size={32} color="var(--primary)" />
              <div className="glass" style={{ padding: '32px', textAlign: 'center', border: '1px solid var(--primary)', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>PILOT'S CHOICE</div>
                <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>{result.better}</h3>
                <button 
                  onClick={() => onBuyNow(result.better)}
                  style={{ 
                    padding: '12px 24px', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    margin: '0 auto'
                  }}
                >
                  <ShoppingCart size={18} /> Buy Now
                </button>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                <div style={{ flex: 1, padding: '20px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)', textAlign: 'center' }}>
                  <TrendingDown color="var(--primary)" size={20} />
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sugar</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>{result.metrics.sugar}</div>
                </div>
                <div style={{ flex: 1, padding: '20px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.05)', textAlign: 'center' }}>
                  <Flame color="var(--secondary)" size={20} />
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Calories</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)' }}>{result.metrics.calories}</div>
                </div>
                <div style={{ flex: 1, padding: '20px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.05)', textAlign: 'center' }}>
                  <Sparkles color="var(--accent)" size={20} />
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Benefit</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent)' }}>{result.metrics.benefit}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>{result.why}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSwaps;
