import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import PantryAnalyzer from './components/PantryAnalyzer'
import SmartSwaps from './components/SmartSwaps'
import DietPlanner from './components/DietPlanner'
import BuySmarter from './components/BuySmarter'
import CalorieTracker from './components/CalorieTracker'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');
  const [eatHistory, setEatHistory] = useState([
    { id: '1', item: 'Moong Dal Chilla', calories: 280, date: '2026-05-06' },
    { id: '2', item: 'Greek Yogurt', calories: 120, date: '2026-05-06' },
    { id: '3', item: 'Almonds (5)', calories: 35, date: '2026-05-06' },
  ]);

  const handleBuyNow = (item: string) => {
    setGlobalSearch(item);
    setActiveTab('buySmarter');
  };

  const logFood = (item: string, calories: number) => {
    const entry = { id: Date.now().toString(), item, calories, date: new Date().toISOString().split('T')[0] };
    setEatHistory([entry, ...eatHistory]);
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard eatHistory={eatHistory} />
        )}

        {activeTab === 'tracker' && (
          <CalorieTracker eatHistory={eatHistory} logFood={logFood} />
        )}
        
        {activeTab === 'pantry' && (
          <PantryAnalyzer />
        )}
        
        {activeTab === 'swaps' && (
          <SmartSwaps onBuyNow={handleBuyNow} />
        )}
        
        {activeTab === 'diet' && (
          <DietPlanner eatHistory={eatHistory} />
        )}
        
        {activeTab === 'buySmarter' && (
          <BuySmarter initialQuery={globalSearch} />
        )}
      </main>
    </div>
  )
}

export default App
