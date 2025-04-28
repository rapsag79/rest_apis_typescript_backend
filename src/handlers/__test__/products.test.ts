import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({})
    
    expect (response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
    
    expect (response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
   })

  it("should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
        name: "Mouse HP",
        price: "0"
    })
    
    expect (response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    
    expect (response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
   })

  it("should validate that the price is a number and greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
        name: "Mouse HP",
        price: "Hola"
    })
    
    expect (response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    
    expect (response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
   })

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
        name: "Mouse Naceb",
        price: "150"
    })

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => { 

  it("Should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");    
    expect(response.status).not.toBe(400);
   })

  it("GET a JSON response whit all the products", async () => {
    const response = await request(server).get("/api/products");    
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");

   })
});

describe("GET /api/products/:id", () => { 
  it("Sould return a 404 response for a non-esxisting product", async () => { 
    const productId = 1000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("No existe el producto")
  })

  it("Should check if a valid ID in the URL ", async () => { 
    const response = await request(server).get("/api/products/not-valid-url");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("Should return a JSON response for a single product", async () => { 
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  })
});

describe("PUT /api/products/:id", () => { 
  it("Should check if a valid ID in the URL ", async () => { 
    const response = await request(server)
                                  .put("/api/products/not-valid-url")
                                  .send({
                                    name: "Monitor Curvo Samsung",
                                    price: 300,
                                    availability: true
                                  });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El id debe ser numerico");
  });

  it("Should display validation errors messages when updating a product ", async () => { 
    const response = await request(server).put("/api/products/1").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Should validate that the price is greater than 0", async () => { 
    const response = await request(server)
                                  .put("/api/products/1")
                                  .send({
                                    name: "Monitor Curvo Samsung",
                                    price: 0,
                                    availability: true
                                  });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El precio debe ser mayor a 0");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Should return a  404 response for a non-existing product", async () => { 
    const productId = 1000;
    const response = await request(server)
                                  .put(`/api/products/${productId}`)
                                  .send({
                                    name: "Monitor Curvo Samsung",
                                    price: 300,
                                    availability: true
                                  });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No existe el producto");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Should update a existing product whith valid data", async () => { 
    const response = await request(server)
                                  .put(`/api/products/1`)
                                  .send({
                                    name: "Monitor Curvo LG",
                                    price: 300,
                                    availability: true
                                  });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });

});

describe("PATCH /api/products/:id", () => {
  it("should return a 404 response for a non-existing product", async () => {
    const productId = 1000;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No existe el producto");
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should update the product availability", async () => { 
    const response = await request(server).patch("/api/products/1")
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toBe(false);

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
})

describe("DELETE /api/products/:id", () => { 
  it("Should check a valid ID", async () => {
    const response = await request(server).delete("/api/products/not-valid-url");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("El id debe ser numerico")
  });

  it("Should return a 404 response for a non-existing product", async () => { 
    const productId = 1000;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No existe el producto");
    expect(response.status).not.toBe(200);
  });

  it("should delete a product", async () => { 
    const response = await request(server).delete("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Producto Eliminado");
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});