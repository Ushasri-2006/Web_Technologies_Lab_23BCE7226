// Import file system module
const fs = require('fs');

// 1. CREATE + WRITE FILE
fs.writeFile('sample.txt', 'Hello! This is created using Node.js.\n', (err) => {
  if (err) {
    console.log('Error creating file:', err);
    return;
  }
  console.log('File created and data written successfully.');

  // 2. READ FILE
  fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }
    console.log('\nFile Content:\n', data);

    // 3. APPEND FILE
    fs.appendFile('sample.txt', 'This line is appended.\n', (err) => {
      if (err) {
        console.log('Error appending file:', err);
        return;
      }
      console.log('\nData appended successfully.');

      // 4. READ AGAIN AFTER APPEND
      fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
          console.log('Error reading file:', err);
          return;
        }
        console.log('\nUpdated File Content:\n', data);

        // 5. DELETE FILE
        fs.unlink('sample.txt', (err) => {
          if (err) {
            console.log('Error deleting file:', err);
            return;
          }
          console.log('\nFile deleted successfully.');
        });

      });

    });

  });

});