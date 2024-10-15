import express from 'express';

const app = express();

app.use('/addition', createRouter((a, b) => { return parseFloat(a) + parseFloat(b); }));
app.use('/subtraction', createRouter((a, b) => { return parseFloat(a) - parseFloat(b); }));
app.use('/multiplication', createRouter((a, b) => { return parseFloat(a) * parseFloat(b); }));
app.use('/division', createRouter((a, b) => { return parseFloat(a) / parseFloat(b); }));
app.use('/modulus', createRouter((a, b) => { return parseFloat(a) % parseFloat(b); }));

app.listen(3000, () => {
    console.log('Your Server is running on 3000');
});

function createRouter(operator) {
    const router = express.Router();

    router.get('/:a/:b', (req, res, next) => {
        const { a, b } = req.params;
        res.json({ results: operator(a, b) });
    });
    
    router.get('/', (req, res, next) => {
        const { a, b } = req.query;
        res.json({ results: operator(a, b) });
    });
    
    router.post('/', express.urlencoded({ extended: true }), express.json(), (req, res, next) => {
        const { a, b } = req.body;
        res.json({ results: operator(a, b) });
    });

    return router;
}
