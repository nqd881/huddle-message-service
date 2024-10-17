"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueValueObjects = void 0;
const lodash_1 = require("lodash");
const getUniqueValueObjects = (valueObjects) => {
    return (0, lodash_1.uniqWith)(valueObjects, (x, y) => x.equals(y));
};
exports.getUniqueValueObjects = getUniqueValueObjects;
