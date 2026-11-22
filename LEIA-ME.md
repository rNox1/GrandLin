# GrandLine RPG v20 — Guia do Narrador: Exóticos, Ferramentas e Leitura Longa

## Atualização do equipamento
- Catálogo mantém os 126 itens anteriores e adiciona **55 itens** do *Guia do Narrador 2.0*, com seus efeitos, preços e fontes. Inclui 21 Dials, 16 Pop Green, Planta Mãe e Semente de Planta Mãe, e 16 equipamentos engenhados.
- Filtro **Exóticos**: Dials cotidianos/bélicos/restritos, sementes Pop Green e Planta Mãe; esses equipamentos são adicionados a **Itens e acessórios** na mochila.
- Em **Armas**: Burn Blade, Burn Bazooka, Clima-Tact, Perfect Clima-Tact, Sorcery Clima-Tact, Cool Shooter, Cutter Shell, Eisen Whip, Flash Gun, Heat Javelin, Jet Gauntlet e Kabuto.
- Em **Munição**: Milky Arrow. Em **Aventura**: Jet Board, Jet Ski e Raid Suit.
- A descrição ou as propriedades em cada item da mochila podem ser **expandidas para leitura completa** e editadas em uma **caixa multilinhas ampla**. Os textos ficam salvos na própria ficha.
- O Guia do Narrador não informa peso ou preço comercial de alguns itens: nenhum valor é inventado; eles entram com peso 0 configurável na mochila e preço não definido no catálogo. Para Dials, os preços em Bellys seguem o guia.

## Profissão → Inventário
- Em **Profissões e treino**, na seção **Ferramentas de profissão**, há o botão **Adicionar ao inventário**.
- A janela permite selecionar os itens iniciais da profissão. O usuário escolhe a bússola quando o livro permite alternativas e pode especificar o instrumento musical.
- Quantidades do livro são preservadas. Clique novamente para adicionar somente itens que faltarem; itens já adicionados por esse recurso não são duplicados automaticamente.
- As ferramentas são associadas à profissão do personagem e ficam editáveis na mochila, sem alterar a lista de itens de outros personagens.

## Instalação
Extraia todos os arquivos ZIP na raiz da branch `main` do seu repositório GitHub Pages (`/(root)`), substituindo os existentes. Faça Ctrl+F5 após publicação.

## Firebase
Os arquivos `firebase-client.js`, `firebase-config.js` e `firestore.rules` **não mudaram**. O catálogo foi incluído no HTML e usa os campos já existentes do inventário; não é necessário mudar regras do Firestore. Os dados continuam sendo salvos no Firebase automaticamente quando a conta/ficha online está conectada.

## Referências
*OP RPG — Guia do Narrador 2.0*, pp. 85–88 Dials; pp. 89–91 Pop Green / Planta Mãe; pp. 92–94 Equipamentos Engenhados. Ferramentas de profissão vêm do Livro do Jogador 2.1, pp. 133–134.

## Observação
Teste o salvamento na sua instância Firebase após publicação; os testes automatizados locais não substituem o teste contra seu projeto real. Faça backup JSON das fichas importantes antes de atualizar.
