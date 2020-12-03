// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html

// let url1 = 'http://example.edu/'
// let url2 = 'https://www.google.com/fdsafsafsa.html'

const request = require('request');
const fs = require('fs');

const checkFileExists = (mypath) => {
  fs.access(mypath, fs.F_OK, (err) => {
    if (err) {
      // no file found
      // console.error(err)
      return
    } else {
    // file exists
    console.log('File already exists... overwriting...')
    }
  });
};

const fetcher = function(url, mypath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log(`Error is ${error}`);
    }
    fs.writeFile(mypath, body, (err) => {
      if (err) {
        console.log(`Error is ${err}`);
        console.log('Ending program');
        process.exit();
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${mypath}`);
    })
  });
};

const args = process.argv.slice(2)
let url = args[0];
let mypath = args[1];

checkFileExists(mypath);
fetcher(url, mypath);