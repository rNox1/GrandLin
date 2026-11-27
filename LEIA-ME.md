# GrandLine RPG — v22 · Construtor de técnicas melhorado

## Atualização no GitHub Pages
Copie o conteúdo do ZIP para a raiz do repositório `rNox1/GrandLine`.
Se a v21 já funciona e a autenticação está configurada, **substitua somente `index.html`**. Os demais arquivos de Firebase/Firestore foram preservados da v21.

## Novidades
- Caixa `Técnica com dano ou efeitos ofensivos` desmarcada: o bloco inteiro de dano desaparece. Os efeitos de suporte têm seus próprios campos.
- Combate com dano e Salvaguarda de alvo único: mostra as escolhas `d8 / metade no sucesso` e `d10 / sem dano no sucesso` **apenas quando pertinentes** (Livro do Jogador 2.1, p. 192).
- Opções próprias em cada modificador selecionado: dados, duração prolongada, alvos, Salvaguarda, área, margem crítica, alternativas, pré-requisitos e penalidades.
- Power Up (p. 198): agora possui opções separadas com valores oficiais +1/+2/+3/+4 PP e base 3 PP, eliminando o campo arbitrário de custo.
- A duração prolongada fica dentro do efeito e é somada conforme as regras. Não se deve ampliar indiscriminadamente efeitos com duração fixa.
- A memória de cálculo e os detalhes agora mostram também os parâmetros configurados.
- Redução automática do Estilo aparece inclusive quando for 0 PP, explicando o cálculo.
- Para obter redução **Técnica Não Ofensiva** é necessário selecioná-la e não atribuir dano direto/indireto à técnica.

## Fontes da regra
Livro do Jogador 2.1, páginas 35 e 192–207. Valores especiais sempre dependem das exigências do efeito e da aprovação do Narrador.

## Persistência
Os parâmetros integram o objeto `v21Build` da técnica criada, compatível com as fichas existentes. Não há necessidade de modificar as regras do Firestore.
