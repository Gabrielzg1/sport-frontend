# README do Projeto Frontend - App de Estatísticas de Jogadores de Futebol

## Sobre o Projeto

Este aplicativo mobile é destinado a fãs de futebol que desejam acompanhar as estatísticas de seus jogadores favoritos. Utilizando uma interface amigável e intuitiva, o app permite acessar dados atualizados sobre jogadores de diversas ligas ao redor do mundo. O frontend do aplicativo foi desenvolvido utilizando React Native, um framework popular para desenvolvimento mobile, e Axios para realizar requisições HTTP à API do backend, que armazena e disponibiliza as estatísticas dos jogadores.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos mobile utilizando JavaScript e React.
- **Axios**: Cliente HTTP baseado em promessas para fazer requisições à API.

## Pré-requisitos

Para executar o projeto no ambiente de desenvolvimento, você precisará ter instalado:

- Node.js
- npm (Node Package Manager)
- Um emulador de Android/iOS ou um dispositivo físico para testes

## Configuração do Ambiente de Desenvolvimento

1. **Clone o Repositório**:

2. **Instalação das Dependências**:
   - Navegue até o diretório do projeto clonado e execute o seguinte comando para instalar as dependências necessárias:
     ```
     npm i
     ```
   - Este comando irá baixar e instalar todas as bibliotecas e dependências especificadas no arquivo `package.json`.

3. **Configuração do Axios**:
   - Antes de iniciar o aplicativo, certifique-se de configurar o Axios para apontar para a URL correta da API do backend. Isso pode ser feito modificando a base URL no arquivo de configuração do Axios dentro do projeto.

## Executando o Aplicativo

Para iniciar o aplicativo no modo de desenvolvimento, execute:

```
npm start
```

Este comando irá iniciar o Metro Bundler, que é o servidor de desenvolvimento do React Native. Após o servidor iniciar, você pode executar o aplicativo em um emulador ou dispositivo físico.

Para executar o aplicativo em um dispositivo ou emulador, você pode precisar de comandos adicionais específicos para Android ou iOS. Para Android, geralmente utiliza-se:

```
npx react-native run-android
```

E para iOS, utiliza-se:

```
npx react-native run-ios
```





