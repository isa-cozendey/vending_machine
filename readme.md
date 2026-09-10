# Vending Machine - Linguagens Formais e Autômatos

Este repositório apresenta a modelagem e simulação de uma vending machine (máquina de vendas automáticas) utilizando o formalismo da Máquina de Mealy (Autômato Finito com Saída). 
O objetivo principal do projeto é demonstrar a aplicação prática da Teoria dos Autômatos na resolução de problemas do mundo real. No modelo desenvolvido, a máquina gerencia dinamicamente o acúmulo de saldo conforme a inserção de moedas, suporta produtos divididos em duas categorias de preço (R$ 0,30 e R$ 0,50) e realiza o cálculo e a devolução automática de troco ao cliente — funcionalidades que agregam complexidade e representatividade ao sistema.
A solução foi projetada no software JFLAP e espelhada em uma interface web interativa.

## Como funciona
A máquina aceita moedas de 5¢, 10¢ e 25¢, acumulando saldo até o limite máximo de 50¢. A partir de determinado saldo, o usuário pode selecionar produtos de duas categorias ou cancelar a operação com devolução integral do valor acumulado.
* Moedas Aceitas: $5¢$, $10¢$ e $25¢$.
* Teto de Saldo ($50¢$): Moedas inseridas após atingir $50¢$ não acumulam saldo adicional (mantêm o estado em $50¢$).
* Categoria A ($30¢$): Permite escolher entre o Produto P ou Produto Q.
* Categoria B ($50¢$): Permite escolher entre o Produto P ou Produto Q.
* Troco Imediato: O troco é calculado e emitido na transição de seleção da categoria ($S_{saldo} \rightarrow S_{cat}$).
* Cancelamento: A qualquer momento antes da escolha do produto, a tecla C devolve todo o saldo acumulado e retorna ao estado inicial ($S_0$).

  <img width="1221" height="732" alt="image" src="https://github.com/user-attachments/assets/b76cae7a-29ba-48f0-af61-a12f57395c62" />


## Dicionário do Alfabeto

### Entradas

<table>
  <thead>
    <tr>
      <th>Símbolo</th>
      <th>Significado Real</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>c</td>
      <td>Moeda de 5¢</td>
      <td>Incrementa 5 centavos ao saldo</td>
    </tr>
    <tr>
      <td>d</td>
      <td>Moeda de 10¢</td>
      <td>Incrementa 10 centavos ao saldo</td>
    </tr>
    <tr>
      <td>v</td>
      <td>Moeda de 25¢</td>
      <td>Incrementa 25 centavos ao saldo</td>
    </tr>
    <tr>
      <td>a</td>
      <td>Categoria A</td>
      <td>Seleciona produtos de R$ 0,30</td>
    </tr>
    <tr>
      <td>b</td>
      <td>Categoria B</td>
      <td>Seleciona produtos de R$ 0,50</td>
    </tr>
    <tr>
      <td>p</td>
      <td>Produto P</td>
      <td>Confirma a escolha do Produto P</td>
    </tr>
    <tr>
      <td>q</td>
      <td>Produto Q</td>
      <td>Confirma a escolha do Produto Q</td>
    </tr>
    <tr>
      <td>C</td>
      <td>Cancelar</td>
      <td>Solicita a devolução do dinheiro acumulado</td>
    </tr>
  </tbody>
</table>

### Saídas

<table>
  <thead>
    <tr>
      <th>Símbolo</th>
      <th>Significado Real</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>c</td>
      <td>Troco de 5¢</td>
      <td>Seleção de Cat. A com 35¢ ou Cancelamento em S5​</td>
    </tr>
    <tr>
      <td>d</td>
      <td>Troco de 10¢</td>
      <td>Seleção de Cat. A com 40¢ ou Cancelamento em S10​</td>
    </tr>
    <tr>
      <td>u</td>
      <td>Troco de 15¢</td>
      <td>Seleção de Cat. A com 45¢ ou Cancelamento em S15​</td>
    </tr>
    <tr>
      <td>k</td>
      <td>Troco de 20¢</td>
      <td>Seleção de Cat. A com 50¢ ou Cancelamento em S20​</td>
    </tr>
    <tr>
      <td>v</td>
      <td>Troco de 25¢</td>
      <td>Cancelamento em S25</td>
    </tr>
    <tr>
      <td>x</td>
      <td>Troco de 30¢</td>
      <td>Cancelamento em S30</td>
    </tr>
    <tr>
      <td>y</td>
      <td>Troco de 35¢</td>
      <td>Cancelamento em S35</td>
    </tr>
    <tr>
      <td>z</td>
      <td>Troco de 40¢</td>
      <td>Cancelamento em S40</td>
    </tr>
    <tr>
      <td>w</td>
      <td>Troco de 45¢</td>
      <td>Cancelamento em S45</td>
    </tr>
    <tr>
      <td>m</td>
      <td>Troco de 50¢</td>
      <td>Cancelamento em S50</td>
    </tr>
    <tr>
      <td>p_a, p_b</td>
      <td>Liberação do Produto P na categoria A ou B</td>
      <td>Libera a trava do slot P da categoria A ou B</td>
    </tr>
    <tr>
      <td>q_a, q_b</td>
      <td>Liberação do Produto Q na categoria A ou B</td>
      <td>Libera a trava do slot Q da categoria A ou B</td>
    </tr>
  </tbody>
