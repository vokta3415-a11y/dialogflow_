const express = require("express");
const app = express();

app.use(express.json());

const jadwalBelajar = {
  senin: [
    { jam: "08.00 - 09.00", mapel: "Agama" },
    { jam: "09.00 - 10.00", mapel: "DDA" }
  ],
  selasa: [
    { jam: "08.00 - 09.00", mapel: "PJOK" },
    { jam: "09.00 - 10.00", mapel: "MTK" },
    { jam: "10.30 - 11.30", mapel: "IPAS" }
  ],
  rabu: [
    { jam: "08.00 - 09.00", mapel: "Sejarah" },
    { jam: "09.00 - 10.00", mapel: "DDA" },
    { jam: "10.30 - 11.30", mapel: "KKA" }
  ],
  kamis: [
    { jam: "08.00 - 09.00", mapel: "Bahasa Indonesia" },
    { jam: "09.00 - 10.00", mapel: "KKA" },
    { jam: "10.30 - 11.30", mapel: "Bahasa Inggris" },
    { jam: "11.30 - 12.30", mapel: "BK" }
  ],
  jumat: [
    { jam: "08.00 - 09.00", mapel: "Seni Budaya" },
    { jam: "09.00 - 10.00", mapel: "PPKN" },
    { jam: "10.30 - 11.30", mapel: "Bahasa Indonesia" },
    { jam: "11.30 - 12.30", mapel: "Bahasa Bali" },
    { jam: "13.00 - 14.00", mapel: "MTK" }
  ]
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;

  if (!hari) {
    return res.json({
      fulfillmentText: "Silakan sebutkan hari belajar 😊"
    });
  }

  const jadwal = jadwalBelajar[hari.toLowerCase()];

  if (!jadwal) {
    return res.json({
      fulfillmentText: "Jadwal hanya tersedia dari Senin sampai Jumat 📚"
    });
  }

  let responseText = `📚 Jadwal belajar hari ${hari}:\n`;

  jadwal.forEach(item => {
    responseText += `${item.jam} - ${item.mapel}\n`;
  });

  res.json({
    fulfillmentText: responseText
  });
});

app.get("/", (req, res) => {
  res.send("Webhook Jadwal Belajar Aktif 🚀");
});

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
