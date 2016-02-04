"use strict"
const UCBBandit = require("../index").UCBBandit
const assert = require("assert")
describe("UCBBandit", () => {
  it("default usage", () => {
    let arms = ["a", "b", "c"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.2)
    bandit.reward("b", 0.3)
    bandit.reward("a", 0.1)
    bandit.reward("b", 0.5)
    bandit.reward("c", 0.5)
    let result = bandit.select()
    let expect = [ "c", "b", "a"]
    assert.deepEqual(result, expect)
  })
  it("same value", () => {
    let arms = ["a", "b"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.5)
    bandit.reward("a", 0.3)
    bandit.reward("b", 0.5)
    bandit.reward("b", 0.3)
    let result = bandit.select()
    assert.deepEqual(["a", "b"], result)
  })
})