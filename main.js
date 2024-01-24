async function generateBTCWallets(count, type, textarea) {
    if (type == "p2pkh") {
        // This will let you know the process has started
        console.log("Generating BTC (p2pkh) Wallets...");

        // Import the package necessary for bitcoin wallet generation
        // Thanks and credit to the creators <3
        // https://www.npmjs.com/package/bitcoinjs-lib
        const bitcoin = require("bitcoinjs-lib");

        var numAddresses = count;

        let textAreaData = "";

        for (let i = 1; i < numAddresses + 1; i+=1) {

            // Generate a random private key
            const keyPair = await bitcoin.ECPair.makeRandom();
            const privateKey = await keyPair.toWIF();

            // Get the public key from the key pair
            const publicKey = keyPair.publicKey;

            // Get the public key hash
            const publicKeyHash = await bitcoin.crypto.hash160(publicKey);

            // Create the address object
            const addressObject = {
                hash: publicKeyHash,
                version: bitcoin.networks.bitcoin.pubKeyHash,
            };

            // Encode the address
            const address = await bitcoin.address.toBase58Check(bitcoin.crypto.hash160(publicKey), addressObject.version);

            // Append the data to textareaData
            const data = `"${i}","${address}","${privateKey}"\n`;
            textAreaData += data;

            // Set textAreaData as textarea.value
            textarea.value = textAreaData;
        }
    }
    else if (type == "p2sh") {
        // This will let you know the process has started
        console.log("Generating BTC (p2sh) Wallets...");

        // Import the package necessary for bitcoin wallet generation
        // Thanks and credit to the creators <3
        // https://www.npmjs.com/package/bitcoinjs-lib
        const bitcoin = require("bitcoinjs-lib");

        var numAddresses = count;

        let textAreaData = "";    

        // Generate P2SH addresses (BTC addresses starting with 3...)
        for (let i = 1; i < numAddresses + 1; i++) {

            const network = bitcoin.networks.bitcoin;

            const keyPair = await bitcoin.ECPair.makeRandom();
            const privateKey = await keyPair.toWIF();

            const publicKey = keyPair.publicKey;

            // Create the P2SH address with p2sh
            const address = await bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wpkh({
                pubkey: publicKey,
                network,
                }),
                network,
            }).address;

            // Append the data to textareaData
            const data = `"${i}","${address}","${privateKey}"\n`;
            textAreaData += data;

            // Set textAreaData as textarea.value
            textarea.value = textAreaData;
        }
    }
    else if (type == "bech32") {
        // This will let you know the process has started
        console.log("Generating BTC (bech32) Wallets...");

        // Import the package necessary for bitcoin wallet generation
        // Thanks and credit to the creators <3
        // https://www.npmjs.com/package/bitcoinjs-lib
        const bitcoin = require("bitcoinjs-lib");

        var numAddresses = count;

        let textAreaData = "";

        // Generate bech32 addresses (addresses starting with bc1...)
        for (let i = 1; i < numAddresses + 1; i++) {

            // Generate a random private key
            const keyPair = await bitcoin.ECPair.makeRandom();
            const privateKey = await keyPair.toWIF();

            // Get the public key from the key pair
            const publicKey = keyPair.publicKey;

            // Create the (bech32) address with p2wpkh
            const { address } = await bitcoin.payments.p2wpkh({ pubkey: publicKey, network: bitcoin.networks.bitcoin });

            // Append the data to textareaData
            const data = `"${i}","${address}","${privateKey}"\n`;
            textAreaData += data;

            // Set textAreaData as textarea.value
            textarea.value = textAreaData;
        }
    }

}

async function generateLTCWallets(count, textarea) {
    
    // This will let you know the process has started
    console.log("Generating LTC Wallets...");

    // Import the package necessary for litecoin wallet generation
    // Thanks and credit to the creators <3
    // https://www.npmjs.com/package/litecore-lib (deprecated)
    const litecore = require('litecore-lib');

    var numAddresses = count;

    // Create a variable so that the "Generating..." text won't stay in the textarea if you'd append 
    // `data` to textarea.value. Then you can make textarea.value equal textAreaData.
    let textAreaData = "";

    // Generate LTC addresses
    for (let i = 1; i < numAddresses + 1; i++) {
        // Generate a new private key
        const privateKey = new litecore.PrivateKey();

        // Derive the corresponding public key
        const publicKey = privateKey.toPublicKey();

        // Generate an LTC address from the public key
        const address = publicKey.toAddress().toString();

        // Append the data to textareaData
        const data = `"${i}","${address}","${privateKey}"\n`;
        textAreaData += data;

        // Set textAreaData as textarea.value
        textarea.value = textAreaData;
    }

}

