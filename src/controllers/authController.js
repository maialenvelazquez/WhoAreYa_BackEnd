const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, config.jwtSecret, {
        expiresIn: '30d' // Tokenak 30 egun iraungo du
    });
};

exports.register = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        if(!name || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Datu guztiak sartzea beharrezkoa da'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email hori erregistratuta dago jada.' });
        }

        const isFirstAccount = (await User.countDocuments({})) === 0;
        const role = isFirstAccount ? 'admin' : 'user';

        const user = await User.create({
            name,
            lastName,
            email,
            password,
            role
        });

        const token = generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            message: 'Erabiltzailea ondo erregistratu da',
            token,
            user: {
                id: user._id,
                name: user.name,
                lastNme: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message:'Errorea erregistroan', error:error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Emaila eta pasahitza sartzea beharrezkoa da'
            });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                 success: false,
                 message: 'Ez da erabiltzailea existitzen'
            });
        }

        const batDator = await user.matchPassword(password);
        if (!batDator) {
            return res.status(401).json({
                  success: false,
                  message: 'Pasahitza okerra da'
            });
        }

        const token = generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
               success: true,
               message: 'Erabiltzailea ondo sartu da',
               token,
               user: {
                 id: user._id,
                 name: user.name,
                 lastName: user.lastName,
                 email: user.email,
                 role: user.role
                 }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Errorea login egitean', error: error.message });
    }
};

exports.logout = async (req, res) => {
      try {
         res.clearCookie("token");

         res.status(200).json({
             success: true,
             message: 'Saioa ondo itxi da'
         });
      }catch(error) {
         res.status(500).json({
            success: false,
            message: 'Errorea logout egitean',
            error: error.message
         });
      }
};