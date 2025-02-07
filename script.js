const key = '5ec67f26122d9720979df94e8d4ab077';

// Função para capturar a cidade e iniciar a busca
const clicaBotao = () => {
    const cidadeInput = document.getElementById('buscar-cidade').value.trim();
    if (cidadeInput) {
        buscarCidade(cidadeInput);
    } else {
        alert('Por favor, insira uma cidade!');
    }
};

// Função para exibir o tempo de forma suave
const mudarDisplay = () => {
    const section = document.querySelector('.info-tempo');
    section.classList.add('show');
};

// Função para popular as informações de clima e bandeira
const popularInfo = (data) => {
    atualizarElemento('nome-cidade', data.name);
    atualizarElemento('temperatura', `${Math.floor(data.main.temp)}°C`);
    atualizarElemento('descricao', data.weather[0].description);
    atualizarElemento('umidade', `${data.main.humidity}%`);
    
    // Atualizar o ícone do tempo
    const icon = document.getElementById('icone-tempo');
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
    // Obtendo o código do país
    const codigoPais = data.sys.country;
    atualizarElemento('pais', codigoPais);

    // Atualizar a bandeira do país
    atualizarBandeira(codigoPais);
};

// Função para atualizar o conteúdo dos elementos
const atualizarElemento = (id, valor) => {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.innerText = valor;
    }
};

// Função para atualizar a bandeira do país
const atualizarBandeira = (codigoPais) => {
    const bandeira = document.getElementById('bandeira');
    bandeira.src = `https://flagsapi.com/${codigoPais}/flat/64.png`;
    bandeira.alt = `Bandeira do país ${codigoPais}`;
};

// Função para buscar as informações da cidade
const buscarCidade = async (cidadeInput) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeInput}&appid=${key}&lang=pt_br&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        popularInfo(data); 
        mudarDisplay(); 
    } catch (error) {
        alert("Erro ao buscar cidade.");
        console.error(error);
    }
};
