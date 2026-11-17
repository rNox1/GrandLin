# GrandLine RPG v15 — sincronização ao vivo corrigida

## O que mudou
- Corrigido o loop de salvamento/renderização da v14: ID da lista local não integra mais o documento Firestore.
- Atualizações recebidas da nuvem atualizam apenas nós diferentes na tela, sem reconstruir toda a interface nem tirar o foco do campo em edição.
- Confirmações de gravação com dados idênticos não geram novos salvamentos.
- Compatibilidade com personagens publicados nas versões anteriores.

## Como instalar
1. Extraia este ZIP e substitua todos os arquivos na raiz do GitHub (principalmente `index.html`).
2. Faça Ctrl+F5 em **ambos** os navegadores/dispositivos para carregar a versão v15.
3. Abra o mesmo código nos dois navegadores. O modo de edição colaborativa permanece ativo.
4. Mantenha as regras do Firestore da v14: não precisam de mudança.

O aplicativo exige internet e HTTPS do GitHub Pages para Firebase. O editor ao vivo não é um sistema de edição de texto simultânea por caractere: em um mesmo campo vale o último salvamento. As alterações são sincronizadas após ~1,5 s de inatividade. Em caso de falha de internet, a cópia local permanece. 
