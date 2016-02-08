"use strict"
class Arm{
  constructor( obj ){
    this.label = obj.label
    this.rewards = []
  }
  reward(r){
    this.rewards.push(r)
  }
  get count(){
    return this.rewards.length
  }
  get sum(){
    return this.rewards.reduce( (sum, val ) => sum + val, 0)
  }
  get expectation(){
    return this.sum / this.count
  }
  calcUCB(n){
    if(this.count === 0){
      return Number.MAX_VALUE
    }
    return this.expectation + Math.sqrt(2 * Math.log(n) / this.count)
  }
}

class UCBBandit{
  constructor( arms ){
    // this.arms = arms.length
    this.arms = arms.map( (label) => {
      return new Arm({label})
    })
  }
  get n(){
    return this.arms.reduce( (sum, arm) =>  sum + arm.count, 0)
  }
  searchArm(label){
    return this.arms.find( (arm) => arm.label === label)
  }
  reward(label, reward){
    let arm = this.searchArm(label)
    if(!arm){
      return // ignore
    }
    arm.reward(reward)    
  }
  calcValues(){
    return this.arms.map( (arm) => {
      return {
        arm: arm,
        ucb: arm.calcUCB(this.n) 
      }
    })
  }
  calc(){
    let valuesUCB = this.calcValues()
    return valuesUCB.concat().sort((a, b) => a.ucb < b.ucb)
  }
  select(){
    return this.calc().map( (v) => {
      return v.arm.label
    })
  }
  serialize(){
    return this.calc().map( (val) => {
      let arm = val.arm
      let ucb = val.ucb
      return {
        label: arm.label,
        count: arm.count,
        expectation: arm.expectation,
        ucb: ucb
      }
    })
  }
}
exports.UCBBandit = UCBBandit