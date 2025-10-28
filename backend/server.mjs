import express from "express"   
const app = express();
const PORT = 3000
import cors from "cors";


app.use(express.json());
app.use(cors())

app.get('/api', (req, res) => {
  res.send('ny text');
});


app.listen(PORT, async () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});

