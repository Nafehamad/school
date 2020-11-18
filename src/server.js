import app from './app';
import "@babel/polyfill"//polyfill any missing features and compiles between ecma version

//async will return apromise
//await will wait until promise set
async function main() {
    await app.listen(process.env.PORT);
    console.log("server run on 8085");
}
main();