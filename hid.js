var HID = require('node-hid');

console.log(HID.devices())

var device = new HID.HID(5050,24);

let combinedData = '';

device.on("data", function(data) {
  let parsedData = parseInt(data.toString('hex'),16);
  if (parsedData === 0) {
    test(combinedData);
    combinedData = '';
  } else {
    combinedData + parsedData;
  }
});

function test(combinedData) {
  console.log(combinedData);
}