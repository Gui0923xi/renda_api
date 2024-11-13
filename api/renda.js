module.exports = async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        // Força o parse do JSON
        let incomeData;
        try {
            if (typeof req.body === 'string') {
                incomeData = JSON.parse(req.body).incomeData;
            } else {
                incomeData = req.body.incomeData;
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid JSON format' });
        }

        if (!incomeData || !Array.isArray(incomeData)) {
            return res.status(400).json({ message: 'Invalid input format: incomeData missing or not an array'
