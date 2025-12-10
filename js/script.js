document.getElementById('banForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    const userId = document.getElementById('userId').value.trim();
    const reason = document.getElementById('reason').value.trim();
    const statusMessage = document.getElementById('statusMessage');
    const banButton = document.getElementById('banButton');
    const buttonText = banButton.querySelector('.button-text');
    const loadingSpinner = banButton.querySelector('.loading-spinner');

    statusMessage.textContent = ''; // Limpa mensagens anteriores
    statusMessage.className = 'message';

    // 1. Validação simples
    if (!/^\d{17,19}$/.test(userId)) {
        statusMessage.classList.add('error');
        statusMessage.textContent = '❌ Erro: O ID do usuário deve ter entre 17 e 19 dígitos numéricos (formato do Discord).';
        return;
    }

    // 2. Simulação de Processamento
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline';
    banButton.disabled = true;

    // Em um ambiente REAL, você faria uma chamada (fetch/axios) para seu servidor backend AQUI.
    // Exemplo: fetch('/api/ban', { method: 'POST', ... })

    setTimeout(() => {
        // Simulação do resultado da API
        const success = Math.random() < 0.8; // 80% de chance de "sucesso" simulado

        buttonText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        banButton.disabled = false;

        if (success) {
            statusMessage.classList.add('success');
            statusMessage.textContent = `✅ Sucesso! Usuário com ID ${userId} foi banido (Simulação). Motivo: ${reason}`;
            document.getElementById('banForm').reset(); // Limpa o formulário
        } else {
            statusMessage.classList.add('error');
            statusMessage.textContent = '❌ Erro no Servidor (Simulação): Não foi possível banir o usuário. Tente novamente mais tarde.';
        }
    }, 2000); // Espera 2 segundos para simular a latência da rede
});

