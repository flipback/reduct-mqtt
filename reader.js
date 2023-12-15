const {Client} = require('reduct-js');

const client = new Client('http://localhost:8383');

client.getBucket('mqtt').then(async (bucket) => {
  for (const entry of await bucket.getEntryList()) {

    for await (const record of bucket.query(entry.name)) {
      data = await record.read();
      console.log('Found record "%s" with timestamp "%d"', data, record.time);
    }
  }

}).catch(error => console.error(error));
