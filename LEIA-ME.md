# GrandLine RPG — Ficha Digital v14 · Edição colaborativa ao vivo

Site estático para GitHub Pages com Firebase Authentication e Cloud Firestore. O código público de cada personagem continua o mesmo e os dados salvos nas versões anteriores permanecem compatíveis.

## Mudanças da v14

- **Qualquer pessoa com o código do personagem pode visualizar e editar a ficha original, mesmo sem login.** Não há mais formulário de UID, lista de editores ou botão para solicitar autorização.
- **Sincronização em tempo real:** o personagem aberto acompanha mudanças de outras pessoas por `onSnapshot()` do Firestore. O salvamento automático é disparado aproximadamente 1,5 segundo após a última mudança.
- **Edição simultânea:** salvamento em transação com comparação da versão mais recente e mesclagem de campos modificados separadamente. Se duas pessoas mudarem exatamente o mesmo dado, prevalece o último salvamento. Alterações estruturais concorrentes na mesma lista podem substituir uma à outra; se necessário, mantenha um backup JSON.
- **Login mantido para criar e recuperar suas próprias fichas na conta Firebase** (nome de usuário/senha ou Google). Visitar o link/código de um personagem e editar esse personagem não exige login.
- **Proprietário** continua sendo o único que pode excluir a ficha online. Usuários com código não podem mudar o proprietário, a data de criação ou os campos internos de permissões antigas.
- **Backup JSON e duplicação** continuam afetando somente a ficha atual, sem apagar outras fichas da lista.

## ATENÇÃO — altere as regras no Console do Firebase

**Só atualizar os arquivos do GitHub não ativa as novas permissões.** É obrigatório publicar `firestore.rules` no **Cloud Firestore** (não no Realtime Database).

1. Abra: https://console.firebase.google.com/u/1/project/grandlinerpg/firestore/databases/-default-/rules?hl=pt-br
2. Em **Cloud Firestore → Regras**, apague as regras antigas.
3. Abra o arquivo `firestore.rules` deste ZIP num editor de texto e copie todo o conteúdo, começando com `rules_version = '2';`.
4. Cole no editor do **Cloud Firestore** e clique em **Publicar**.
5. Espere a propagação das regras, depois recarregue o site usando **Ctrl+F5**.

Não cole essas regras no *Realtime Database*. Não use `allow read, write: if true` em todas as coleções: as regras fornecidas deixam a edição pública **apenas dos documentos de personagens** e impedem excluir fichas de outras pessoas.

## Atualizar no GitHub Pages

1. Descompacte este ZIP.
2. Na raiz de https://github.com/rNox1/GrandLine, substitua: `index.html`, `firebase-client.js`, `firebase-config.js`, `firestore.rules`, `LEIA-ME.md` e `.nojekyll`.
3. Confirme que o GitHub Pages usa `main` → `/(root)`.
4. Abra https://rnox1.github.io/GrandLine/ e recarregue com Ctrl+F5.

O `firebase-config.js` já contém os identificadores públicos do seu projeto `grandlinerpg` e **não** contém chaves administrativas. Não coloque senhas ou contas de serviço no GitHub.

## Privacidade e colaboração

**Atenção:** uma pessoa que descobrir ou receber o código pode modificar ou danificar a ficha. O código não é uma autenticação secreta, e o Firestore não consegue verificar a intenção de quem fez a edição nesse modo público. Se você precisar de controle de acesso, histórico de revisões ou recuperação completa de alterações, será necessário um modelo diferente, com autenticação e/ou backend adicional.

O mecanismo de mesclagem tenta preservar mudanças simultâneas em campos diferentes, mas não é um editor de texto de múltiplos cursores e não garante mesclagem perfeita de todas as alterações concorrentes.

## Testes

Foram realizados testes de interface com Firebase simulado para acesso sem login, atualização remota, salvamento automático e fusão de alterações em campos diferentes. Foi verificada a sintaxe JavaScript dos scripts e do cliente. **A conexão com o seu Firebase real e a publicação das regras só podem ser verificadas depois de aplicar `firestore.rules` no Console.**
