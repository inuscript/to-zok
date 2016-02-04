# To-zok
UCB Bandit tool


```js
const UCBBandit = require("@inuscript/to-zok").UCBBandit

let arms = ["a", "b", "c"]
let bandit = new UCBBandit(arms)
bandit.reward("a", 0.2)
bandit.reward("b", 0.3)
bandit.reward("a", 0.1)
bandit.reward("b", 0.5)
bandit.reward("c", 0.5)
let result = bandit.select()
console.log(result)
// [ "c", "b", "a"]

```