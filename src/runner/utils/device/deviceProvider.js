/**
* Copyright (c) Maksym Rusynyk 2019 - present
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/* @flow */
import type { DeviceInterface } from './DeviceInterface';

const log = require('../../utils/log');
const AndroidEmulator = require('./AndroidEmulator');
const AndroidDevice = require('./AndroidDevice');
const IosSimulator = require('./IosSimulator');

const TAG = 'PIXELS_CATCHER::DEVICE_PROVIDER';

module.exports = (
  name: string,
  platform: string,
  isPhysicalDevice?: boolean,
  canStopDevice?: boolean = true,
): DeviceInterface => {
  if (platform === 'android') {
    return isPhysicalDevice
      ? new AndroidDevice(name)
      : new AndroidEmulator(name, canStopDevice);
  }

  if (!isPhysicalDevice) {
    return new IosSimulator(name, canStopDevice);
  }

  log.e(TAG, 'iOS devices are not supported yet');
  throw new Error('iOS devices are not supported yet');
};
