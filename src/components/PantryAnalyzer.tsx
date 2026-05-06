import React, { useState } from 'react';
import { Plus, Trash2, Apple, Utensils, AlertTriangle, Sparkles, ShoppingCart, Info } from 'lucide-react';

interface PantryItem {
  id: string;
  name: string;
  category: string;
  addedAt: string;
}

const PantryAnalyzer: React.FC = () => {
  const [items, setItems] = useState<PantryItem[]>([
    { id: '1', name: 'Tata Salt', category: 'Condiment', addedAt: '2026-05-06' },
    { id: '2', name: 'Amul Milk', category: 'Dairy', addedAt: '2026-05-06' },
    { id: '3', name: 'Maggi Noodles', category: 'Snack', addedAt: '2026-05-06' },
  ]);
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('Grocery');

  const handleAddItem = () => {
    if (!newItem) return;
    const item: PantryItem = {
      id: Date.now().toString(),
      name: newItem,
      category: category,
      addedAt: new Date().toISOString().split('T')[0]
    };
    setItems([item, ...items]);
    setNewItem('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const calculateHealthScore = () => {
    const junkCount = items.filter(i => i.name.toLowerCase().includes('maggi') || i.name.toLowerCase().includes('kurkure') || i.name.toLowerCase().includes('biscuit')).length;
    return Math.max(10, 100 - (junkCount * 25));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">Pantry Inventory</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your kitchen items manually to track health metrics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Entry Area */}
        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Add Item</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="e.g. 'Brown Bread' or 'Ragi Atta'"
              style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
            />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
            >
              <option value="Grocery">Grocery</option>
              <option value="Dairy">Dairy</option>
              <option value="Fruit/Veg">Fruit/Veg</option>
              <option value="Snack">Snack</option>
              <option value="Condiment">Condiment</option>
            </select>
            <button 
              onClick={handleAddItem}
              style={{ padding: '16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Plus size={20} /> Add to Pantry
            </button>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Inventory ({items.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
              {items.map(item => (
                <div key={item.id} className="glass-card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.category} • {item.addedAt}</div>
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="var(--primary)" 
                  strokeWidth="8" 
                  strokeDasharray={`${calculateHealthScore() * 2.51} 251`} 
                  strokeLinecap="round" 
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px', fontWeight: 'bold' }}>
                {calculateHealthScore()}%
              </div>
            </div>
            <h3 style={{ fontSize: '20px' }}>Kitchen Health Score</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Based on current inventory</p>
          </div>

          <div className="glass" style={{ padding: '32px' }}>
            <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--primary)" /> Meal Suggestions
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {items.length > 2 ? (
                <>
                  <div className="glass-card" style={{ padding: '16px', fontSize: '13px' }}>Dal Tadka & Rice</div>
                  <div className="glass-card" style={{ padding: '16px', fontSize: '13px' }}>Paneer Paratha</div>
                </>
              ) : (
                <div style={{ gridColumn: 'span 2', color: 'var(--text-secondary)', fontSize: '13px' }}>Add more items for suggestions.</div>
              )}
            </div>
          </div>

          <div className="glass" style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid var(--accent)' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertTriangle color="var(--accent)" />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Low Stock Alert</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>You are running low on healthy proteins. Use <strong>Buy Smarter</strong> to restock.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryAnalyzer;
