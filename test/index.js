"use strict"
const UCBBandit = require("../index").UCBBandit
const assert = require("assert")
describe("UCBBandit", () => {
  it("default usage", () => {
    let arms = ["a", "b", "c"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.2)
    bandit.reward("b", 0.3)
    bandit.reward("b", 0.5)
    bandit.reward("c", 0.5)
    let result = bandit.calcValues()
    let expect = [ 1.8651092223153953, 1.5774100225154748, 2.1651092223153956 ]
    assert.deepEqual(result, expect)
  })
  it("same value", () => {
    let arms = ["a", "b"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.2)
    bandit.reward("b", 0.2)
    let result = bandit.calc()
    console.log(result)
    assert.deepEqual(["a", "b"], result)
  })
})