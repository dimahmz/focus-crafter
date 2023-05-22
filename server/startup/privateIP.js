const os = require("os");
require("dotenv").config();

const configuringENV = function () {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  process.env.local_ipv4_adress = addresses[0];
  process.env.app_domain_name = `http://${addresses[0]}:${process.env.PORT}`;
};

module.exports = configuringENV;
