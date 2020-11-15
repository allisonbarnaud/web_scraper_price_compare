module.exports = (request, response, next) => {
    console.log(`${request.method} ${request.path} ${new Date()}`)
    console.log(request.headers)
    next()
}