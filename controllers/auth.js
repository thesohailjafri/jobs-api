const login = async (req, res) => {
    res.send(req.body)
}

const register = async (req, res) => {
    res.send(req.body)
}

module.exports = { login, register }