import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cryptoLogos = {
  'btc': 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  'eth': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  'ada': 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  'xrp': 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
  'bnb': 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  'sol': 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  'doge': 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  'dot': 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
  'matic': 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
  'link': 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png'
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '..', 'public', 'images', filename);
    const fileStream = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

async function downloadAllLogos() {
  try {
    for (const [symbol, url] of Object.entries(cryptoLogos)) {
      await downloadImage(url, `${symbol}.png`);
    }
    console.log('All logos downloaded successfully!');
  } catch (error) {
    console.error('Error downloading logos:', error);
  }
}

downloadAllLogos(); 