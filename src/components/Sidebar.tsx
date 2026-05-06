import React from 'react';
import { LayoutDashboard, PackageSearch, ArrowLeftRight, Utensils, ShoppingBag, PieChart } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Pilot Dashboard', icon: LayoutDashboard },
    { id: 'tracker', label: 'Calorie Tracker', icon: PieChart },
    { id: 'pantry', label: 'My Pantry', icon: PackageSearch },
    { id: 'swaps', label: 'Smart Swaps', icon: ArrowLeftRight },
    { id: 'diet', label: 'Diet Planner', icon: Utensils },
    { id: 'buySmarter', label: 'Buy Smarter', icon: ShoppingBag },
  ];

  return (
    <nav className="glass" style={{ width: '280px', height: '100%', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ padding: '0 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
          PantryPilot
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="nav-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                width: '100%',
                fontWeight: isActive ? '600' : '400',
                outline: 'none'
              }}
            >
              <Icon size={20} color={isActive ? 'var(--primary)' : 'inherit'} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>DEMO MODE</div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px', color: 'var(--primary)' }}>Hackathon Active</div>
      </div>
    </nav>
  );
};

export default Sidebar;
