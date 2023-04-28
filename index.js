const express = require("express");
const { default: mongoose } = require("mongoose");
const { routes } = require("./router/routeGET");

var cookies = require("cookie-parser");
const app = express();
const cors=require("cors")

require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                                   swagger                                  */
/* -------------------------------------------------------------------------- */

const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("./swagger-output.json");

/* -------------------------------------------------------------------------- */
/*                                 middlewear                                 */
/* -------------------------------------------------------------------------- */
const corsOprion={
  origin:"*", 
  credential:true,
  optionSuccessStatus:200

}
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors(corsOprion))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.use("/", routes);

/* -------------------------------------------------------------------------- */
/*                                ErrorHandler                                */
/* -------------------------------------------------------------------------- */

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "something went Wrong!!!!";
  return res.status(500).json({
    Success: false,
    status: errorStatus,
    message: errorMsg,
  });
});

/* -------------------------------------------------------------------------- */
/*                            Data base Connection                            */
/* -------------------------------------------------------------------------- */
const mongoDbConnect = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Mongo Atlas DataBase Connected!!!`);
};
mongoDbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
