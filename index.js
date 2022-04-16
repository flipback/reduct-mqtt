const MQTT = require('async-mqtt');
const {Client} = require('reduct-js');

MQTT.connectAsync('tcp://localhost:1883').then(async (mqttClient) => {
  await mqttClient.subscribe('mqtt_data');

  const reductClient = new Client('http://localhost:8383');
  const bucket = await reductClient.getOrCreateBucket('mqtt');

  mqttClient.on('message', async (topic, msg) => {
    const data = msg.toString();
    await bucket.write('mqtt_data', data);
    console.log('Received message "%s" from topic "%s" is written', data,
        topic);
  });

}).catch(error => console.error(error));
