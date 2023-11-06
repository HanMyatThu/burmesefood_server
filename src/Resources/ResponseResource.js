export const ResponseResource = (res,statusCode,error,data) => {
    return res.status(statusCode).send({
        statusCode,
        error: error ? {
            message: error
        }: null,
        data
    })
}