async function generateETHWallets(count, textarea) {
    // This will let you know the process has started
    console.log("Generating ETH Wallets...");

    // Import the package necessary for ethereum wallet generation
    // Thanks and credit to the creators <3
    // https://www.npmjs.com/package/web3
    const Web3 = require('web3');

    var numAddresses = count;

    // Create a new instance of Web3
    const web3 = await new Web3();

    let textAreaData = "";

    // Generate ETH addresses
    for (let i = 1; i < numAddresses + 1; i++) {

        // Generate a new wallet
        const wallet = web3.eth.accounts.create();

        // Access the private key and address
        const privateKey = wallet.privateKey;
        const address = wallet.address;

        // Append the data to textareaData
        const data = `"${i}","${address}","${privateKey}"\n`;
        textAreaData += data;

        // Set textAreaData as textarea.value
        textarea.value = textAreaData;
    }

}

async function generateXMRWallets(count, textarea) {
    // This will let you know the process has started
    console.log("Generating XMR Wallets...");

    // Import the package necessary for monero wallet generation
    // Thanks and credit to the creators <3
    // https://www.npmjs.com/package/monero-javascript
    let monerojs = require("monero-javascript");

    var numAddresses = count;

    let textAreaData = "";

    // Generate XMR addresses
    for (let i = 1; i < numAddresses + 1; i++) {
        let walletKeys = await monerojs.createWalletKeys({networkType: "mainnet", language: "English"});
        const address = await walletKeys.getAddress(0,0);
        const mnemonicSeed = await walletKeys.getMnemonic();

        const data = `"${i}","${address}","${mnemonicSeed}"\n`;
        textAreaData += data;

        // Set textAreaData as textarea.value
        textarea.value = textAreaData;
    }
}

function stripPrivateKeys() {
    const textarea = document.getElementById("wallets-textarea");

    const textareaValue = textarea.value;

    const lines = textareaValue.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        let secondCommaIndex = -1;
        let commaCount = 0;

        for (let j = 0; j < line.length; j++) {
            if (line[j] === ',') {
                commaCount++;
                if (commaCount === 2) {
                    secondCommaIndex = j;
                    break;
                }
            }
        }

        if (secondCommaIndex !== -1) {
            lines[i] = line.substring(0, secondCommaIndex);
        }
    }

    const modifiedTextareaValue = lines.join('\n');

    textarea.value = modifiedTextareaValue;
}

const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", async () => {
    const cryptoOption = document.getElementById("cryptocurrency");
    var count = parseInt(document.getElementById("count").value);
    const textarea = document.getElementById('wallets-textarea');

    if (cryptoOption.value == "btc-p2pkh") {
        await generateBTCWallets(count, "p2pkh", textarea);
        buttonsManagement(textarea);
    }
    else if (cryptoOption.value == "btc-p2sh") {
        await generateBTCWallets(count, "p2sh", textarea);
        buttonsManagement(textarea);
    }
    else if (cryptoOption.value == "btc-bech32") {
        await generateBTCWallets(count, "bech32", textarea);
        buttonsManagement(textarea);
    }
    else if (cryptoOption.value == "ltc") {
        await generateLTCWallets(count, textarea);
        buttonsManagement(textarea);
    }
    else if (cryptoOption.value == "eth") {
        await generateETHWallets(count, textarea);
        buttonsManagement(textarea);
    }
    else if (cryptoOption.value == "xmr") {
        await generateXMRWallets(count, textarea);
        buttonsManagement(textarea);
    }
})

function buttonsManagement(textarea) {
    if (textarea.value.length !== 0) {
        const saveToFileButton = document.getElementById("save-to-file");
        const stripPrivateKeysButton = document.getElementById("strip-private-keys");
        const clearAllButton = document.getElementById("clear-all");

        saveToFileButton.disabled = false;
        stripPrivateKeysButton.disabled = false;
        clearAllButton.disabled = false;
        
        if (!saveToFileButton.hasEventListener) {
            saveToFileButton.addEventListener("click", () => {
                // Create a new Blob object with the text
                var blob = new Blob([textarea.value], { type: "text/plain" });

                // Create a temporary anchor element
                var anchor = document.createElement("a");
                anchor.style.display = "none";
                document.body.appendChild(anchor);

                // Set the attributes for downloading the file
                anchor.href = window.URL.createObjectURL(blob);
                anchor.download = "eth-wallets.txt";

                // Simulate a click on the anchor element to trigger the download
                anchor.click();

                // Clean up
                document.body.removeChild(anchor);
            });
        }

        if (!stripPrivateKeysButton.hasEventListener) {
            stripPrivateKeysButton.addEventListener("click", () => {
                var confirmed = confirm("Confirm?");
        
                if (confirmed) {
                    stripPrivateKeys();
                }
            });
        }

        if (!clearAllButton.hasEventListener) {
            clearAllButton.addEventListener("click", () => {
                var confirmed = confirm("Confirm?");
        
                if (confirmed) {
                    textarea.value = "";
                    saveToFileButton.disabled = true;
                    stripPrivateKeysButton.disabled = true;
                    clearAllButton.disabled = true;
                } 
            });
        }
    }
}