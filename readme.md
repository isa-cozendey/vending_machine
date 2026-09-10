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
