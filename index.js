const express = require("express");
const app = express();

app.use(express.json());

const jadwalBelajar = {
  senin: [
    { jam: "08.10 - 10.10", mapel: "Agama" },
    { jam: "10.40 - 15.00", mapel: "DDA" }
  ],
  selasa: [
    { jam: "07.30 - 08.10", mapel: "PJOK" },
    { jam: "09.30 - 13.20", mapel: "MTK" },
    { jam: "13.40 - 15.40", mapel: "IPAS" }
  ],
  rabu: [
    { jam: "07.30 - 08.50", mapel: "Sejarah" },
    { jam: "08.50 - 13.20", mapel: "DDA" },
    { jam: "13.40 - 15.00", mapel: "KKA" }
  ],
  kamis: [
    { jam: "07.30 - 08.50", mapel: "Bahasa Indonesia" },
    { jam: "08.50 - 12.00", mapel: "KKA" },
    { jam: "12.00 - 15.00", mapel: "Bahasa Inggris" },
    { jam: "15.00 - 15.40", mapel: "BK" }
  ],
  jumat: [
    { jam: "08.10 - 09.30", mapel: "Seni Budaya" },
    { jam: "09.30 - 11.20", mapel: "PPKN" },
    { jam: "11.20 - 12.40", mapel: "Bahasa Indonesia" },
    { jam: "12.40 - 14.20", mapel: "Bahasa Bali" },
    { jam: "14.20 - 15.40", mapel: "MTK" }
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