</table>

## Estados ($Q$)

A máquina possui 14 estados funcionais:
* $q_0$ ($S_{0c}$): Estado inicial (Saldo R$ 0,00).
* $q_1$ a $q_{10}$ ($S_{5c}$ a $S_{50c}$): Estados de controle do saldo acumulado (passos de $5¢$).
* $q_{11}$ ($S_{catA}$): Categoria A selecionada (Aguardando escolha entre p ou q).
* $q_{12}$ ($S_{catB}$): Categoria B selecionada (Aguardando escolha entre p ou q).
* $q_{13}$ ($S_{final}$): Estado de dispensação.

## Fluxo e Lógica das Transições

### Cálculo do Troco Imediato
Diferente de sistemas que liberam o troco no final, o cálculo ocorre no exato momento da mudança de categoria:
$$\text{Troco} = \text{Saldo Acumulado} - \text{Preço da Categoria}$$
* Exemplo em $S_{50}$ selecionando Categoria A ($30¢$):
  $$\text{Transição}: \quad a / k \quad (\text{Entrada: } a \rightarrow \text{Cat. A} \quad \mid \quad \text{Saída: } k \rightarrow 20¢ \text{ de troco})$$

### Ciclo de Vida do Atendimento
* Depósito: O usuário envia v ($25¢$) + v ($25¢$) $\rightarrow$ O estado atual passa a ser $S_{50c}$.
* Seleção: O usuário digita a (Cat. A) $\rightarrow$ A máquina transita para $S_{catA}$ e emite a saída k ($20¢$ de troco).
* Entrega: O usuário escolhe p (Produto P) $\rightarrow$ A máquina transita para $S_{final}$, solta a saída P, e a transição nula.

## Testes para validação

Com o arquivo .jar disponibilizado neste repositório, utilizando o JFLAP no modo input - multiple run.
  
<table>
  <thead>
    <tr>
      <th>Entrada</th>
      <th>Resultado esperado</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>vvap</td>
      <td>kp_a</td>
      <td>Depósito de 50¢ ($25+25$), escolhe A ($30¢$), recebe $20¢$ de troco (k) e libera Produto P (P).</td>
    </tr>
    <tr>
      <td>vvdbq</td>
      <td>q_b</td>
      <td>Depósito de 50¢ ($25+25$), insere mais 10¢ (trava em 50¢), escolhe B ($50¢$, sem troco) e libera Produto Q (Q).</td>
    </tr>
    <tr>
      <td>cccccccap</td>
      <td>cp_a</td>
      <td>Depósito de 35¢ ($7 \times 5¢$), compra Cat. A ($30¢$), recebe $5¢$ de troco (c) e libera P.  </td>
    </tr>
    <tr>
      <td>ddddap</td>
      <td>dp_a</td>
      <td>Depósito de 40¢ ($4 \times 10¢$), compra Cat. A ($30¢$), recebe $10¢$ de troco (d) e libera P.</td>
    </tr>
    <tr>
      <td>vddap</td>
      <td>up_a</td>
      <td>Depósito de 45¢ ($25+10+10$), compra Cat. A ($30¢$), recebe $15¢$ de troco (u) e libera P.</td>
    </tr>
    <tr>
      <td>dddddC</td>
      <td>m</td>
      <td>Insere 50¢ ($5 \times 10¢$) e aperta Cancelar (C). Devolve exatamente $50¢$ de troco (m).</td>
    </tr>
    <tr>
      <td>dC</td>
      <td>d</td>
      <td>Insere 10¢ e aperta Cancelar (C). Devolve $10¢$ de troco (d).</td>
    </tr>
  </tbody>
</table>

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
