# Feature toggle permissions

A nossa biblioteca de Feature Toggle e Permissionamento é uma ferramenta essencial para desenvolvedores que desejam implementar controle flexível sobre o comportamento do software e gerenciar permissões de acesso de forma eficaz. Com ela, é possível habilitar ou desabilitar recursos em tempo real, realizar testes e experimentações com facilidade, garantir um controle preciso sobre o lançamento de novas funcionalidades e personalizar a experiência do usuário com segmentação inteligente. Integre facilmente a nossa biblioteca em seus projetos, aproveitando os benefícios de uma distribuição simplificada e um processo de publicação automatizado.

## 🚀 Primeiros passos

Instale `@bmg/arqf-feature-toggle-permission` usando qualquer gerenciador de pacotes.

```sh
$ yarn add @bmg/arqf-feature-toggle-permission
# or
$ npm i @bmg/arqf-feature-toggle-permission
```

## 🏗️ Componentes, hooks e funções

> `PermissionsProvider`

O **PermissionsProvider** fornece uma estrutura centralizada para gerenciamento de permissões dentro de aplicativos React. Ao envolver sua aplicação com o **PermissionsProvider**, você pode controlar dinamicamente o acesso a recursos e funcionalidades com facilidade, garantindo uma experiência segura e personalizada para os usuários.

| Propriedades | Tipo                          | Descrição                                   |
| ------------ | ----------------------------- | ------------------------------------------- |
| children     | `React.ReactNode` obrigatório | O conteúdo do provedor.                     |
| permissions  | `Permissions`                 | Objeto de permissões e recursos do usuário. |

> `Can`

O **Can** é um componente fundamental da nossa biblioteca. Ele permite verificação condicional de permissões dentro de aplicativos React. Com o **Can**, você pode controlar dinamicamente a visibilidade de componentes com base nas permissões do usuário, garantindo uma experiência de usuário personalizada e segura.

| Propriedades | Tipo                                    | Descrição                                                                       |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------- |
| children     | `React.ReactNode` obrigatório           | O conteúdo que deve ser exibido caso o usuário tenha permissão enviada.         |
| context      | `string` obrigatório                    | Contexto onde o recurso ou permissão será aplicado.                             |
| action       | `create` `update` `destroy` obrigatório | Ação que será executada de acordo com o contexto informado.                     |
| no           | `React.ReactNode`                       | O conteúdo que deverá ser exibido caso o usuário não tenha a permissão enviada. |

> `Hooks`

O `usePermissions` é um hook essencial disponibilizado pela nossa biblioteca. Ele oferece uma maneira flexível de configurar e validar permissões dinamicamente dentro de aplicativos React, permitindo um controle preciso sobre o acesso a recursos e funcionalidades.

| Utilitário        | Descrição                                                                                                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| updatePermissions | Este utilitário permite atualizar dinamicamente as permissões dentro do seu aplicativo. Com ele, você pode alterar as permissões do usuário em tempo real, garantindo uma experiência de usuário sempre atualizada e relevante.                                                                                           |
| can               | O utilitário `can` oferece uma forma simples e direta de realizar verificações de permissões fora do contexto de renderização de componentes. Você pode usar este utilitário para realizar verificações de permissões em qualquer lugar do seu código, tornando-o flexível e adaptável às necessidades do seu aplicativo. |
| permissions       | O utilitário `permissions` fornece acesso às permissões atuais do usuário. Você pode usar este utilitário para consultar e verificar as permissões do usuário em qualquer parte do seu aplicativo, garantindo uma lógica coesa e consistente em toda a aplicação.                                                         |

Com o hook `usePermissions` e seus utilitários, você pode criar aplicativos React altamente flexíveis e dinâmicos, proporcionando uma experiência de usuário sob medida e segura.

> `Funções`

A função `canHandler` é um utilitário projetado para realizar validações de permissões fora do contexto do React. Com configurações simples, como ação, contexto e opções de callbacks, é possível determinar se um usuário possui determinada permissão e executar lógica personalizada com base nisso. Essa função oferece flexibilidade para realizar verificações a nível de serviço, garantindo controle sobre o acesso a recursos e funcionalidades.

| Parâmetros  | Tipo                                      | Descrição                                                                      |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| context     | `string` obrigatório                      | Contexto onde o recurso ou permissão será aplicado.                            |
| action      | `create` `update` `destroy` obrigatório   | Ação que será executada de acordo com o contexto informado.                    |
| options     | `{ yes?: () => void; not?: () => void; }` | Opções de retorno de chamada em caso de obtenção ou não da permissão desejada. |
| permissions | `Permissions`                             | Objeto de permissões e recursos do usuário.                                    |

## 💻 Uso

Nossa biblioteca está dividida em dois tipos de uso distintos. O primeiro é especificamente projetado para integração em projetos React, enquanto o segundo oferece uma função utilitária para uso independente do contexto do React, adequado, por exemplo, para implementação em serviços individuais.

### Uso dentro de um Projeto React

Para começar, vamos nos concentrar no uso dentro do ambiente React. A integração da nossa biblioteca começa configurando o provedor de permissões, o qual é exportado pelo ponto de entrada da nossa biblioteca. Isso pode ser realizado da seguinte maneira:

```jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@bmg-genesis/styles";
import { PermissionsProvider } from "@bmg/arqf-feature-toggle-permission";

import { ProxyRoute } from "@/main/proxies";

const Router: React.FC = () => (
  <PermissionsProvider>
    <ThemeProvider theme="base">
      <BrowserRouter>
        <ProxyRoute />
      </BrowserRouter>
    </ThemeProvider>
  </PermissionsProvider>
);

export default Router;
```

