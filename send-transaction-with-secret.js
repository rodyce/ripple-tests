const { RippleAPI } = require('ripple-lib');

const RIPPLE_FROM_ADDRESS = 'rh8cZiw3YFsHbhNa3N7Ff9jG99vHM1UNpJ';
const RIPPLE_FROM_SECRET = 'sh1vmasB2cvXezSTEQLXr6EtHte3d';
const RIPPLE_TO_ADDRESS = 'r9bpF2wee4PgkNS1mpG2LPqTFqJTksG9RG';

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net/' // XRP Private Net
});


async function run() {
  const amountToSend = process.argv[2];

  await api.connect();

  // Ripple payments are represented as JavaScript objects
  const payment = {
    source: {
      address: RIPPLE_FROM_ADDRESS,
      maxAmount: {
        value: amountToSend,
        currency: 'XRP'
      }
    },
    destination: {
      address: RIPPLE_TO_ADDRESS,
      amount: {
        value: amountToSend,
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

if (process.argv.length < 3) {
  console.error('Bad number of arguments');
  process.exit(1);
}

run()
  .catch(error => console.error(error.stack));
