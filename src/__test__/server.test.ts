import  { connectDB } from "../server";
import db from "../config/db";
import colors from "colors";

//Mock DB
jest.mock("../config/db")

describe("conectDB", () => { 
  it("should handle database connection error", async () => {
    jest.spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("hubo un error al conectar a la base de datos"));
    
    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(colors.red.bold("hubo un error al conectar a la base de datos"))
    );
  })
});


//Docs
