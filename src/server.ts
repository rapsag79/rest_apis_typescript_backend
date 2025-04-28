import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi  from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./rutes/ruter";
import db from "./config/db";

//conectar a la base de datos

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue("conectado a la base de datos"));
    
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("hubo un error al conectar a la base de datos"));
    
    
  }
}

//Conecta a la base de datos
connectDB();

//crear el servidor
const server = express();

//Permitir Conexiones 
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if(origin === process.env.FRONT_URL ||  "http://localhost:3001") {
       callback(null, true);
    } else {
       callback(new Error("Not allowed by CORS"));  
    }
     
  }
}

server.use(cors(corsOptions));


//Middlewares
server.use(express.json());

server.use(morgan("dev"));

server.use("/api/products", router);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions));



export default server;