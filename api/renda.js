module.exports = (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        const incomeData = req.body.incomeData;
        if (!incomeData || !Array.isArray(incomeData)) {
            return res.status(400).json({ message: 'Invalid input format' });
        }

        const processedData = incomeData.map(income => {
            let renda = income.toString().replace(/[^\d.,]/g, '').replace(',', '.');
            let valorNumerico = parseFloat(renda);

            if (isNaN(valorNumerico)) return "N/A";
            return valorNumerico <= 2800 ? "Abaixo de R$2.800" : "Acima de R$2.801";
        });

        // Contagem de cada faixa
        const faixaContagem = processedData.reduce((acc, faixa) => {
            acc[faixa] = (acc[faixa] || 0) + 1;
            return acc;
        }, {});

        res.json({ processedData, faixaContagem });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
