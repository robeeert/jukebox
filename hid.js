var HID = require('node-hid');

console.log(HID.devices())

var device = new HID.HID('0001:0004:00');

device.on("data", function(data) {
  console.log(data);
});