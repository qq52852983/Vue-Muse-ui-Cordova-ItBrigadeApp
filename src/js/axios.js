import Axios from 'axios'
const ip = 'http://192.168.2.188:3001/'

function axios_get(url, data, callback) {
  Axios.get(ip + url, {
    params: data
  }).then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err, 'err')
  })
}

function axios_post(url, data, callback) {
  Axios.post(ip + url, {
    params: data
  }).then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err, 'err')
  })
}
function axios_get_2(url,callback){
  Axios.get(url)
  .then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err, 'err')
  })
}
export {
  axios_get,axios_post,axios_get_2
}
