import { app } from './app'

const server = app.listen(() => console.log(`Server is listening on port http://localhost:${process.env.PORT || 8080}`))

process.on('SIGINT', () => {
    server.close()  
    console.log('app finalizado');
})