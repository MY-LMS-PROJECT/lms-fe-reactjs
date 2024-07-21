export default function errApiRes(error) {
  let errMsg = error.response?.data?.message // string or array

  if (Array.isArray(errMsg) && errMsg.length > 0) {
    let _errMsg = errMsg.reduce((preValue, currentValue) => {
      return preValue + `${currentValue.field}: ${currentValue.error}, `
    }, '')
    errMsg = _errMsg
  }
}
