"use strict";

const valueOrJson = require("value-or-json");
const assert = require("assert");
import test from "ava";

test("fail on no args", t => {
  t.throws(() => {
    valueOrJson();
  }, assert.AssertionError);
});

test("string", t => {
  needsStringifyAndDeepEqual(t, "", false, "");
  needsStringifyAndDeepEqual(t, "a", false, "a");
});

test("number", t => {
  needsStringifyAndDeepEqual(t, 0, false, 0);
  needsStringifyAndDeepEqual(t, -0, false, -0);
  needsStringifyAndDeepEqual(t, 1, false, 1);
  needsStringifyAndDeepEqual(t, Number.MIN_VALUE, false, Number.MIN_VALUE);
  needsStringifyAndDeepEqual(t, Number.MAX_VALUE, false, Number.MAX_VALUE);
  needsStringifyAndDeepEqual(
    t,
    Number.NEGATIVE_INFINITY,
    false,
    Number.NEGATIVE_INFINITY
  );
  needsStringifyAndDeepEqual(
    t,
    Number.POSITIVE_INFINITY,
    false,
    Number.POSITIVE_INFINITY
  );
  needsStringifyAndDeepEqual(t, NaN, false, NaN);
});

test("boolean", t => {
  needsStringifyAndDeepEqual(t, true, false, true);
  needsStringifyAndDeepEqual(t, false, false, false);
});

test("symbol", t => {
  const emptySym1 = Symbol();
  const emptySym2 = Symbol();
  needsStringifyAndDeepEqual(t, emptySym1, false, emptySym1);
  t.notDeepEqual(valueOrJson(emptySym1), emptySym2);

  const symWithDesc1 = Symbol("symWithDesc1");
  const symWithDesc2 = Symbol("symWithDesc2");
  needsStringifyAndDeepEqual(t, symWithDesc1, false, symWithDesc1);
  t.notDeepEqual(valueOrJson(symWithDesc1), symWithDesc2);
});

test("undefined", t => {
  needsStringifyAndDeepEqual(t, undefined, false, undefined);
});

test("function", t => {
  needsStringifyAndDeepEqual(t, f, false, f);
  function f() {}
});

test("object", t => {
  needsStringifyAndDeepEqual(t, {}, true, "{}");
  needsStringifyAndDeepEqual(t, { key: "value" }, true, '{"key":"value"}');
});

function needsStringifyAndDeepEqual(
  t,
  value,
  expectedStringify,
  expectedValue
) {
  t.is(valueOrJson.needsStringify(value), expectedStringify);
  t.deepEqual(valueOrJson(value), expectedValue);
}
