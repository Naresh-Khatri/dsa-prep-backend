import  express from 'express'
const app = express()
import  morgan from 'morgan'
import  cors from 'cors'

import mainRoute from './routes/root.js'

const PORT = 3333;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
  next()
})
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/', mainRoute)
  
app.listen(PORT, () => { console.log(`Server up on http://localhost:${PORT}`) })