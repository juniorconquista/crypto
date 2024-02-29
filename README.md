# Crypto

A nossa biblioteca de criptografia é uma biblioteca JavaScript/TypeScript que oferece uma interface simplificada para operações de criptografia e descriptografia de dados usando o algoritmo `RSA-OAEP`. Com a capacidade de proteger dados sensíveis de forma eficaz e segura, esta biblioteca é ideal para aplicativos que requerem comunicação segura entre cliente e servidor, armazenamento de informações confidenciais em bancos de dados e muito mais.

## 🚀 Primeiros passos

Instale `@bmg/arqf-crypto` usando qualquer gerenciador de pacotes.

```sh
$ yarn add @bmg/arqf-crypto
# or
$ npm i @bmg/arqf-crypto
```

## ⚙️ Como configurar

Para começar, você precisará gerar um par de chaves pública e privada.
Você pode gerar um par de chaves RSA usando várias ferramentas e bibliotecas. Uma opção comum é usar o OpenSSL. Aqui está um guia passo a passo sobre como fazer isso:

### Gerando a chave privada

```bash
openssl genrsa -f4 -out private.pem 4096
```

Este comando irá gerar a chave privada e armazená-la no arquivo `private_key.pem`.

### Gerando a chave pública

```bash
openssl rsa -in private.pem -outform pem -pubout -out public.pem
```

Este comando irá extrair a chave pública do arquivo `private_key.pem` e armazená-la no arquivo `public_key.pem`.

**IMPORTANTE:** É fundamental adotar práticas de segurança ao lidar com chaves privadas. Recomendamos enfaticamente que você trafegue chaves privadas apenas por canais seguros e as armazene de forma criptografada, preferencialmente com uma senha e utilizando um método robusto de criptografia, como AES. Isso ajuda a garantir a confidencialidade das chaves e a proteger contra acessos não autorizados.

## 🛡️ Crypto

A classe `Crypto` fornece funcionalidades de criptografia para garantir a segurança dos dados em sua aplicação. Com o `Crypto`, você pode facilmente realizar operações de criptografia e descriptografia usando o algoritmo `RSA-OAEP`.

| Propriedades | Tipo                                  | Descrição                                                  |
| ------------ | ------------------------------------- | ---------------------------------------------------------- |
| publicKey    | `string`                              | A chave pública no formato PEM.                            |
| privateKey   | `string`                              | A chave privada no formato PEM.                            |
| algorithm    | `RSA-OAEP`                            | (Opcional) O algoritmo de criptografia (padrão: RSA-OAEP). |
| algorithm    | `SHA-1`,`SHA-256`,`SHA-384`,`SHA-512` | (Opcional) O algoritmo de criptografia (padrão: RSA-OAEP). |

## 💻 Uso

Para usar a biblioteca `Crypto` em seu projeto React, primeiro você precisa instanciar um objeto `Crypto` com as chaves pública e privada. Em seguida, você pode usar os métodos `encrypt` e `decrypt` para criptografar e descriptografar seus dados.

### Uso basico dentro de um Projeto React

```jsx
import React, { useState } from "react";
import { Crypto } from "@bmg-genesis/crypto";
import { Button, Text } from "@bmg-genesis/components";

const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n...`;
const privateKeyPEM = `-----BEGIN PRIVATE KEY-----\n...`;

const MyComponent:React.FC = () => {
  const [crypto] = useState(
    new Crypto({ publicKey: publicKeyPEM, privateKey: privateKeyPEM })
  );
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  const handleEncrypt = async () => {
    const data = "Dados confidenciais";
    const encrypted = await crypto.encrypt(data);
    setEncryptedData(encrypted);
  };

  const handleDecrypt = async () => {
    const decrypted = await crypto.decrypt(encryptedData);
    setDecryptedData(decrypted);
  };

  return (
    <>
      <Button onClick={handleEncrypt}>Criptografar Dados</Button>
      <Button onClick={handleDecrypt}>Descriptografar Dados</Button>
      <div>
        <Text>Texto Criptografado: {encryptedData}</Text>
        <Text>Texto Descriptografado: {decryptedData}</Text>
      </div>
    </>
  );
};

export default MyComponent;
```

Neste exemplo, criamos um componente React chamado `MyComponent` que usa a biblioteca `Crypto` para criptografar e descriptografar dados. Quando o usuário clica nos botões "Criptografar Dados" e "Descriptografar Dados", os métodos `encrypt` e `decrypt` são chamados, respectivamente, e o texto criptografado ou descriptografado é exibido na tela.

### Uso simulando um processo de Login

```jsx
import React, { useState } from "react";
import { Crypto } from "@bmg-genesis/crypto";
import { Button, Input, Text } from "@bmg-genesis/components";

// Chaves pública e privada (apenas para fins de demonstração)
const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n...`;
const privateKeyPEM = `-----BEGIN PRIVATE KEY-----\n...`;

// Função de autenticação simulada no servidor
const simulateServerLogin = async (encryptedCredentials) => {
  // Aqui você enviaria os dados criptografados para o servidor
  // para autenticação e receberia uma resposta do servidor
  // Simularemos retornando um token de acesso para ilustração
  return "fake_access_token";
};

const Login: React.FC = () => {
  const [crypto] = useState(
    new Crypto({ publicKey: publicKeyPEM, privateKey: privateKeyPEM })
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleLogin = async () => {
    // Concatenando nome de usuário e senha para criar os dados de login
    const credentials = `${username}:${password}`;

    // Criptografando os dados de login
    const encryptedCredentials = await crypto.encrypt(credentials);

    try {
      // Simulando a autenticação no servidor e recebendo o token de acesso
      const accessToken = await simulateServerLogin(encryptedCredentials);
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Nome de Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {accessToken && <Text>Token de Acesso: {accessToken}</Text>}
    </>
  );
};

export default Login;
```

Neste exemplo, o usuário insere seu nome de usuário e senha, que são criptografados antes de serem enviados para o servidor para autenticação. Após a autenticação bem-sucedida, um token de acesso é recebido do servidor e exibido na tela.

### Uso da criptografia em um serviço

```js
import { Crypto } from "@bmg-genesis/crypto";

// Chaves pública e privada (apenas para fins de demonstração)
const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n...`;
const privateKeyPEM = `-----BEGIN PRIVATE KEY-----\n...`;

// Função para enviar dados criptografados para o servidor
const sendDataToServer = async (encryptedData) => {
  // Aqui você enviaria os dados criptografados para o servidor
  // Simulamos imprimindo os dados criptografados neste exemplo
  console.log("Dados criptografados enviados para o servidor:", encryptedData);
};

// Função de exemplo que utiliza a biblioteca Crypto para criptografar dados
const encryptSensitiveData = async (data) => {
  const crypto = new Crypto({
    publicKey: publicKeyPEM,
    privateKey: privateKeyPEM,
  });

  try {
    // Criptografando os dados sensíveis
    const encryptedData = await crypto.encrypt(data);
    // Enviando os dados criptografados para o servidor
    await sendDataToServer(encryptedData);
    console.log(
      "Dados sensíveis criptografados com sucesso e enviados para o servidor."
    );
  } catch (error) {
    console.error("Erro ao criptografar os dados sensíveis:", error);
  }
};

// Exemplo de uso da função de criptografia de dados sensíveis
const sensitiveData = "Dados sensíveis que precisam ser protegidos!";
encryptSensitiveData(sensitiveData);
```

Este exemplo demonstra como você pode facilmente integrar a biblioteca `Crypto` em seu serviço para garantir a segurança dos dados sensíveis antes de enviá-los para o servidor.
