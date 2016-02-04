# To-zok
UCB Bandit tool


```js
const UCBBandit = require("@inuscript/to-zok").ucb

let arms = ["a", "b", "c"] // labeled arms
let bandit = new UCBBandit(arms)
bandit.reward("a", 0.2)
bandit.reward("b", 0.3)
bandit.reward("b", 0.5)
bandit.reward("c", 0.5)
let result = bandit.calcValues()
let expect = [ 1.8651092223153953, 1.5774100225154748, 2.1651092223153956 ]
assert.deepEqual(result, expect)

```