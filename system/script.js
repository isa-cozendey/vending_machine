// 1. Tabela de Transições da Máquina de Mealy
// Formato: estado_atual: { entrada: { next: estado_destino, out: saida } }
const mealy = {
    'S0':  { 'c':{next:'S5',out:'0'}, 'd':{next:'S10',out:'0'}, 'v':{next:'S25',out:'0'} },
    'S5':  { 'c':{next:'S10',out:'0'}, 'd':{next:'S15',out:'0'}, 'v':{next:'S30',out:'0'}, 'C':{next:'S0',out:'c'} },
    'S10': { 'c':{next:'S15',out:'0'}, 'd':{next:'S20',out:'0'}, 'v':{next:'S35',out:'0'}, 'C':{next:'S0',out:'d'} },
    'S15': { 'c':{next:'S20',out:'0'}, 'd':{next:'S25',out:'0'}, 'v':{next:'S40',out:'0'}, 'C':{next:'S0',out:'u'} },
    'S20': { 'c':{next:'S25',out:'0'}, 'd':{next:'S30',out:'0'}, 'v':{next:'S45',out:'0'}, 'C':{next:'S0',out:'k'} },
    'S25': { 'c':{next:'S30',out:'0'}, 'd':{next:'S35',out:'0'}, 'v':{next:'S50',out:'0'}, 'C':{next:'S0',out:'v'} },
    'S30': { 'c':{next:'S35',out:'0'}, 'd':{next:'S40',out:'0'}, 'v':{next:'S50',out:'0'}, 'a':{next:'ScatA',out:'0'}, 'C':{next:'S0',out:'x'} },
    'S35': { 'c':{next:'S40',out:'0'}, 'd':{next:'S45',out:'0'}, 'v':{next:'S50',out:'0'}, 'a':{next:'ScatA',out:'c'}, 'C':{next:'S0',out:'y'} },
    'S40': { 'c':{next:'S45',out:'0'}, 'd':{next:'S50',out:'0'}, 'v':{next:'S50',out:'0'}, 'a':{next:'ScatA',out:'d'}, 'C':{next:'S0',out:'z'} },
    'S45': { 'c':{next:'S50',out:'0'}, 'd':{next:'S50',out:'0'}, 'v':{next:'S50',out:'0'}, 'a':{next:'ScatA',out:'u'}, 'C':{next:'S0',out:'w'} },
    'S50': { 'c':{next:'S50',out:'0'}, 'd':{next:'S50',out:'0'}, 'v':{next:'S50',out:'0'}, 'a':{next:'ScatA',out:'k'}, 'b':{next:'ScatB',out:'0'}, 'C':{next:'S0',out:'m'} },
    'ScatA':{ 'p':{next:'Sfinal',out:'P'}, 'q':{next:'Sfinal',out:'Q'}, 'C':{next:'S0',out:'0'} },
    'ScatB':{ 'p':{next:'Sfinal',out:'P'}, 'q':{next:'Sfinal',out:'Q'}, 'C':{next:'S0',out:'0'} },
    'Sfinal':{ '~':{next:'S0',out:'0'} }
};

// Dicionário de traduções para o UI
const outputMeaning = {
    '0': 'λ', 'c': '5¢', 'd': '10¢', 'u': '15¢', 'k': '20¢', 
    'v': '25¢', 'x': '30¢', 'y': '35¢', 'z': '40¢', 'w': '45¢', 
    'm': '50¢', 'P': 'Produto P', 'Q': 'Produto Q'
};

// Variavel de estado
let currentState = 'S0';

// Elementos da interface
const display = document.getElementById('display');
const stateBadge = document.getElementById('current-state-badge');
const logContainer = document.getElementById('log-container');
const productDrop = document.getElementById('product-drop');
const coinReturn = document.getElementById('coin-return');

// Função principal disparada pelos botões
function sendInput(input) {
    const currentStateObj = mealy[currentState];

    // Verifica se a transição existe
    if (!currentStateObj || !currentStateObj[input]) {
        updateDisplay("REJEITADO (Erro)");
        setTimeout(() => updateUI_DisplayOnly(), 1000);
        return;
    }

    // Pega a regra da Mealy
    const transition = currentStateObj[input];
    const previousState = currentState;
    
    // Atualiza o estado
    currentState = transition.next;

    // Registra no Log visível para o professor
    addLog(previousState, input, transition.out, currentState);

    // Dispara animações e atualizações visuais
    processOutputEffects(transition.out);
    updateUI_DisplayOnly();

    // Regra da transição automática EPSILON (~) do Sfinal para o S0
    if (currentState === 'Sfinal') {
        setTimeout(() => {
            const finalTrans = mealy['Sfinal']['~'];
            addLog('Sfinal', '~', finalTrans.out, finalTrans.next);
            currentState = finalTrans.next;
            updateUI_DisplayOnly();
        }, 1500); // Aguarda 1.5s para o usuário ver que liberou o produto
    }
}

// Atualiza o letreiro luminoso da máquina
function updateUI_DisplayOnly() {
    stateBadge.innerText = currentState;

    if (currentState.startsWith('S') && !isNaN(currentState.substring(1))) {
        display.innerText = `SALDO: ${currentState.substring(1)}¢`;
    } else if (currentState === 'ScatA') {
        display.innerText = "CAT A - PROD?";
    } else if (currentState === 'ScatB') {
        display.innerText = "CAT B - PROD?";
    } else if (currentState === 'Sfinal') {
        display.innerText = "OBRIGADO!";
    } else {
        display.innerText = "SALDO: 0¢";
    }
}

// Cria o texto do Log (δ(q0, entrada) -> q1, saida)
function addLog(fromState, input, output, toState) {
    const outVisual = outputMeaning[output] || output;
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    // Formatando matematicamente
    entry.innerHTML = `δ(<b>${fromState}</b>, '${input}') &rarr; (<b>${toState}</b>, '${outVisual}')`;
    
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Dispara efeitos na gaveta da máquina de acordo com a saída
function processOutputEffects(output) {
    // Se a saída for um produto
    if (output === 'P' || output === 'Q') {
        productDrop.innerHTML = `🎉 ${outputMeaning[output]} ENTREGUE!`;
        productDrop.classList.add('highlight');
        setTimeout(() => {
            productDrop.innerHTML = "⬇️ Retire aqui ⬇️";
            productDrop.classList.remove('highlight');
        }, 3000);
    }
    
    // Se a saída for troco (diferente de '0' e de Produto)
    else if (output !== '0' && output !== 'P' && output !== 'Q') {
        coinReturn.innerHTML = `🪙 Troco: <span>${outputMeaning[output]}</span>`;
        coinReturn.classList.add('highlight');
        setTimeout(() => {
            coinReturn.innerHTML = `🪙 Troco: <span>0¢</span>`;
            coinReturn.classList.remove('highlight');
        }, 3000);
    }
}