const { RippleAPI } = require('ripple-lib');

const ServerHost = "wss://s.altnet.rippletest.net/";

const api = new RippleAPI({
  server: ServerHost
});


async function main() {
  const myAddress = process.argv[2];

  await api.connect();

  // Retrieve host's ledger range
  const serverInfo = await api.getServerInfo();
  const completeLedgers = serverInfo.completeLedgers;
  const [minLedgerVersion, maxLedgerVersion] =
    completeLedgers.split('-').map((x) => parseInt(x));

  // Retrieve transactions with the specified address using the previous
  // ledger version range.
  const transactionList = await api.getTransactions(
    myAddress, {
      excludeFailures: true,
      minLedgerVersion,
      maxLedgerVersion
    });

  for (const tx of transactionList) {
    console.log(`TX details for ${tx.id}`);
    console.log(tx);
    console.log();
  }

  //console.log(transactionList);

  process.exit(0);
}


if (process.argv.length < 3) {
  console.error('Bad number of arguments');
  process.exit(1);
}

main()
