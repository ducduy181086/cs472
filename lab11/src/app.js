import express from 'express';

import studentsRouter from './routes/students.js';

const app = express();

app.use('/api/v1/students', studentsRouter);
app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log('Your Server is running on 3000');
});
