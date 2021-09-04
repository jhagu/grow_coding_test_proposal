class BadRequestError extends Error {
  constructor(code, message){
    super(message)
    this.code = code
    this.name = 'BadRequestError'
    this.severity = 'LOW'
    this.status = 400
  }
}
module.exports = {
  BadRequestError
}