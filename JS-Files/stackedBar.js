const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./Crimes_-_2001_to_present.csv'),
});

const myWriteStream = fs.createWriteStream('stacked.json');
// var myWriteStream1 = fs.createWriteStream("./json/theft.json");

const allYears = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
const over500 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const under500 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const output = [];

// var outobj = {
// }

// for (var year = 2001; year <= 2016; year++) {
//     outobj[year.toString()] = { "Over$500": 0, "$500AndUnder": 0 };
// }

let jsonFromLine = { Year: '', Over$500: '', $500AndUnder: '' };
// var firstline = 0;
// var Y,T,D;

rl.on('line', (line) => {
  const lineSplit = line.split(',', 20);

  // if (firstline == 0) {
  //     Y = lineSplit.indexOf('Year');
  //     T = lineSplit.indexOf('Primary Type');
  //     D = lineSplit.indexOf('Description');
  //     firstline++;
  // }

  // else {
  //     if (lineSplit[T] === "THEFT" && (lineSplit[Y] >= 2001 && lineSplit[Y] <= 2016)) {
  //         if (lineSplit[D] === "OVER $500") { outobj[lineSplit[Y]]["Over$500"] += 1; }
  //         else if (lineSplit[D] === "$500 AND UNDER")
  //  { outobj[lineSplit[Y]]["$500AndUnder"] += 1; }
  //     }


  const index = allYears.indexOf(lineSplit[17]);
  if (index > -1) {
    if (line.indexOf('OVER $500') > -1) {
      over500[index] += 1;
    } else if (line.indexOf('$500 AND UNDER') > -1) {
      under500[index] += 1;
    }
  }
});


rl.on('close', () => {
  for (const i in allYears) {
    jsonFromLine.Year = allYears[i];
    jsonFromLine.Over$500 = over500[i];
    jsonFromLine.$500AndUnder = under500[i];
    output.push(jsonFromLine);
    jsonFromLine = { Year: '', Over$500: '', $500AndUnder: '' };
  }

  myWriteStream.write(JSON.stringify(output, null, 2));

  // myWriteStream1.write(JSON.stringify(outobj, null, 2));
});
