const fs = require('fs');
const axios = require('axios').default;
const path = require('path');

axios
  .get('https://raw.githubusercontent.com/duneanalytics/abstractions/master/ethereum/erc20/tokens.sql')
  .then((res) => {
    const sql = res.data;
    // const sql = fs.readFileSync('src/seeder/tokens.sql').toString();

    const re = /erc20.tokens \(contract_address, symbol, decimals\) FROM stdin;/;
    const m = sql.match(re);
    const lenToRemove = m['0'].length + 1;
    const erc20s = sql.slice(m.index + lenToRemove).split('\n');

    const tokens = [];

    for (let row of erc20s) {
      let re = /(\\\\x[0-9A-Za-z]{40})\s+(.+)\s+(\d{1,})/;
      const match = row.match(re);

      if (match) {
        const [_, addr, ticker, precision] = match;
        tokens.push({
          address: '0' + addr.slice(2),
          ticker,
          precision: parseInt(precision),
        });
      }
    }

    const json = JSON.stringify(tokens);
    const filePath = path.join(process.cwd(), '/src/constants');

    fs.writeFile(`${filePath}/tokens.json`, json, (err) => {
      if (err) {
        console.log(`Error writing file: tokens.json`, err);
      } else {
        console.log(`Successfully created tokens.json in ${filePath}`);
      }
    });
  });
