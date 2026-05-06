import React, { useState } from 'react';
import { History, Plus, Trash2, TrendingUp, Calendar, Filter, Download, Zap, PieChart } from 'lucide-react';

interface TrackerProps {
  eatHistory: any[];
  logFood: (item: string, calories: number) => void;
}

const CalorieTracker: React.FC<TrackerProps> = ({ eatHistory, logFood }) => {
  const [item, setItem] = useState('');
  const [cals, setCals] = useState('');

  const totalCals = eatHistory.reduce((acc, curr) => acc + curr.calories, 0);

  const handleLog = () => {
    if (item && cals) {
      logFood(item, parseInt(cals));
      setItem('');
      setCals('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">Calorie Tracker</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '11px', fontWeight: 'bold' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulse-glow 2s infinite' }}></div>
            LIVE SYNC: {import.meta.env.VITE_GOOGLE_PROJECT_ID}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="glass-card" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', border: '1px solid var(--border)' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        <div className="glass" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>TOTAL CALORIES</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {totalCals} <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>kcal</span>
          </div>
        </div>
        <div className="glass" style={{ padding: '24px', borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>MEALS LOGGED</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{eatHistory.length}</div>
        </div>
        <div className="glass" style={{ padding: '24px', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>AVERAGE / MEAL</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{eatHistory.length > 0 ? Math.round(totalCals / eatHistory.length) : 0}</div>
        </div>
      </div>

      <div className="glass" style={{ padding: '40px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={20} color="var(--primary)" /> Quick Log Meal
        </h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 2 }}>
            <input 
              type="text" 
              placeholder="e.g. 'Dal Chawal' or 'Paneer Tikka'" 
              value={item}
              onChange={(e) => setItem(e.target.value)}
              style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <input 
              type="number" 
              placeholder="Calories" 
              value={cals}
              onChange={(e) => setCals(e.target.value)}
              style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
            />
          </div>
          <button 
            onClick={handleLog}
            style={{ padding: '0 40px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Log <Plus size={18} style={{ display: 'inline', marginLeft: '4px' }} />
          </button>
        </div>
      </div>

      <div className="glass" style={{ padding: '32px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <History size={20} color="var(--secondary)" /> Meal History (Spreadsheet AI)
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="glass-card" style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Filter size={14} /> Filter</button>
            <button className="glass-card" style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Calendar size={14} /> Date</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '20px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>ITEM NAME</th>
              <th style={{ padding: '20px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>CALORIES</th>
              <th style={{ padding: '20px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>DATE LOGGED</th>
              <th style={{ padding: '20px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>STATUS</th>
              <th style={{ padding: '20px' }}></th>
            </tr>
          </thead>
          <tbody>
            {eatHistory.map((h, i) => (
              <tr key={h.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row">
                <td style={{ padding: '20px', fontWeight: '600' }}>{h.item}</td>
                <td style={{ padding: '20px' }}>
                  <div style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold' }}>
                    {h.calories} kcal
                  </div>
                </td>
                <td style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{h.date}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', fontSize: '10px', fontWeight: 'bold' }}>RECORDED</span>
                </td>
                <td style={{ padding: '20px', textAlign: 'right' }}>
                  <button style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {eatHistory.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <PieChart size={48} style={{ opacity: 0.1, marginBottom: '16px' }} />
                  <div>No data points recorded yet. Start logging your Desi meals!</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalorieTracker;
