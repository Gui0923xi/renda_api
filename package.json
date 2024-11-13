module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const incomeData = req.body.incomeData || [];
    const processedData = incomeData.map(income => {
        let renda = income.toString().replace(/[^\d.,]/g, '').replace(',', '.');
        let valorNumerico = parseFloat(renda);
        if (isNaN(valorNumerico)) return "N/A";
        if (valorNumerico <= 1000) return "0-1000";
        if (valorNumerico <= 3000) return "1001-3000";
        if (valorNumerico <= 5000) return "3001-5000";
        return "5001-10000";
    });

    res.json({ processedData });
};