Ao configurar o provedor de permissões dessa maneira, você estará pronto para utilizar as funcionalidades oferecidas pela nossa biblioteca dentro do seu aplicativo React.

Após configurar o `PermissionProvider`, você estará pronto para utilizar o componente `Can` em qualquer lugar de sua aplicação. O `Can` é um componente de primeira ordem que verifica de forma condicional se o usuário tem permissão para acessar determinado recurso, de acordo com a `action` e o `context` de permissão fornecidos.

Suponha que tenhamos um botão que só deve ser exibido se o usuário tiver permissão para `criar` um novo `pix`. Sua implementação seria da seguinte forma:

```jsx
import React from "react";
import { Button } from "@bmg-genesis/components";
import { Can } from "@bmg/arqf-feature-toggle-permission";

const SeuComponente: React.FC = () => (
  <div>
    {/* Outro conteúdo aqui */}
    <Can action="create" context="pix">
      <Button>Novo Pix</Button>
    </Can>
  </div>
);

export default SeuComponente;
```

Neste exemplo, o componente `Can` verifica se o usuário tem permissão para realizar a ação de criar um "pix". Se o usuário tiver essa permissão, o botão "Novo Pix" será renderizado; caso contrário, o botão não será exibido na interface do usuário.

Com o componente `Can`, você pode controlar de forma granular e flexível o acesso a diferentes partes da sua aplicação, proporcionando uma experiência personalizada e segura para seus usuários.

Para atualizar as permissões do usuário dentro de um componente React, podemos utilizar o hook `usePermissions` fornecido pela nossa biblioteca da seguinte maneira:

```jsx
import React, { useEffect } from 'react';
import { usePermissions } from '@bmg/arqf-feature-toggle-permission';

const SeuComponente: React.fc = () => {
  const { updatePermissions } = usePermissions();

  useEffect(() => {
    // Simulação de uma chamada assíncrona para obter novas permissões do usuário
    const fetchNewPermissions = async () => {
      try {
        // Aqui você pode realizar uma requisição à API para obter as novas permissões do usuário
        const novasPermissoes = await fetchNovasPermissoesDoUsuario();
        // Atualiza as permissões utilizando o hook updatePermissions
        updatePermissions(novasPermissoes);
      } catch (error) {
        console.error('Erro ao atualizar permissões:', error);
      }
    };

    // Chamada da função para obter e atualizar as permissões assim que o componente é montado
    fetchNewPermissions();

    // Note que neste exemplo, estamos ignorando as dependências do useEffect,
    // pois queremos apenas executar a busca de permissões uma vez, quando o componente é montado.
    // Se desejar atualizar as permissões em resposta a mudanças de estado ou de propriedades,
    // você pode adicionar essas dependências ao array de dependências do useEffect.
  }, []); // Array de dependências vazio indica que o efeito é executado apenas uma vez, quando o componente é montado.

  return (
    <div>
      {/* Conteúdo do componente aqui */}
    </div>
  );
}

export default SeuComponente;
```

Neste exemplo, o hook `usePermissions` é utilizado para atualizar dinamicamente as permissões do usuário dentro do componente SeuComponente. Uma chamada assíncrona é realizada para obter as novas permissões do usuário, que são então passadas para a função updatePermissions, garantindo uma experiência de usuário atualizada e personalizada.

A função `can` oferece flexibilidade para realizar renderizações condicionais e lógica de serviço fora do ciclo de renderização de view do React. Além disso, pode ser utilizada para efetuar chamadas condicionais a serviços ou outras operações similares.

```jsx
import React, { useMemo } from 'react';
import { Button } from "@bmg-genesis/components";
import { usePermissions } from '@bmg/arqf-feature-toggle-permission';

const SeuComponente: React.fc = () => {
  const { can } = usePermissions();

  const show = useMemo(() => can("action", "pix"), [can]);

  return (
    <div>
      {/* Conteúdo do componente aqui */}
      {/* Exemplo de uso da função can para renderizar condicionalmente um botão */}
      {show && (
        <Button>Novo Pix</Button>
      )}
    </div>
  );
}

export default SeuComponente;
```

Neste exemplo, utilizamos a função `can` para verificar se o usuário tem permissão para realizar a ação de criar um "pix". Se o usuário tiver essa permissão, o botão "Novo Pix" será renderizado; caso contrário, o botão não será exibido na interface do usuário.

A função utilitária `canHandler` foi projetada para ser utilizada fora do contexto do React, permitindo realizar validações a nível de serviço. Esta função aceita parâmetros que configuram seu comportamento, incluindo a ação (`action`), o contexto (`context`), e opcionalmente um objeto de permissões (`permissions`) para substituir as permissões padrão, e um objeto de opções (`options`), que contém callbacks de `yes` e `no` para serem executados em caso de permissão ou não, respectivamente. Se o objeto de opções não for fornecido, a função retornará um booleano indicando se a permissão foi concedida ou não.

```jsx
import { canHandler } from "@bmg/arqf-feature-toggle-permission";

// Exemplo de configuração para verificar se o usuário pode criar um novo "pix"
const config = {
  action: "criar",
  context: "pix",
  permissions: {
    pix: {
      criar: true,
    },
  },
  options: {
    yes: () => {
      console.log("Permissão concedida: usuário pode criar um novo pix");
      // Lógica para executar caso o usuário tenha permissão
    },
    no: () => {
      console.log("Permissão negada: usuário não pode criar um novo pix");
      // Lógica para executar caso o usuário não tenha permissão
    },
  },
};

// Chama a função canHandler com a configuração fornecida
canHandler(config);
```

Neste exemplo, utilizamos a função canHandler para verificar se o usuário tem permissão para criar um novo "pix", com base na configuração fornecida. Se o usuário tiver permissão, o callback `yes` será executado; caso contrário, o callback `no` será executado.
