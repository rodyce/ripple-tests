const { RippleAPI } = require('ripple-lib');

const RIPPLE_FROM_ADDRESS = 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh';
const RIPPLE_TO_ADDRESS = 'rBGH91jmPeon3pVrijiDJkAfzHFYkcWfjx';
const RIPPLE_FROM_SECRET = 'snoPBrXtMeMyMHUVTgbuqAfg1SUTb';

const api = new RippleAPI({
  server: 'ws://184.105.216.181:9090' // XRP Private Net
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();

  // Ripple payments are represented as JavaScript objects
  const payment = {
    source: {
      address: RIPPLE_FROM_ADDRESS,
      maxAmount: {
        value: '500000000.00',
        currency: 'XRP'
      }
    },
    destination: {
      address: RIPPLE_TO_ADDRESS,
      amount: {
        value: '500000000.00',
        currency: 'XRP'
      }
    }
  };

  // Get ready to submit the payment
  const prepared = await api.preparePayment(RIPPLE_FROM_ADDRESS, payment, {
    maxLedgerVersionOffset: 5
  });
  // Sign the payment using the sender's secret
  const { signedTransaction } = api.sign(prepared.txJSON, RIPPLE_FROM_SECRET);
  console.log('Signed', signedTransaction)

  // Submit the payment
  const res = await api.submit(signedTransaction);

  console.log('Done', res);
  process.exit(0);
}
