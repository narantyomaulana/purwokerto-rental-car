
const usersService = require("../services/users")

module.exports = {
    async checkCondition(req, res, next) {
        const { email, password } = req.body;
        if (password.length < 8) {
            res.status(400).json({
                status: 'failed',
                message: 'Password must have at least 8 characters!'
            })
            return;
        }


        const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g

        if (email == '' || email.search(filter) == -1) {
            res.status(400).json({
                status: 'failed',
                message: 'Wrong email format!'
            })
            return;
        }

        const uniqueEmail = await usersService.getOne({
            where: { email }
        });
    
        if (uniqueEmail) {
            res.status(400).json({
                status: 'failed',
                message: 'Email already taken!'
            })
            return;
        }

        next();
    },
}