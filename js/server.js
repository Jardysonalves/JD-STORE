// server.js
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const cors = require('cors');

// --- ⚠️ INFORMAÇÕES CRUCIAIS: SUBSTITUA ESTES VALORES ⚠️ ---
const BOT_TOKEN = 'MTQ0ODMzNTkwNTE5NzY1ODI2NA.GoJT8d.F1HMTx_Bhex9bhxomsUOfdSPdecdUPohfDnat4'; 
const SERVER_ID = '870126035553902742'; 
const PORT = 3000; // Porta local para testes
// -----------------------------------------------------------


// 1. Configurar o Bot do Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers  // CRUCIAL para banir
    ]
});

client.on('ready', () => {
    console.log(`🤖 Bot logado como ${client.user.tag} e pronto.`);
});

// Faz o login do bot usando o token
client.login(BOT_TOKEN);


// 2. Configurar o Servidor Web (API)
const app = express();

// Permite requisições do frontend (CORS)
app.use(cors());

// Permite processar o corpo JSON das requisições POST
app.use(express.json());


// 3. Rota da API para o Banimento
app.post('/api/ban', async (req, res) => {
    const { userId, reason } = req.body;

    if (!userId || !reason) {
        return res.status(400).json({ success: false, error: 'ID do usuário e motivo são obrigatórios.' });
    }

    try {
        // Encontra o servidor pelo ID
        const guild = client.guilds.cache.get(SERVER_ID);

        if (!guild) {
            return res.status(404).json({ success: false, error: 'Servidor não encontrado. O Bot está nele?' });
        }

        // Executa o comando de banimento REAL
        await guild.members.ban(userId, { reason: reason });

        console.log(`✅ Banimento executado: ${userId} por ${reason}`);
        res.json({ success: true, message: `Usuário ${userId} foi banido com sucesso.` });

    } catch (error) {
        console.error(`❌ Erro ao tentar banir ${userId}:`, error.code, error.message);
        let errorMessage = 'Erro desconhecido ao banir.';

        if (error.code === 50013) {
            errorMessage = 'Permissão insuficiente. O cargo do Bot deve estar acima do usuário a ser banido.';
        } else if (error.code === 10007) {
            errorMessage = 'Membro não encontrado ou ID inválido.';
        }

        res.status(500).json({ success: false, error: errorMessage });
    }
});


// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor API rodando em http://localhost:${PORT}`);
});