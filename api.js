const express = require('express');
const app = express();
app.use(express.json());

// Função de limpeza e categorização de renda
function cleanAndCategorizeIncome(income) {
    let renda = income.toString().replace(/[^\d.,]/g, '').replace(',', '.');
    let valorNumerico = parseFloat(renda);
    if (isNaN(valorNumerico)) return "N/A";
    if (valorNumerico <= 1000) return "0-1000";
    if (valorNumerico <= 3000) return "1001-3000";
    if (valorNumerico <= 5000) return "3001-5000";
    return "5001-10000";
}

// Endpoint para processar dados de renda
app.post('/api/renda', (req, res) => {
    const incomeData = req.body.incomeData || [];
    const processedData = incomeData.map(cleanAndCategorizeIncome);
    res.json({ processedData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
