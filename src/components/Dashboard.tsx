import React, { useState } from 'react';
import { Activity, Apple, ShoppingCart, TrendingUp, AlertTriangle, MessageSquare, Send, Plus, History, Sparkles, Brain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  eatHistory: any[];
}

const data = [
  { name: 'Mon', score: 45 },
  { name: 'Tue', score: 48 },
  { name: 'Wed', score: 52 },
  { name: 'Thu', score: 50 },
  { name: 'Fri', score: 54 },
  { name: 'Sat', score: 56 },
  { name: 'Sun', score: 58 },
];

const Dashboard: React.FC<DashboardProps> = ({ eatHistory }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Namaste Pilot! I see you logged Poha for breakfast. That is a great complex carb start. Ready for the next smart move?' }
  ]);

  const handleChat = () => {
    if (!chatInput) return;
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: `Based on your Indian diet today, I recommend adding more protein. How about a Paneer Paratha or Moong Dal Cheela for lunch?` }]);
    }, 1000);
    setChatInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">Namaste, Pilot</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Your Indian kitchen is 58% healthy this week. Keep going!</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', background: 'var(--primary-glow)', borderRadius: '16px' }}><Activity color="var(--primary)" /></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Health Score</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>58 <span style={{ fontSize: '12px', color: 'var(--primary)' }}>+2%</span></div>
          </div>
        </div>
        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px' }}><Apple color="var(--secondary)" /></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Today's Intake</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{eatHistory.reduce((a,b) => a+b.calories, 0)} <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>kcal</span></div>
          </div>
        </div>
        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '16px' }}><Sparkles color="var(--accent)" /></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Smart Swaps</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>12 <span style={{ fontSize: '12px', color: 'var(--accent)' }}>Active</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><TrendingUp color="var(--primary)" size={20}/> Health Timeline</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Brain color="var(--secondary)" size={20}/> Chat with Pilot</h3>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', paddingRight: '8px', marginBottom: '20px' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', background: msg.role === 'user' ? 'var(--secondary)' : 'rgba(255,255,255,0.03)', fontSize: '13px', lineHeight: '1.5', border: msg.role === 'ai' ? '1px solid var(--border)' : 'none' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChat()}
              placeholder="Ask for Desi health tips..." 
              style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '13px', outline: 'none' }}
            />
            <button onClick={handleChat} style={{ padding: '14px', background: 'var(--primary)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer' }}><Send size={18}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
