"use client";

import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import EmissionsChart from "@/components/EmissionsChart";
import UploadModal from "@/components/UploadModal";
import { UploadCloud, Zap, AlertTriangle, TrendingDown, Factory, Car, FileText, Activity } from "lucide-react";

let socket: Socket;

export default function DashboardPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Real-time metric states
  const [scope1, setScope1] = useState(95);
  const [scope2, setScope2] = useState(68);
  const [scope3, setScope3] = useState(220);

  // Chart data state
  const [emissionsData, setEmissionsData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Live"],
    datasets: [
      {
        label: "Scope 1 (Direct)",
        data: [120, 115, 110, 105, 100, 95, 95],
        borderColor: "#10b981", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
      },
      {
        label: "Scope 2 (Indirect - Energy)",
        data: [80, 85, 80, 75, 70, 68, 68],
        borderColor: "#06b6d4", // cyan-500
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        fill: true,
      },
      {
        label: "Scope 3 (Value Chain)",
        data: [250, 260, 245, 240, 230, 220, 220],
        borderColor: "#8b5cf6", // violet-500
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
      }
    ],
  });

  const [aiInsights, setAiInsights] = useState([
    {
      title: "Renewable Energy Switch",
      description: "Switching 40% of Facility B's energy to solar could reduce Scope 2 emissions by 15% next quarter.",
      impact: "-15%",
      actionable: true,
    },
    {
      title: "Logistics Optimization",
      description: "Recent fleet data shows a 10% rise in Scope 1. Route optimization API integration recommended.",
      impact: "Alert",
      actionable: false,
    }
  ]);

  useEffect(() => {
    // Initialize Socket Connection using identical origin
    socket = io({
      path: '/socket.io/',
    });

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('energy_update', (data) => {
      // Data from Cron Job -> Affects Scope 2
      const newScope = Number((scope2 + (data.co2e || 0) / 1000).toFixed(2));
      setScope2(newScope);
      updateChart(1, newScope);
      addInsight("Energy API Sync", `Real-time grid update: ${data.kwh?.toFixed(1)} kWh consumed.`, "Info", false);
    });

    socket.on('erp_event', (data) => {
      // Data from Webhook -> Affects Scope 3
      const newScope = Number((scope3 + (data.co2e || 0) / 1000).toFixed(2));
      setScope3(newScope);
      updateChart(2, newScope);
      addInsight("ERP Webhook Triggered", `Supplier ${data.supplier} transaction added ${data.co2e?.toFixed(1)} kg CO2e.`, "+Scope 3", true);
    });

    socket.on('iot_stream', (data) => {
      // Data from MQTT -> Affects Scope 1
      const newScope = Number((scope1 + 0.05).toFixed(2));
      setScope1(newScope);
      updateChart(0, newScope);
      
      if (data.power && data.power > 200) {
        addInsight("IoT Anomaly Alert", `Machine ${data.machineId || 'unknown'} drawing high power.`, "Alert", true);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [scope1, scope2, scope3]);

  const updateChart = (datasetIndex: number, newValue: number) => {
    setEmissionsData(prev => {
      const newDatasets = [...prev.datasets];
      const dataArr = [...newDatasets[datasetIndex].data];
      dataArr[dataArr.length - 1] = newValue;
      newDatasets[datasetIndex].data = dataArr;
      return { ...prev, datasets: newDatasets };
    });
  };

  const addInsight = (title: string, description: string, impact: string, actionable: boolean) => {
    setAiInsights(prev => {
      const newInsight = { title, description, impact, actionable };
      return [newInsight, ...prev].slice(0, 5); // Keep max 5 insights
    });
  };

  const handleUploadSuccess = (data: any) => {
    setScope1(prev => Number((prev * 0.9).toFixed(2)));
    setScope2(prev => Number((prev * 0.9).toFixed(2)));
    setScope3(prev => Number((prev * 0.95).toFixed(2)));
    addInsight("New CSRD Data Analyzed", "Your latest upload shows a downward trend in logistics emissions.", "-5%", true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Enterprise Overview</h1>
            <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              <Activity className="w-3 h-3 mr-1" />
              {isConnected ? 'LIVE' : 'DISCONNECTED'}
            </div>
          </div>
          <p className="text-gray-400 mt-1">Real-time carbon footprint and AI insights driven by live WebSockets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors border border-gray-700">
            <FileText className="w-4 h-4 mr-2 text-cyan-500" />
            Generate PDF
          </button>
          <button 
            onClick={() => setShowUpload(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium shadow-lg shadow-emerald-900/20 transition-all"
          >
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload ERP Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Factory className="w-24 h-24" />
          </div>
          <p className="text-gray-400 font-medium mb-1 relative z-10">Scope 1 (Direct)</p>
          <h2 className="text-4xl font-bold text-white mb-2 relative z-10">{scope1.toFixed(1)} <span className="text-xl text-gray-500 font-normal">tCO2e</span></h2>
          <div className="flex items-center text-emerald-400 text-sm font-medium relative z-10">
            <TrendingDown className="w-4 h-4 mr-1" />
            Real-time IoT updates active
          </div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-24 h-24" />
          </div>
          <p className="text-gray-400 font-medium mb-1 relative z-10">Scope 2 (Energy)</p>
          <h2 className="text-4xl font-bold text-white mb-2 relative z-10">{scope2.toFixed(1)} <span className="text-xl text-gray-500 font-normal">tCO2e</span></h2>
          <div className="flex items-center text-cyan-400 text-sm font-medium relative z-10">
            <Zap className="w-4 h-4 mr-1" />
            Live Energy API Sync active
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Car className="w-24 h-24" />
          </div>
          <p className="text-gray-400 font-medium mb-1 relative z-10">Scope 3 (Value Chain)</p>
          <h2 className="text-4xl font-bold text-white mb-2 relative z-10">{scope3.toFixed(1)} <span className="text-xl text-gray-500 font-normal">tCO2e</span></h2>
          <div className="flex items-center text-violet-400 text-sm font-medium relative z-10">
            <UploadCloud className="w-4 h-4 mr-1" />
            Listening to ERP Webhooks
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl h-[400px]">
            <h3 className="text-xl font-bold text-white mb-4">Emissions Trend (Includes Live Data)</h3>
            <EmissionsChart type="line" data={emissionsData} />
          </div>
          
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl h-[300px]">
            <h3 className="text-xl font-bold text-white mb-4">Live Emissions by Source</h3>
            <EmissionsChart type="bar" data={{
              labels: ['Manufacturing (S1)', 'Energy (S2)', 'Supply Chain (S3)'],
              datasets: [{
                label: 'tCO2e',
                data: [scope1, scope2, scope3],
                backgroundColor: ['#10b981', '#06b6d4', '#8b5cf6'],
              }]
            }} />
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="flex items-center mb-6 relative z-10">
              <div className="p-2 bg-emerald-500/20 rounded-lg mr-3 border border-emerald-500/30">
                <Activity className="text-emerald-400 w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Live AI Insights</h3>
            </div>

            <div className="space-y-4 relative z-10">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-colors animate-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-200">{insight.title}</h4>
                    {insight.impact === "Alert" ? (
                      <span className="flex items-center text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Alert
                      </span>
                    ) : insight.impact === "Info" ? (
                      <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                        Info
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded whitespace-nowrap">
                        {insight.impact}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                  {insight.actionable && (
                    <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
                      View Action Plan &rarr;
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <button className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-lg">
                Run Advanced Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpload && (
        <UploadModal 
          onClose={() => setShowUpload(false)} 
          onUploadSuccess={handleUploadSuccess} 
        />
      )}
    </div>
  );
}
