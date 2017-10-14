var HID = require('node-hid');

console.log(HID.devices())

var device = new HID.HID(5050,24);

device.on("data", function(data) {
  console.log(data.toString('utf8'));
});