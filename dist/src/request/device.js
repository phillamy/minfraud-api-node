"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const errors_1 = require("../errors");
class Device {
    constructor(device) {
        if (device.ipAddress != null && (0, net_1.isIP)(device.ipAddress) === 0) {
            throw new errors_1.ArgumentError('`device.ipAddress` is an invalid IP address');
        }
        Object.assign(this, device);
    }
}
exports.default = Device;
