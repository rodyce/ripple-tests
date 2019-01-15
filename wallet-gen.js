const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib')
const sign = require('ripple-sign-keypairs')
const readline = require("readline")

// Sample mnemonics to Use (input at prompt):
// kit youth enroll gravity inform coil life response over collect shrimp fashion desk million differ style october hill first fiscal reform among fiscal word
// First generated address should be: rHZwwXzBJSw58vczQVsp4LospbspYjS5f

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})

const CoinCode = 144;

console.log("Enter mnemonics (empty for random): ")
rl.on('line', function(words) {
    var mnemonic = undefined;
    if (words.trim().length == 0) {
        // Create random words.
        // Use strength of 256 bits = 24 words.
        mnemonic = bip39.generateMnemonic(256);
    } else {
        // Verify that the mnemonics are valid.
        if (bip39.validateMnemonic(words)) {
            mnemonic = words;
        } else {
            throw Error("Invalid mnemonics");
        }
    }

    const seed = bip39.mnemonicToSeed(mnemonic);
    const m = bip32.fromSeedBuffer(seed);
    for (var i = 0; i < 10; i++) {
        var path = `m/44'/${CoinCode}'/0'/0/${i}`;
        const keyPair = m.derivePath(path).keyPair.getKeyPairs();
        const key = ripple.KeyPair.from_json(keyPair.privateKey.substring(2));

        console.log('address:              ' + key.to_address_string());
        console.log('(pub, priv) key pair: ' + keyPair.publicKey + ', ' + keyPair.privateKey);
        console.log('priv key WIF:         ' + key.to_wif());
    }

    console.log("\nEnter mnemonics (empty for random): ");
});
