const usersService = require("../../../services/users")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async createUser(req, res) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        usersService.create({
                email: email.toLowerCase(),
                password: hashedPassword,
            })
            .then((createdUser) => {
                res.status(201).json({
                    status: "Success",
                    message: "User Successfully Registered!",
                    data: {
                        id:createdUser.id,
                        email,
                        
                    }
                });
            }).catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    async login(req, res) {
        const user = req.user;
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, process.env.JWT_PRIVATE_KEY || 'Apalah', {
            expiresIn: '1h'
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    },

    async whoAmI(req, res) {
        res.status(200).json(req.user);
    },

    async intoAdmin(req, res) {
 
        const user = await usersService.get(req.params.id)
        if (!user) {
            res.status(404).json({
                status: "FAIL",
                message: `User with id ${req.params.id} not found!`,
            });
            return;
        }

        const admin = req.body.isAdmin;

        usersService.update(req.params.id, {
            isAdmin: admin
        }).then(() => {
            res.status(200).json({
                status: "OK",
                message: `User with id ${req.params.id} is now admin`
            });
        }).catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    }
};
