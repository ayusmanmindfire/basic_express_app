import express from "express"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import dbConnect from "./database/connection.js"
import { errorHandler } from "./middleware/errorHandler.js"


const app = express()
const port = process.env.PORT||3001
app.use(express.json());

dbConnect();

app.use('/user',userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})