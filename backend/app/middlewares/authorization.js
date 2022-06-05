const jwt = require('jsonwebtoken');
const usersService = require("../services/users")

module.exports = {
    async authorize(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "Apalah"
            );

            req.user = await usersService.get(tokenPayload.id);

            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login first!"
            });
        }
    },

    async checkSuperAdmin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "Apalah"
            );

            req.user = await usersService.get(tokenPayload.id);
            if (!req.user.isSuperAdmin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: 'You are not superadmin!!'
                })
                return;
            }
            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login first!!"
            });
        }
    },

    async checkAdmin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization
            const token = bearerToken.split("Bearer ")[1]
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "Apalah"
            );

            req.user = await usersService.get(tokenPayload.id);
            if (!req.user.isAdmin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: 'You are not Admin!'
                })

                return;
            }
            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login!!"
            });
        }
    },
}