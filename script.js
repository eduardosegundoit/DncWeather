function LimitarNumeros () {
    var input = document.getElementById('CampoCep');
    var valor = input.value;
    var maxLength = 8;

    if (valor.length > maxLength) {
        input.value = valor.slice(0, maxLength);
    }
}

async function GetCep() {
    const cep = document.getElementById('CampoCep').value;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        document.getElementById('rua').innerHTML = data.logradouro;
        document.getElementById('bairro').innerHTML = data.bairro;
        document.getElementById('localidade').innerHTML = data.localidade;

        redirectToResultsPage();
        
    } catch (error) {
        console.alert('Ocorreu um erro:', error);
    }
};

async function GetTemperature() {
    const latitude = document.getElementById('FormLatitude').value;
    const longitude = document.getElementById('FormLongitude').value;
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
        const data = await response.json();

        if (data.hourly && data.hourly.temperature_2m && data.hourly.temperature_2m.length > 0) {
            const currentTemperature = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
            document.getElementById('resultadoPrevisao').innerHTML = `${currentTemperature}°C`;
        } else {
            console.alert('Não foi possível encontrar dados de temperatura na resposta da API.');
        }
        
        redirectToResultsPage();
        
    } catch (error) {
        console.alert('Ocorreu um erro:', error);
    }
};

async function GetCepAndTemperature() {
    const nome = document.getElementById('FormNome').value;
    const email = document.getElementById('FormEmail').value;
    const latitude = document.getElementById('FormLatitude').value;
    const longitude = document.getElementById('FormLongitude').value;
    const cep = document.getElementById('CampoCep').value;

    if(!nome || !email || !cep || !latitude || !longitude) {
        alert("Preencha todos os campos !")
        return;
    }

    await GetTemperature(); 
    await GetCep();
    redirectToResultsPage();
}

document.getElementById('FormLongitude').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        GetCepAndTemperature();
        redirectToResultsPage();
    }
});

function redirectToResultsPage() {
    window.location.href = "#AncoraCep";
}