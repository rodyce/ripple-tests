'use strict';
const axios = require('axios');

const ServerHost = "https://s.altnet.rippletest.net:51234/";

async function getServerInfo() {
  const response = await axios.post(ServerHost, {
    method: 'server_info',
    params: [
      {}
    ]
  });
  console.log('response:');
  console.log(response);
  const result = response.data.result;
  if ('error' in result) {
    throw new Error(`${result.error}: ${result.error_message}`);
  }
  return result.info;
}

async function main() {
  const myAddress = process.argv[2];


  try {
    const serverInfo = await getServerInfo();

    console.log(serverInfo);

    console.log('serverInfo done');
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
