import React from 'react';
import { Brain, TrendingUp, Zap, Target, PieChart, Info } from 'lucide-react';

const Insights: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">Habit Intelligence (India)</h2>
        <p style={{ color: 'var(--text-secondary)' }}>AI analysis of your Indian eating patterns and kitchen environment.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <Brain color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '20px' }}>Snack Risk Predictor</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary)' }}>Low</div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Risk of unhealthy snacking today</p>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '20px', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
            <Info size={14} style={{ marginBottom: '4px' }} />
            Because you have <span style={{ color: 'white' }}>Roasted Chana</span> and <span style={{ color: 'white' }}>Sprouts</span> ready, you are less likely to order samosas or open a Kurkure pack.
          </div>
        </div>

        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <Target color="var(--secondary)" />
            </div>
            <h3 style={{ fontSize: '20px' }}>Nutrition Gaps</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>B12 (Common in Veg diets)</span>
                <span style={{ color: '#ef4444' }}>Deficit</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ width: '30%', height: '100%', background: '#ef4444', borderRadius: '10px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Protein</span>
                <span style={{ color: 'var(--accent)' }}>Moderate</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ width: '55%', height: '100%', background: 'var(--accent)', borderRadius: '10px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Healthy Fats (Ghee/Nuts)</span>
                <span style={{ color: 'var(--primary)' }}>Optimal</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ width: '90%', height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '24px' }}>Desi Environment Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px' }}>Processed Inventory Trend</h4>
            <div style={{ height: '200px', width: '100%', background: 'rgba(255,255,255,0.01)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              [ Indian Packaged Food Trend ]
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px' }}>Top Desi Recommendations</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                Switch to <span style={{ color: 'white' }}>Cold Pressed Oils</span> for tadka to improve heart health.
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                Increase <span style={{ color: 'white' }}>Millets (Ragi/Bajra)</span> intake — it’s missing in your recent scans.
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                Keep <span style={{ color: 'white' }}>Curd</span> at eye level to encourage Dahi-based snacks over namkeen.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
