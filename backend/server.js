const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; // Change the port number here

app.use(cors());
app.use(express.json());

app.post('/api/flights', (req, res) => {
    const jsonResponse = {
        "data": [
            {
                "min_business_miles": null,
                "min_business_tax": null,
                "min_economy_miles": 53500,
                "min_economy_tax": 189,
                "min_first_miles": null,
                "min_first_tax": null,
                "partner_program": "KLM"
            },
            {
                "min_business_miles": 144600,
                "min_business_tax": 177,
                "min_economy_miles": 55200,
                "min_economy_tax": 158,
                "min_first_miles": null,
                "min_first_tax": null,
                "partner_program": "Qantas"
            }
        ]
    };

    if (jsonResponse.data.length === 0) {
        res.status(404).json({ message: 'Try another search route.' });
    } else {
        res.json(jsonResponse);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
