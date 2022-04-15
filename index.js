const MQTT = require('async-mqtt');
const {Client, BucketSettings} = require('reduct-js');
const {QuotaType} = require('reduct-js/lib/cjs/BucketSettings');

const mqttClient = MQTT.connect('tcp://localhost:1883');
const reductClient = new Client('http://localhost:8383');

mqttClient.on('connect', async () => {
  await mqttClient.subscribe('mqtt_data');

  let bucket;
  try {
    bucket = await reductClient.createBucket('mqtt');  // Create a bucket in the storage
  } catch (err) {
    console.warn('No problem if the bucket already exists: ');
    bucket = await reductClient.getBucket('mqtt');
  }

  mqttClient.on('packetreceive', async (data) => {
    if (data.payload) {
      const record = data.payload.toString();
      await bucket.write('mqtt_data', record);
      console.log('Received message "%s" is written', record);
    }
  });
});


