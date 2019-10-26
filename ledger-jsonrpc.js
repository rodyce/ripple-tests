'use strict';
const axios = require('axios');
const Decimal = require('decimal.js').Decimal;

const ServerHost = "https://s.altnet.rippletest.net:51234/";

async function _getLedger() {
  const response = await axios.post(ServerHost, {
    method: 'ledger',
    params: [
      {
        ledger_index: 'validated',
        accounts: false,
        full: false,
        transactions: false,
        expand: false,
        owner_funds: false
      }
    ]
  });
  const result = response.data.result;
  return result;
}

async function main() {
  const myAddress = process.argv[2];


  try {
    console.log('getting account info for', myAddress);
    const resp = await _getLedger();

    console.log(resp);

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


main()
