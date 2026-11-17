# GrandLine RPG — v18: Pontos de Vida negativos

O recurso **PV** agora pode ficar abaixo de zero. O dano não para no 0, os botões +/− e o campo de valor atual aceitam números negativos, e o painel destaca PV negativos visualmente. O valor máximo continua o mesmo; a recuperação pode levar o personagem de PV negativos a positivos.

As mudanças usam o mesmo campo `hpSpent` da ficha, portanto continuam no JSON e no salvamento automático no Firestore, sem alterar o esquema de documentos. PP e PE continuam limitados a zero e aos respectivos máximos.

## Atualização no GitHub

Substitua o `index.html` na raiz do repositório. Os demais arquivos (`firebase-client.js`, `firebase-config.js`, `firestore.rules`) são os mesmos da v17, e não é necessário publicar regras novas.

# GrandLine RPG v17 — carregamento e salvamento automáticos

**Sem botão para carregar da nuvem.** Sempre que o jogador abre/recarrega o site, o personagem com código consulta a versão do Firestore automaticamente. Após login, os personagens da conta são recuperados automaticamente. Alterações são salvas na nuvem após uma pequena pausa e distribuídas para outras sessões pelo listener do Firestore.

## Correções
- Recuperação automática da ficha atual após F5, usando o código já salvo no navegador ou o link compartilhado `?pirata=abc-123`.
- Não envia uma versão local antiga para o Firestore antes de consultar o documento atual.
- Recebimento em tempo real sem ter de informar o código novamente.
- Evita redesenhar a página inteira durante a atualização de outra pessoa.
- Preserva edição local pendente em caso de conflito e mostra aviso antes de substituir dados.
- Exportação/importação JSON e cópias independentes permanecem como na v16.

## Como instalar no GitHub Pages
Substitua os arquivos da raiz do repositório pelos arquivos deste ZIP. **Não é necessário mudar `firestore.rules`** se as regras colaborativas da v14 já estiverem publicadas no Console Firebase.
Atualize ambos os navegadores com Ctrl+F5 após o GitHub Pages concluir a publicação. Teste mudando uma recompensa, aguardando a confirmação "✓ Salvo na nuvem", e recarregando a ficha no outro navegador. Ao contrário da v16, não é preciso clicar em "Atualizar da nuvem".

## Atenção
Se houver aviso "NÃO SALVO NA NUVEM" ou "Conflito", faça backup JSON antes de fechar ou recarregar. As edições sem confirmação do Firebase podem estar apenas no navegador.
Qualquer pessoa com o código pode editar a ficha; mantenha backups importantes.
