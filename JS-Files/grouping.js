const readline = require('readline');


const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./Crimes_-_2001_to_present.csv'),
});

const myWriteStream2 = fs.createWriteStream('grouping.json');

const output = [];
let temp = {label:"", value:""};
// let temp = {
//     NumberOfIndexCrime: '', NumberOfNonIndexCrime: '', NumberOfViolentCrime: '', NumberofPropertyCrime: '',
// };

// let indexCrime = 0;


// let nonIndexCrime = 0;


// let violentCrime = 0;


// let propertyCrime = 0;

let value = [0,0,0,0];
const label = ["NumberOfIndexCrime","NumberOfNonIndexCrime","NumberOfViolentCrime","NumberOfPropertyCrime"];

const violent = ['0110', '0130', '0261', '0262', '0263', '0264', '0265', '0266',
    '0271', '0272', '0273', '0274', '0275', '0281', '0291', '1753', '1754', '0312',
    '0313', '031A', '031B', '0320', '0325', '0326', '0330', '0331',
    '0334', '0337', '033A', '033B', '0340', '051A', '051B', '0520', '0530', '0550',
    '0551', '0552', '0553', '0555', '0556', '0557', '0558', '041A', '041B', '0420',
    '0430', '0450', '0451', '0452', '0453', '0461', '0462', '0479',
    '0480', '0481', '0482', '0483', '0485', '0488', '0489', '0490', '0491',
    '0492', '0493', '0495', '0496', '0497', '0498', '0510'];


const property = ['0610', '0620', '0630', '0650', '0810', '0820', '0840', '0841', '0842',
    '0843', '0850', '0860', '0865', '0870', '0880', '0890', '0895', '0910', '0915',
    '0917', '0918', '0920', '0925', '0927', '0928', '0930', '0935',
    '0937', '0938', '1010', '1020', '1025', '1090'];


const index = violent.concat(property);

let firstLine = 0;
let indexLocation;
var lineSplit;

rl.on('line', (line) => {
    lineSplit = line.split(',', 20);
    if (firstLine === 0) {
        indexLocation = lineSplit.indexOf('IUCR');
        year = lineSplit.indexOf('Year');
        firstLine += 1;
    }
    else 
    
    if (lineSplit[year] === "2015") {
        if (index.indexOf(lineSplit[indexLocation]) > -1) {
            value[0] += 1;
            if (violent.indexOf(lineSplit[indexLocation]) > -1) value[2] += 1;
            if (property.indexOf(lineSplit[indexLocation]) > -1) value[3] += 1;
        }
        else
            value[1] += 1;
    }
});

rl.on('close', () => {
    // temp.NumberOfIndexCrime = indexCrime;
    // temp.NumberOfNonIndexCrime = nonIndexCrime;
    // temp.NumberOfViolentCrime = violentCrime;
    // temp.NumberofPropertyCrime = propertyCrime;
    for (var i=0;i<=3;i+=1){
        temp.label = label[i];
        temp.value = value[i];
        output.push(temp);
        temp = {label:"", value:""};
    }
    

    myWriteStream2.write(JSON.stringify(output, null, 2));
});
