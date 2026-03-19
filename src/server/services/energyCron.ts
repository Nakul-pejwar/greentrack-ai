import cron from 'node-cron';
import { query } from '../db';
import { fetchEmissionFactors } from './emissionsApi';

// Mock function to simulate fetching data from SRP Energy API or ENTSO-E
const fetchMockEnergyData = async () => {
  // Returns random mock kWh between 1000 and 5000
  return Math.random() * (5000 - 1000) + 1000;
};

export const initializeCronJobs = () => {
  // Run every 15 minutes: '*/15 * * * *'
  // For quick local testing, let's run every 1 minute: '* * * * *'
  cron.schedule('* * * * *', async () => {
    try {
      console.log('Running energy polling cron job...');
      const usageKwh = await fetchMockEnergyData();
      
      // Calculate CO2e (India-Specific: Maharashtra Grid - 0.7 kg CO2e / kWh)
      // Supports SEBI BRSR (Business Responsibility and Sustainability Reporting)
      const co2e = usageKwh * 0.7;

      // In a real app we would save this to DB
      // await query('INSERT INTO energy_usage (kwh, co2e, timestamp) VALUES ($1, $2, NOW())', [usageKwh, co2e]);

      // Emit real-time update to dashboard
      if (global.io) {
        global.io.emit('energy_update', {
          timestamp: new Date().toISOString(),
          kwh: usageKwh,
          co2e: co2e,
        });
        console.log(`Emitted energy update: ${usageKwh.toFixed(2)} kWh -> ${co2e.toFixed(2)} kg CO2e`);
      }
    } catch (error) {
      console.error('Error in energy cron job:', error);
    }
  });
};
