const express = require("express");
const app = express();
app.use(express.json());

const jadwal = {
  senin: [
    { jam: "08.00 - 09.00", mapel: "Matematika" },
    { jam: "09.00 - 10.00", mapel: "Bahasa Indonesia" },
    { jam: "10.30 - 11.30", mapel: "IPA" }
  ],
  selasa: [
    { jam: "08.00 - 09.00", mapel: "Bahasa Inggris" },
    { jam: "09.00 - 10.00", mapel: "IPS" }
  ],
  rabu: [
    { jam: "08.00 - 09.00", mapel: "PKN" }
  ]
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;

  if (!hari || !jadwal[hari]) {
    return res.json({
      fulfillmentText: "Maaf jadwal tidak ditemukan 😢"
    });
  }

  let respon = `📚 Jadwal hari ${hari}:\n`;
  jadwal[hari].forEach(j => {
    respon += `${j.jam} - ${j.mapel}\n`;
  });

  res.json({
    fulfillmentText: respon
  });
});

app.get("/", (req,res)=>{
  res.send("Webhook aktif 🚀");
})

app.listen(3000, () => console.log("Server jalan"));
