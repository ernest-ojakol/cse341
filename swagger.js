const swaggerAutogen = require("swagger-autogen")();

const doc ={
    info:{
        title:"Contacts API",
        description: "Contacts API"
    },
    host: "localhost:3000",
    schemes: ["https","http"]
};

const outputfile="./swagger.json";
const endpointsfiles=["./routes/index.js"]

swaggerAutogen(outputfile,endpointsfiles,doc);
