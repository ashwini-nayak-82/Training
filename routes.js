import userapihandler from "./src/controller/manageuser/apihandler.js";

const router = (app) => {
  console.log("ROUTES WORKING");
  app.use("/user", userapihandler);
};

export default router;
