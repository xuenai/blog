import mongoose from 'mongoose'
import config from '../config'

const database = () => {
  mongoose.set('debug', true)
  mongoose.set('useCreateIndex', true)
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true,
    autoReconnect: true
  })
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath, {
      useNewUrlParser: true,
    })
  })
  mongoose.connection.on('error', err => {
    console.error('mongoose connect err: ', err)
  })

  mongoose.connection.on('open', async () => {
    console.log('connected to MongoDB ', config.dbPath)
  })
}

export default database