import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products"
      }
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Production",
      
    }
  },
  apis: ["./src/rutes/ruter.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions : SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link{
    content: url('https://c4.wallpaperflare.com/wallpaper/657/970/486/poro-leona-league-of-legends-wallpaper-preview.jpg');
    height: 120px;
    width: 400px;
    }
    .swagger-ui .topbar{
      background-color:rgb(23, 82, 43);
    }
    `
  ,
  customSiteTitle: "Documentation REST API Node.js / Express / TypeScript",
}

export default swaggerSpec
export { swaggerUiOptions }