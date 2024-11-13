module.exports = async (req, res) => {
    try {
        console.log("Iniciando processamento...");

        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        // Log do corpo da requisição
        console.log("Corpo da requisição:", req.body);

        // Força o parse do JSON
        let incomeData;
        try {
            if (typeof req.body === 'string') {
                console.log("Corpo da requisição é uma string, tentando parsear...");
                incomeData = JSON.parse(req.body).incomeData;
            } else {
                console.log("Corpo da requisição é um objeto JSON.");
                incomeData = req.body.incomeData;
            }
        } catch (error) {
            console.error("Erro ao parsear JSON:", error);
            return res.status(400).json({ message: 'Invalid JSON format' });
        }

        if (!incomeData || !Array.isArray(incomeData)) {
            console.error("Formato inválido para incomeData:", incomeData);
            return res.status(400).json({ message: 'Invalid input format: incomeData missing or not an array' });
        }

        const resultados = { "Abaixo de R$2.800": 0, "Acima de R$2.801": 0 };

        // Função para limpar e padronizar valores numéricos
        function limparRenda(renda) {
            try {
                renda = renda.toString().toLowerCase()
                    .replace(/[^\d.,]/g, '') // Remove tudo que não for número, vírgula ou ponto
                    .replace(',', '.'); // Substitui vírgula por ponto para facilitar a conversão
                
                let valorNumerico = parseFloat(renda);
                console.log("Valor numérico após limpeza:", valorNumerico);
                return isNaN(valorNumerico) ? null : valorNumerico;
            } catch (error) {
                console.error("Erro ao limpar renda:", renda, error);
                return null;
            }
        }

        // Processar cada valor e categorizá-lo nas faixas
        const processedData = incomeData.map(income => {
            const valor = limparRenda(income);
            
            if (valor !== null) {
                if (valor <= 2800) {
                    resultados["Abaixo de R$2.800"] += 1;
                    return "Abaixo de R$2.800";
                } else {
                    resultados["Acima de R$2.801"] += 1;
                    return "Acima de R$2.801";
                }
            } else {
                return "Valor Inválido"; // Caso o valor não possa ser convertido
            }
        });

        console.log("Dados processados:", processedData);
        console.log("Contagem das faixas:", resultados);

        res.json({ processedData, faixaContagem: resultados });
    } catch (error) {
        console.error("Erro interno no servidor:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
