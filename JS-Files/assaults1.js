// const readline = require('readline');
// const fs = require('fs');

// const rl = readline.createInterface({
//   input: fs.createReadStream('Crimes_-_2001_to_present.csv'),
// });

// const myWriteStream1 = fs.createWriteStream('assaults.json');

// const outobj = {
// };
// for (let year = 2001; year <= 2016; year += 1) {
//   outobj[year.toString()] = { NumberOfAssault: 0, NumberOfArrested: 0 };
// }
// let firstline = 0;
// let T; let Y; let A;
// rl.on('line', (line) => {
//   const lineSplit = line.split(',', 20);
//   if (firstline === 0) {
//     Y = lineSplit.indexOf('Year');
//     T = lineSplit.indexOf('Primary Type');
//     A = lineSplit.indexOf('Arrest');
//     firstline += 1;
//   } else if (lineSplit[T] === 'ASSAULT' && (lineSplit[Y] >= 2001 && lineSplit[Y] <= 2016)) {
//     outobj[lineSplit[Y]].NumberOfAssault += 1;
//     if (lineSplit[A] === 'true') { outobj[lineSplit[Y]].NumberOfArrested += 1; }
//   }
// });
// rl.on('close', () => {
//   myWriteStream1.write(JSON.stringify(outobj, null, 2));
// });
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv'),
});
const writeStream = fs.createWriteStream('outputassault.json');

const allYears = [];
const assaultCases = [];
const arrested = [];
const notArrested = [];
let y = 2001;

for (let i = 0; i < 16; i += 1) {
  allYears.push(y.toString());
  assaultCases[i] = 0;
  arrested[i] = 0;
  notArrested[i] = 0;
  y += 1;
}

const outputobj = [];

let firstline = 0;
let Y; let A; let
  P;

let jsonFromLine = {
  Year: '', AssaultCases: '', Arrested: '', NotArrested: '',
};

rl.on('line', (line) => {
  const lineSplit = line.split(',', 20);

  if (firstline === 0) {
    Y = lineSplit.indexOf('Year');
    P = lineSplit.indexOf('Primary Type');
    A = lineSplit.indexOf('Arrest');
    firstline += 1;
  } else if (lineSplit[P] === 'ASSAULT' && (lineSplit[Y] >= 2001 && lineSplit[Y] <= 2016)) {
    const index = allYears.indexOf(lineSplit[Y]);
    assaultCases[index] += 1;
    if (lineSplit[A] === 'true') { arrested[index] += 1; } else { notArrested[index] += 1; }
  }
});

rl.on('close', () => {
  for (let i = 0; i < 16; i += 1) {
    jsonFromLine.Year = allYears[i];
    jsonFromLine.Arrested = arrested[i];
    jsonFromLine.NotArrested = notArrested[i];
    jsonFromLine.AssaultCases = assaultCases[i];
    outputobj.push(jsonFromLine);
    jsonFromLine = {
      Year: '', AssaultCases: '', Arrested: '', NotArrested: '',
    };
  }

  writeStream.write(JSON.stringify(outputobj, null, 2));
});