# GrandLine RPG • v21 — Criação de Técnicas

Esta versão mantém os arquivos de configuração do Firebase e as regras do Firestore da v20 sem modificações. Atualize a raiz de seu repositório no GitHub Pages com os arquivos do ZIP (não envie apenas o ZIP).

## Novo: Construtor de técnicas

1. Acesse Combate e Técnicas > Escolher técnica do livro > Criar técnica, ou clique Criar técnica própria. Na página Akuma no Mi, há um atalho para criar técnica de fruta.
2. **Etapa 1:** Selecione técnica de Estilo ou de Fruta, Combate ou Auxiliar, grau/categoria auxiliar, alcance básico, ataque/salvaguarda, dano base, efeitos de aumento e redução. Edite a quantidade de dados, alvos, duração e restrições de cada efeito. O custo no topo e o detalhamento lateral são recalculados em tempo real; erros bloqueiam o avanço.
3. **Etapa 2:** Nome, alcance final, duração, requisitos e descrição. Salve.
4. O cartão da técnica criada possui o botão Detalhes com histórico de cálculo. Lá é possível reabrir o construtor e editar. A versão é salva no personagem e transmitida pelo fluxo normal de salvamento/JSON/Firebase.

## Regras verificadas — Livro do Jogador 2.1

- Página 35: técnicas de combate do **Estilo**: redução automática igual a metade do grau, arredondado para baixo. Técnicas **Auxiliares de Estilo**: redução automática de 1 PP. **Técnicas de Fruta**: não recebem essa redução automática de estilo.
- Páginas 194–195: técnicas de combate têm limite 2 PP por grau e no máximo 2 dados de dano por grau; técnicas auxiliares não causam dano diretamente e têm limite 10 PP; auxiliares despertas têm até 15 PP.
- Páginas 196–207: efeitos específicos de aumento e redução. Reduções selecionadas têm limite 2 × grau em Combate ou 6 PP em Auxiliar. Custo final nunca inferior a 1 PP. Técnica não ofensiva: −2 PP em Combate ou −1 PP em Auxiliar, desde que não cause nem favoreça dano.
- Seções de Forma Aperfeiçoada, Forma Alternativa e tipo de dano opcional (p. 193–194) aparecem nas opções especiais.

**Importante:** alguns efeitos permitem custos ou limites definidos pelo Narrador, e foram identificados no construtor. A aplicação é uma ferramenta para auxiliar a criação, não substitui aprovação do Narrador. As regras da v21 de cálculo são verificadas no navegador; uma publicação real no Firebase ainda precisa ser conferida no seu ambiente.

## Arquivos incluídos
- `index.html`: site completo (v21)
- `firebase-client.js`, `firebase-config.js`: integração existente
- `firestore.rules`: regras existentes (não alteradas)
- `.nojekyll`, `LEIA-ME.md`
