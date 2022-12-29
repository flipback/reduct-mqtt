const {Client} = require('reduct-js');

const client = new Client('http://localhost:8383');

client.getBucket('mqtt').then(async (bucket) => {
  const record  = await bucket.beginRead('mqtt_data');
  console.log('Last record: %s', await record.readAsString());

  // Get data for lash hour
  const stopTime = BigInt(Date.now() * 1000);
  const startTime = stopTime - 3_600_000_000n;

   for await (const record of bucket.query('mqtt_data', startTime, stopTime)) {
    data = await record.read();
    console.log('Found record "%s" with timestamp "%d"', data, record.time);
  }

}).catch(error => console.error(error));
