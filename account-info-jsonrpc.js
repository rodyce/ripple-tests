'use strict';
const axios = require('axios');
const Decimal = require('decimal.js').Decimal;

const ServerHost = "https://s.altnet.rippletest.net:51234/";
const xrpAllowedDecimals = 6;

async function getAccountInfo(address) {
  const response = await axios.post(ServerHost, {
    method: 'account_info',
    params: [
      {
        account: address,
        strict: true,
        ledger_index: 'validated'
      }
    ]
  });
  console.log('response:');
  console.log(response);
  const result = response.data.result;
  if ('error' in result) {
    throw new Error(`${result.error}: ${result.error_message}`);
  }
  return result.account_data;
}

async function main() {
  const myAddress = process.argv[2];


  try {
    console.log('getting account info for', myAddress);
    const accountInfo = await getAccountInfo(myAddress);

    console.log(accountInfo);

    const factor = new Decimal(10).pow(xrpAllowedDecimals);

    console.log(`XRP Balance: ${new Decimal(accountInfo.Balance).dividedBy(factor)}`);

    console.log('getAccountInfo done');
  } catch (error) {
    console.log(`EXCEPTION TYPE ${error.message} !!`);
    if (error.message === 'actNotFound') {
      console.log(`Account ${myAddress} does not exist`);
    } else {
      throw error;
    }
  }
  console.log('done');
}

if (process.argv.length < 3) {
  console.error('Bad number of arguments');
  process.exit(1);
}

main()
