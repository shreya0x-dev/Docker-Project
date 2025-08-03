const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Show form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'gallery_form.html'));
});

// Handle form submission → send to Flask
app.post('/submit', async (req, res) => {
  try {
    await axios.post('http://localhost:5000/', req.body);
    res.redirect('/success');
  } catch (error) {
    console.error('Error sending data to backend:', error.message);
    res.status(500).send('Error sending data to backend.');
  }
});

// Show success
app.get('/success', (req, res) => {
  res.send('<h1>Form submitted successfully!</h1>');
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
