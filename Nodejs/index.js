const fs = require("fs");

for (let i = 0; i < 10; i++) {
  fs.readFile("./read.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
}
