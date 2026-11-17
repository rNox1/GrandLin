# GrandLine RPG v18 — Vida negativa (PV abaixo de zero)

## O que mudou
- Os Pontos de Vida (PV) agora podem ficar abaixo de zero: -1, -5, -20 etc.
- O botão **−** continua funcionando ao passar de 0 PV.
- O botão **+**, a recuperação de PV e o campo **Valor atual** permitem voltar de valores negativos.
- O botão de dano em quantidade não para mais ao chegar a zero.
- Os PV negativos aparecem destacados em vermelho; a barra de vida permanece vazia abaixo de zero.
- **PP e PE** continuam limitados ao intervalo normal, entre zero e o máximo.
- O valor negativo de PV é mantido nos dados da ficha e, portanto, no JSON e no salvamento/sincronização Firebase existentes.

## Instalação no GitHub Pages
Substitua o `index.html` atual pelo deste pacote. Os demais arquivos são os mesmos da v17: `firebase-client.js`, `firebase-config.js`, `firestore.rules` e `.nojekyll`. Não é necessário modificar regras nem configuração do Firebase.

## Teste
Com um personagem de 10 PV, reduza os PV até -3, aguarde o indicador de confirmação de salvamento na nuvem e recarregue a página. O personagem deve continuar com -3 PV. Recupere 2 PV e ele deve ficar com -1 PV.

**Observação:** os testes locais não substituem a verificação no seu projeto Firebase real.
