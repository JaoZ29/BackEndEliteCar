import { server } from './server';

const port: number= 3333;

server.listen(port, () => {
    console.log(`Server is running on port ${port}` );
});