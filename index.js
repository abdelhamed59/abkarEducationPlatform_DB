import express from 'express'
import 'dotenv/config.js'
import connection from './DB/connection.js'
import { Bootstrap } from './modules/bootstrap.js'
import AppError from './utili/appError.js'
import passport from "passport"
import session from 'express-session'

const app = express()
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
const port = 3000
app.use(express.json())
app.use("/uploads", express.static("uploads"))
connection()
Bootstrap(app)






app.get('/', (req, res) => res.status(201).json('Hello World!'))

app.use("**", (req, res, next) => {

    next(new AppError("invalid URL", 404))
  })
  
  app.use((err, req, res, next) => {
    res.status(err.code).send({ message: err.message, stack: err.stack })
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))