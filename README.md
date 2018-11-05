# Conference Track Management

Distribui e ajusta talks às restrições de tempo da conferência.

## Índice
* [Iniciando](#iniciando)
* [Inserindo talks](#inserindo-talks)
* [Testes](#testes)
* [Design e arquitetura](#design-e-arquitetura)

## Iniciando
1 - Instale as dependências globais:

* [Node.js](https://nodejs.org) (10.x ou superior)

2 - Acesse a pasta-raiz do projeto e instale as dependências via npm
```
npm install
```

3 - Inicie a aplicação (ambiente de desenvolvimento)

```
npm start
```

## Inserindo talks

Quando surgir o prompt na tela siga os passos abaixo: 

* A talk deve ser um texto no formato`<Nome da talk> (<XX>min | lightning)`. Ex 1: Sit Down and Write 30min. Ex 2: Rails for Python Developers lightning;

* Após inserir, tecle `ENTER` para confirmar e inserir a próxima talk;

* Quando finalizar digite `:q` e tecle `ENTER`. Será impresso na tela as talks, devidamente distribuídas em tracks da conferência. 

## Testes

Para executar os testes:

```
npm test
```

## Design e arquitetura

 * A aplicação é constituída basicamente através da interação e junção de quatro blocos: proposal, talk, session, track e conference. A pasta `models` contém as fábricas que criam estes blocos, retornando objetos imutáveis;

 * A hierarquia destes objetos possui a seguinte forma:
    * Uma conference possui zero ou mais tracks;
    * Uma track possui duas sessions: uma de manhã e outra a tarde;
    * Uma session possui zero ou mais talks e pode ter um evento. Um evento nada mais é que uma talk cujo horário de início pode ser alterado para mais, desde que não ultrapasse o horário final da sua session. No caso da sessão da manhã, por exemplo, o evento "Lunch" inicia no mesmo horário final desta session (12PM). Já na sessão da tarde, o evento "Network Event" deve iniciar a partir das 16PM, mas pode ter o seu horário postergado até no máximo as 17PM, que é o horário final desta session;
    * Uma talk recebe informações da proposal e o horário determinado pela session para o seu início;
    * Uma proposal recebe um texto e verifica se seu formato está adequado. Em caso positivo, extrai as informações para um objeto.

  * Foi criada a pasta `util` para isolar as funções de manipulação de data necessárias para a aplicacão. Para o desenvolvimento destas funções foram utilizados apenas os recursos nativos da linguagem;

  * Para padronizar a identação, facilitar a remoção e identificação de erros no código foram adicionadas as dependências `prettier` e `eslint`. Para os testes foi utilizado o runner `jest`, juntamente com as API's `sinon` e `chai` para criação de stubs e asserções, respectivamente. Outras ferramentas utilizadas (`husky`,`lint-staged`) tem o objetivo de assegurar a execução das ferramentas de qualidade durante cada alteração.
