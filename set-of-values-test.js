"use strict";

const SetOfValues = require("./set-of-values");
import test from "ava";

test("basic", t => {
  const objValue = { a: "a" };
  const duplicateValue = { a: "a" };
  const duplicateValueButNeverAdded = { a: "a" };

  // Empty.

  const plainSet = new Set();
  const setOfValues = new SetOfValues();
  setOfValues.retainOrginalReferences();

  t.is(plainSet.size, 0);
  t.is(setOfValues.size, 0);

  t.false(plainSet.has(objValue));
  t.false(setOfValues.has(objValue));

  t.false(plainSet.has(duplicateValue));
  t.false(setOfValues.has(duplicateValue));

  t.false(plainSet.has(duplicateValueButNeverAdded));
  t.false(setOfValues.has(duplicateValueButNeverAdded));

  // One entry.

  plainSet.add(objValue);
  setOfValues.add(objValue);

  t.is(plainSet.size, 1);
  t.is(setOfValues.size, 1);

  t.true(plainSet.has(objValue));
  t.true(setOfValues.has(objValue));

  t.false(plainSet.has(duplicateValue));
  t.true(setOfValues.has(duplicateValue));

  t.false(plainSet.has(duplicateValueButNeverAdded));
  t.true(setOfValues.has(duplicateValueButNeverAdded));

  // Add the same object twice.

  plainSet.add(objValue);
  setOfValues.add(objValue);

  t.is(plainSet.size, 1);
  t.is(setOfValues.size, 1);

  t.true(plainSet.has(objValue));
  t.true(setOfValues.has(objValue));

  t.false(plainSet.has(duplicateValue));
  t.true(setOfValues.has(duplicateValue));

  t.false(plainSet.has(duplicateValueButNeverAdded));
  t.true(setOfValues.has(duplicateValueButNeverAdded));

  // Add another object with same value.

  plainSet.add(duplicateValue);
  setOfValues.add(duplicateValue);

  t.is(plainSet.size, 2);
  t.is(setOfValues.size, 1);

  t.true(plainSet.has(objValue));
  t.true(plainSet.has(duplicateValue));

  t.true(setOfValues.has(objValue));
  t.true(setOfValues.has(duplicateValue));

  t.false(plainSet.has(duplicateValueButNeverAdded));
  t.true(setOfValues.has(duplicateValueButNeverAdded));

  // originalReferences functionality.

  t.deepEqual(setOfValues.values().next().value, JSON.stringify(objValue));
  t.deepEqual(setOfValues.originalReferences.values().next().value, objValue);

  // Delete the duplicate value.

  plainSet.delete(duplicateValue);
  setOfValues.delete(duplicateValue);

  t.is(plainSet.size, 1);
  t.is(setOfValues.size, 0);

  t.true(plainSet.has(objValue));
  t.false(plainSet.has(duplicateValue));

  t.false(setOfValues.has(objValue));
  t.false(setOfValues.has(duplicateValue));

  t.false(plainSet.has(duplicateValueButNeverAdded));
  t.false(setOfValues.has(duplicateValueButNeverAdded));
});
