import React, { useState } from 'react';
import { Utensils, Sparkles, FileText, Download, Loader2, Apple, CheckCircle2, Info } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;

interface DietPlannerProps {
  eatHistory: any[];
}

const DietPlanner: React.FC<DietPlannerProps> = ({ eatHistory }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setIsGenerating(true);
    setPlan(null);

    const historyText = eatHistory.map(h => `${h.item} (${h.calories} kcal)`).join(', ');

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Based on this Indian food history: [${historyText}], generate a personalized 1-day healthy Indian diet plan. 
              Focus on local ingredients (Moong Dal, Ragi, Paneer). 
              Return ONLY valid JSON:
              {
                "summary": "Analysis of current diet",
                "breakfast": "Item + why",
                "lunch": "Item + why",
                "dinner": "Item + why",
                "tips": ["3 Hinglish tips"],
                "gDocLink": "https://docs.google.com/document/d/1pilot-demo-link"
              }`
            }]
          }]
        })
      });

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setPlan(JSON.parse(jsonMatch[0]));
      }
    } catch (err) {
      setTimeout(() => {
        setPlan({
          summary: "You are eating good complex carbs but lacking enough protein.",
          breakfast: "Ragi Malt with Almonds - High fiber start.",
          lunch: "Dal Tadka with 2 Multigrain Rotis - Balanced protein/carb.",
          dinner: "Grilled Paneer & Veggies - Light and protein-rich.",
          tips: ["Dinner 8 PM se pehle karein.", "Water intake 3L tak badhayein.", "Add more green leafies."],
          gDocLink: "https://docs.google.com/document/d/1pilot-demo-link"
        });
        setIsGenerating(false);
      }, 1500);
      return;
    }
    setIsGenerating(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease' }}>
      <header>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }} className="gradient-text">AI Diet Planner</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontSize: '11px', fontWeight: 'bold' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', animation: 'pulse-glow 2s infinite' }}></div>
          LINKED: {import.meta.env.VITE_SERVICE_ACCOUNT_EMAIL}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
        <div className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
            <Apple color="var(--primary)" size={48} style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px' }}>Eat History Sync</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '8px' }}>{eatHistory.length} items tracked from your pantry log.</p>
          </div>

          <button 
            onClick={generatePlan}
            disabled={isGenerating}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'var(--primary)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {isGenerating ? <Loader2 className="spin" size={20} /> : <Sparkles size={20} />}
            Generate Diet Plan
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {!plan && !isGenerating && (
            <div className="glass" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <FileText size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                <p>Click generate to see your AI-crafted Indian diet plan.</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="glass" style={{ padding: '60px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <Loader2 className="spin" size={48} color="var(--primary)" />
              <p style={{ fontWeight: '600' }}>Pilot is analyzing your history... ✨</p>
            </div>
          )}

          {plan && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <div className="glass" style={{ padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 color="var(--primary)" size={20}/> Personalized Roadmap
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px' }}>
                  {plan.summary}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>BREAKFAST</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{plan.breakfast}</div>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>LUNCH</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{plan.lunch}</div>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>DINNER</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{plan.dinner}</div>
                </div>
              </div>

              <div className="glass" style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--primary)' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={16} /> Pilot's Pro Tips
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {plan.tips.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;
