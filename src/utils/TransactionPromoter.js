import TryteCodec from 'tryte-utf8-json-codec'

const transfer = [{
  address: ''.padEnd(81, '9'),
  value: 0,
  message: TryteCodec.trytesFromUTF8String('This promotion transaction was created by open-iota at https://open-iota.prizziota.com/'),
  tag: 'OPENIOTA'
}]

// returns a depth in [4, 12] inclusive
function generateDepth() {
  return Math.floor(Math.random() * (12 - 4 + 1)) + 4
}

export async function promoteTransaction({ hash, iotaAPI }) {
  console.log('promoting')
  return new Promise((resolve, reject) => {
    iotaAPI.promoteTransaction(hash, generateDepth(), 14, transfer, {}, (error, response) => {
      console.log('finished promoting, err: ', error)
      console.log('finished promoting, response: ', response)
      if(error) {
        return reject(error)
      }
      resolve(response)
    })
  })
}

// module.exports = {
//   promoteTransaction
// }
