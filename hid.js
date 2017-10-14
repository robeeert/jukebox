var HID = require('node-hid');

console.log(HID.devices())

var device = new HID.HID(5050,24);

device.on("data", function(data) {
  console.log('utf8',data.toString('utf8'));
  console.log('hex',data.toString('hex'));
  console.log('base64',data.toString('base64'));
});