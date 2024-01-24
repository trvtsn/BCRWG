# BCRWG - Bulk Cryptocurrency Wallet Generator

BCRWG is a simple HTML page with a bundled JavaScript file that allows you to generate multiple cryptocurrency wallets offline. The project is written in Node.js but can be used seamlessly with the bundled JavaScript file. It currently supports BTC, LTC, ETH, and XMR wallet generation, with options for P2PKH, P2SH, and Bech32 wallets for BTC.

## Features

- **Simple and Offline:** BCRWG provides a straightforward interface and can be used offline with the included bundle.js file.

- **Cryptocurrency Support:** Generate wallets for BTC, LTC, ETH, and XMR. BTC supports P2PKH, P2SH, and Bech32 wallet types.

## Building from Source

To build BCRWG from source, follow these steps:

1. Clone the repository
   
   ```bash
   git clone https://github.com/trvtsn/BCRWG

2. Ensure that your bitcoinjs-lib library is on version 4.0.3.
   
   ```bash
   npm install bitcoinjs-lib@4.0.3
   
3. Modify the monero-javascript library to have the wasm in base64 format. This will eliminate the need for fs.readFileSync to load the wasm necessary for monero wallet generation, as the function only works on servers and not in the browser.

## To-Do List

- Add support for more cryptocurrencies, such as:
  - Bitcoin Cash
  - Ripple
  - Tether
  - XRP
  - ChainLink
  - XLM Stellar
  - TRX Tron

## Known Issues

- **Confirm Pop-Up:** The confirm pop-up appears multiple times, equivalent to the number of times you've pressed the Generate button.

Feel free to contribute to BCRWG by addressing the to-do list items or fixing bugs. Your contributions are highly appreciated!

**Happy Wallet Generating!**
