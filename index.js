const express = require('express');

const app = express();

// MiddleWare
app.use(express.json());

// Posts API Routes
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
