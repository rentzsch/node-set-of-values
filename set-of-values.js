"use strict";

const valueOrJson = require("value-or-json");

class SetOfValues extends Set {
  add(arg) {
    const argValue = valueOrJson(arg);
    if (this.originalReferences) {
      this.originalReferences.set(argValue, arg);
    }
    return super.add(argValue);
  }
  has(arg) {
    return super.has(valueOrJson(arg));
  }
  delete(arg) {
    const argValue = valueOrJson(arg);
    if (this.originalReferences) {
      this.originalReferences.delete(argValue);
    }
    return super.delete(argValue);
  }
  retainOrginalReferences() {
    this.originalReferences = new Map();
  }
}

module.exports = SetOfValues;
