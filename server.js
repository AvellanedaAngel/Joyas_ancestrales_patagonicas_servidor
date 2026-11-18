const app = require("./src/app");
const { puerto } = require("./src/config/config");

app.listen(puerto, () => console.log(`http://localhost:${puerto}`));
