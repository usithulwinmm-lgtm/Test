import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

// Generate mock portfolio data for the chart
const generateChartData = () => {
  const data = [];
  const baseValue = 45000;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variation = Math.sin(i / 5) * 5000 + Math.random() * 2000;
    const value = baseValue + variation + (30 - i) * 200;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    });
  }
  
  return data;
};

const chartData = generateChartData();

export const PortfolioChart: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className={`text-lg font-semibold mb-4 ${language === 'my' ? 'font-myanmar' : ''}`}>
        {t('portfolioPerformance')}
      </h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(207, 90%, 54%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(207, 90%, 54%)" stopOpacity={0} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 30%, 20%)" 
              vertical={false}
            />
            
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 8%)',
                border: '1px solid hsl(222, 30%, 20%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(207, 90%, 54%)"
              strokeWidth={3}
              fill="url(#colorValue)"
              filter="url(#glow)"
              className="chart-glow"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
