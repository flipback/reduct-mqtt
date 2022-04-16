const {Client} = require('reduct-js');

const client = new Client('http://localhost:8383');

client.getBucket('mqtt').then(async (bucket) => {
  let data = await bucket.read('mqtt_data');
  console.log('Last record: %s', data);

  // Get data for lash hour
  const stopTime = BigInt(Date.now() * 1000);
  const startTime = stopTime - 3_600_000_000n;

  const records = await bucket.list('mqtt_data', startTime, stopTime);
  for (const record of records) {
    data = await bucket.read('mqtt_data', record.timestamp);
    console.log('Found record "%s" with timestamp "%d"', data, record.timestamp);
  }

}).catch(error => console.error(error));
