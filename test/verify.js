'use strict'

const testData = require('./data/test_data')
const time2text = require('../time2text')

console.log('Testing time2text ...')

const failedTests = testData
  .filter((item) => {
    item.actual = time2text(item.time)
    return item.text !== item.actual
  })
  .map((item) => {
    return {
      time: item.time,
      expected: item.text,
      actual: item.actual
    }
  })

if (failedTests.length > 0) {
  console.log(testData.length - failedTests.length + ' Passed')
  console.log(failedTests.length + ' Failed')
  const randomIndex = Math.floor(Math.random() * failedTests.length)
  const randomFailure = failedTests[randomIndex]
  console.log('For example, "' + randomFailure.time + '"',
    'expected("' + randomFailure.expected + '") ',
    'actual("' + randomFailure.actual + '")')
  console.log(`The following times have errors:`)
  for (var i = 0; i < failedTests.length; i++) {
    console.log(failedTests[i].time, " got ", failedTests[i].actual)
  }
} else {
  console.log('Success! No failures!')
}
