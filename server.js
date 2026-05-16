import app from "./app.js";
import connnectDB from "./config/db.config.js";

const PORT = process.env.PORT || 3000;

connnectDB()

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
