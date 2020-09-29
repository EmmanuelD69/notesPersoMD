const fs = require("fs");

fs.writeFile("message.txt", "Hello there!", (err) => {
  if (err) throw err;

  console.log("un fichier a été écrit");
});
