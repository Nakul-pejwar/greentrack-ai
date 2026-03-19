import mqtt from 'mqtt';

export const initializeIotMqtt = () => {
  // Connect to public test broker
  const client = mqtt.connect('mqtt://test.mosquitto.org');

  client.on('connect', () => {
    console.log('Connected to MQTT broker (test.mosquitto.org)');
    // Subscribe to a mock greentrack factory topic
    client.subscribe('greentrack/factory/sensors', (err) => {
      if (!err) {
        console.log('Subscribed to greentrack/factory/sensors');
      }
    });
  });

  client.on('message', (topic, message) => {
    try {
      // Assuming message is JSON string: { "machineId": "M-1", "power": 120, "status": "running" }
      const payload = JSON.parse(message.toString());
      
      // Emit to dashboard
      if (global.io) {
        global.io.emit('iot_stream', {
          topic,
          ...payload,
          timestamp: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error('Error parsing MQTT message payload:', message.toString());
    }
  });
};
