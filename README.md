# Corelab Web Challenge

Este é um projeto de gerenciamento de tarefas desenvolvido com React, Sass e Mantine. O aplicativo permite criar, ler, atualizar e excluir itens de tarefas, além de marcar favoritos e definir cores para cada tarefa.

## Funcionalidades

1. Criar, ler, atualizar e excluir itens de tarefas usando a API.
2. Marcar um item como favorito.
3. Definir uma cor para cada item de tarefa.
4. Exibir a lista de tarefas de maneira responsiva e visualmente atraente.
5. Capacidade de filtrar por itens e cores favoritos.
6. Itens favoritos são exibidos no topo da lista.

## Diferenciais do Projeto

- **Experiência de Usuário Aprimorada**: Interface responsiva e intuitiva para facilitar a organização das tarefas.
- **Eficiência no Desenvolvimento**: Utiliza tecnologias modernas como React 19, Sass e Mantine para um código limpo e escalável.
- **Alto Desempenho**: Construído com Vite, garantindo carregamento rápido e otimizado.
- **Testes End-to-End**: Garantia de qualidade com testes automatizados usando Playwright.
- **Melhores Práticas de Desenvolvimento**: Padronização de código com ESLint e Prettier, assegurando manutenção eficiente.

## Tecnologias Utilizadas

- React 19
- Sass
- Mantine
- Axios
- React Query
- Playwright (para testes e2e)
- ESLint & Prettier
- TypeScript
- Vite

## Instalação e Configuração

Para rodar o projeto localmente, siga os seguintes passos:

1. Clone o repositório:

   ```sh
   git clone https://github.com/Tielson/corelab-web-challenge.git
   ```

2. Acesse a pasta do projeto:

   ```sh
   cd corelab-web-challenge
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```sh
   npm start
   ```

O aplicativo estará disponível em `http://localhost:3000`.

## Testes End-to-End (E2E)

Este projeto utiliza o Playwright para testes end-to-end. Para executar os testes, use:

```sh
npm test
```

### Testes Implementados:

- Verifica se o título da página está correto.
- Confirma se o nome da aplicação é exibido.
- Filtragem correta de notas.
- Adicionar e remover notas dos favoritos.
- Edição de notas.
- Mudança de cor dos cards.
- Criação e deleção de notas.

Confira o vídeo com a execução dos testes E2E: [Link](https://drive.google.com/file/d/1l1ghNjuwVdiAHrY74Hgaw7zfT5pTdnqU/view?usp=sharing)

## Contribuição

Se deseja contribuir para este projeto, siga estas etapas:

1. Fork o repositório
2. Crie um branch para sua feature (`git checkout -b feature-nova`)
3. Commit suas modificações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie suas alterações (`git push origin feature-nova`)
5. Abra um Pull Request

## Por que este projeto se destaca?

O **Corelab Web Challenge** foi desenvolvido seguindo as melhores práticas de desenvolvimento e usabilidade. Ele não apenas resolve um problema comum de organização de tarefas, mas também proporciona uma experiência fluida e intuitiva. Com um código bem estruturado e testado, é um excelente exemplo de como aliar qualidade técnica e facilidade de uso.

