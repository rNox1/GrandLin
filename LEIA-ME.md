# GrandLine RPG • Ficha Digital v13

Site HTML independente preparado para **GitHub Pages** com **Firebase Authentication + Cloud Firestore**. Esta versão substitui a v12 e é compatível com os personagens já existentes.

## Atualizações da v13

### Origem e individualidades
- Removidos o texto e os três atalhos antigos "Escolhas da origem".
- O bloco **Traços de espécie** permanece no alto. A escolha de **Variação rara** foi integrada no mesmo bloco.
- O **Antecedente** reúne nome, seleção, característica especial, descrição, perícia escolhida e atributo com bônus +2 num só cartão, sem os blocos duplicados.
- O restante foi consolidado em **abas de conteúdo**, sem rolagem de atalho: **Histórico**, **Singularidades** e, para espécies aptas, **Ancestralidade**.
- **Histórico** contém nome, alcunha, sonho, caminho, código de honra, tripulação, antecedente, altura, peso, aparência, personalidade e história, além das notas da campanha.
- **Singularidades** mantém defeitos, contagem de pontos/espaços e verificação das categorias correspondentes.
- **Ancestralidade** conserva a escolha do animal e dos traços, incluindo edição e catálogo, apenas para personagens com direito à característica. Para Mestiços, considera a herança escolhida.

### Profissões e treinamento
- Removida a seção recolhível **"Editar profissões, PT e treinamentos personalizados"**.
- Profissão principal e extras continuam editáveis no cabeçalho de profissões; graduação e conhecimentos estão disponíveis no mesmo painel.
- **PT adicionais** e **PT gastos** podem ser informados no próprio bloco de **Recursos disponíveis**.
- Os treinamentos personalizados estão abaixo do catálogo e podem ser editados ali mesmo.
- O formulário de **Vínculo animal** é exibido somente se o personagem tiver a profissão **Adestrador** (principal ou extra), conforme o livro.

### Equipamentos
- Valor de berries aparece limpo no cartão. Toque em **Adicionar / ajustar** para receber, gastar ou definir saldo numa janela.
- Mochila simplificada em **Itens e acessórios**, **Armas** e **Munições**. O botão **＋** de cada seção registra um item próprio.
- Toque no item para expandir e editar nome, peso, quantidade e características dentro da própria seção.
- Catálogo completo do livro continua disponível e adiciona diretamente à mochila.

### Combate e técnicas
- Pesquisa em **25 condições** do Livro do Jogador 2.1, p. 269–273: as 23 condições da seção 10.3 mais Exaustão e Doente.
- Leia as descrições e marque ou remova condições presentes no personagem.
- Exaustão tem nível 0–6, usando o campo de Exaustão já existente na ficha.
- As condições são **indicadores salvos**, não executam automaticamente dano ou testes; os efeitos dependem da situação e do Narrador.

## Importante sobre os dados
- Alterações são armazenadas no personagem atual e sincronizadas pelo mecanismo de salvamento automático Firebase já existente na v12 quando a conta está conectada.
- Exportar/Importar JSON continua atuando sobre **um personagem por vez**; importar não apaga outras fichas.
- Copiar um personagem não copia a lista de personagens.
- Dados de espécies e condições vêm da edição 2.1 do livro fornecido pelo usuário.
- **Não houve mudança nas regras Firestore**, em `firebase-client.js` ou em `firebase-config.js`.

## Publicar no GitHub Pages
1. Descompacte este ZIP e envie os arquivos **diretamente na raiz** do repositório `rNox1/GrandLine`, substituindo os da versão anterior.
2. Mantenha `index.html`, `firebase-client.js`, `firebase-config.js`, `firestore.rules` e `.nojekyll` lado a lado.
3. Acesse `https://rnox1.github.io/GrandLine/` e faça uma atualização forçada (`Ctrl+F5`) após o GitHub Pages atualizar.
4. A configuração pública do Firebase GrandLine já está incluída; não adicione senhas ou chaves privadas em arquivos do site.

O site pode ser aberto como HTML para uso local, mas o Firebase Authentication / Firestore requer acesso à internet, projeto habilitado, domínio autorizado e regras de segurança publicadas no console Firebase.
