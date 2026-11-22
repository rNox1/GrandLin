# GrandLine RPG v19 — Celestiais, Profissões e Equipamentos

## Principais mudanças
- **Celestial**: em **Origem e individualidades → Traços de espécie**, uma das duas perícias pode ser substituída por **Haki da Observação Inato**. Essa singularidade é gratuita e não participa da contagem de singularidades ou defeitos.
- **Haki**: fora de combate, permite Perceber Emoções, Perceber Presença e Perceber Desafio (livro p. 165). Após despertar/controlar, concede **5 PA** da singularidade e **15 PA adicionais exclusivos de Haki da Observação** (livro pp. 18 e 165); o Haki principal fica fixado como Observação. A compra de talentos de Armamento e do Rei não aceita gastar os 15 PA restritos.
- **Profissões**: corrigidos os kits e instrumentos iniciais das **20 profissões**, conforme **Benefícios de 1º nível** (pp. 133–134), apresentados como lista completa. São benefícios da profissão inicial, não de profissões adquiridas posteriormente.
- **Equipamentos**: os 126 itens permanecem, porém os itens das pp. 246–250 são reclassificados conforme os subtítulos originais do livro. A navegação agora inclui Eternal Pose, Log Pose, Log Pose de 3 Agulhas e Vivre Card. Também há filtros de Energia e Químicos.

## Instalação no GitHub Pages
Coloque os arquivos da pasta na **raiz** da branch `main` do repositório, substituindo os antigos, e publique a branch `main` em `/(root)` via Settings → Pages.

## Firebase
Mantidos os arquivos `firebase-client.js`, `firebase-config.js` e `firestore.rules` da versão anterior. Não é necessário recriar personagens, banco de dados ou alterar as regras. O novo valor `__haki_obs_innate__` fica em `raceSkillIds` do personagem e é salvo automaticamente tanto na nuvem quanto no JSON individual.

## Observação
Os testes de integração com Firebase foram feitos com simulação; valide o salvamento online com sua instância real após publicar no GitHub. Antes de substituir arquivos, mantenha backup JSON das fichas importantes.
