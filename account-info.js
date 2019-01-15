'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const ServerHost = "ws://184.105.216.181:9090";

const api = new RippleAPI({
  server: ServerHost // Blocksize Internal server.
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'rBGH91jmPeon3pVrijiDJkAfzHFYkcWfjx';

  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);
