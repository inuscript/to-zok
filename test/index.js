"use strict"
const UCBBandit = require("../index").UCBBandit
const assert = require("assert")
describe("UCBBandit", () => {
  it("default usage", () => {
    let arms = ["a", "b", "c"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.2)
    bandit.reward("c", 0.3)
    bandit.reward("a", 0.1)
    bandit.reward("c", 0.5)
    bandit.reward("b", 0.5)
    let result = bandit.select()
    let expect = [ "b", "c", "a"]
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
  it("no select", () => {
    let arms = ["a", "b"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.5)
    bandit.reward("a", 0.3)
    let result = bandit.select()
    assert.deepEqual(["b", "a"], result)
  })
  it("ignore unknown reward", () => {
    let arms = ["a", "b"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.5)
    bandit.reward("b", 0.5)
    bandit.reward("xxx", 0.3)
    let result = bandit.select()
    assert.deepEqual(["a", "b"], result)
  })
  it("serialize", () => {
    let arms = ["a", "b", "c"]
    let bandit = new UCBBandit(arms)
    bandit.reward("a", 0.2)
    bandit.reward("c", 0.3)
    bandit.reward("a", 0.1)
    bandit.reward("c", 0.5)
    bandit.reward("b", 0.5)
    let result = bandit.serialize()
    let expect = [ 
      { name: 'b', count: 1, expectation: 0.5, ucb: 2.2941225779941012 },
      { name: 'c', count: 2, expectation: 0.4, ucb: 1.6686362411795197 },
      { name: 'a', count: 2, expectation: 0.15000000000000002, ucb: 1.4186362411795197 } 
    ]
    assert.deepEqual(result, expect)
  })
})