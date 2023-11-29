const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3004;


app.get ('/' , (req,res)  =>{
    res.send("<h1>Created a Timestamp</h1>")
})

app.get('/create-file', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const content = `Current Timestamp: ${timestamp}`;
    const filename = `${timestamp}.txt`; // Specify the desired extension here

    const folderPath = 'C:\\Users\\User\\\\Desktop\\Node-DAY1\\files';
    

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const filePath = path.join(folderPath, filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }
        res.status(200).send('File created successfully');
    });
});



app.get('/get-files', (req, res) => {
  const folderPath = path.join(__dirname, 'files');

  fs.readdir(folderPath, (err, files) => {
      if (err) {
          return res.status(500).send('Error reading files');
      }

      // Filter only text files
      const textFiles = files.filter(file => file.endsWith('.txt'));

      res.status(200).json({ files: textFiles });
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
