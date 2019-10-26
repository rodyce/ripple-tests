'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const ServerHost = "wss://s.altnet.rippletest.net/";

const api = new RippleAPI({
  server: ServerHost
});


async function main() {
  const myAddress = process.argv[2];

  await api.connect();

  try {
    console.log('getting account info for', myAddress);
    const accountInfo = await api.getAccountInfo(myAddress);

    console.log(accountInfo);
    console.log('getAccountInfo done');
  } catch (error) {
    console.log(`EXCEPTION TYPE ${error.message} !!`);
    if (error.message === 'actNotFound') {
      console.log(`Account ${myAddress} does not exist`);
    } else {
      throw error;
    }
  }
  api.disconnect();
  console.log('done and disconnected');
}

if (process.argv.length < 3) {
  console.error('Bad number of arguments');
  process.exit(1);
}

main()
