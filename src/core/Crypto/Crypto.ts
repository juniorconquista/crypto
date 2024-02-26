class Crypto {
  private textEncoder = new TextEncoder();

  constructor() {}

  /**
   * Decrypts data using a private key.
   * @param privateKeyPEM - The PEM-formatted private key.
   * @param encryptedHexPairs - The encrypted data in the form of hexadecimal pairs.
   * @returns The decrypted data as a string.
   */
  public async decrypt(privateKeyPEM: string, encryptedHexPairs: string): Promise<string> {
    const privateKey = await this.importPrivateKey(privateKeyPEM);

    // Convert hexadecimal pairs back to an array of bytes
    const encryptedHexArray: number[] = [];
    for (let i = 0; i < encryptedHexPairs.length; i += 2) {
      const hexPair = encryptedHexPairs.substring(i, i + 2);
      encryptedHexArray.push(parseInt(hexPair, 16));
    }
    const encryptedData = new Uint8Array(encryptedHexArray);

    // Decrypt the data using the private key
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey,
      encryptedData
    );

    // Decode the decrypted data to a string
    return new TextDecoder().decode(decryptedData);
  }

  /**
   * Encrypts data using a public key.
   * @param publicKeyPEM - The PEM-formatted public key.
   * @param data - The data to be encrypted.
   * @returns The encrypted data represented as hexadecimal pairs.
   */
  public async encrypt(publicKeyPEM: string, data: string): Promise<string> {
    const publicKey = await this.importPublicKey(publicKeyPEM);

    // Encode the data
    const encodedData = this.textEncoder.encode(data);

    // Encrypt the data using the public key
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      encodedData
    );

    // Convert the encrypted data to hexadecimal pairs
    const encryptedHexArray = new Uint8Array(encryptedData);
    const encryptedHexPairs: string[] = [];
    encryptedHexArray.forEach((byte) => {
      encryptedHexPairs.push(byte.toString(16).padStart(2, "0"));
    });

    // Return the string containing the hexadecimal pairs
    return encryptedHexPairs.join("");
  }

  /**
   * Parses a PEM-formatted key and returns it as an ArrayBuffer.
   * @param pem - The PEM-formatted key.
   * @returns The key as an ArrayBuffer.
   */
  private parsePEM(pem: string): ArrayBuffer {
    // Remove header, footer, and whitespace from PEM
    const encoded = pem
      .replace(/-----BEGIN (.*)-----/, "")
      .replace(/-----END (.*)-----/, "")
      .replace(/\s/g, "");

    // Convert base64-encoded string to ArrayBuffer
    const byteStr = atob(encoded);
    const bytes = new Uint8Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) {
      bytes[i] = byteStr.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Imports a public key from a PEM-formatted string.
   * @param publicKeyPEM - The PEM-formatted public key.
   * @returns The imported public key.
   */
  private async importPublicKey(publicKeyPEM: string): Promise<CryptoKey> {
    // Parse the PEM-formatted key
    const publicKeyData = this.parsePEM(publicKeyPEM);

    // Import the public key
    const publicKey = await crypto.subtle.importKey(
      "spki",
      publicKeyData,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" },
      },
      true,
      ["encrypt"]
    );
    return publicKey;
  }

  /**
   * Imports a private key from a PEM-formatted string.
   * @param privateKeyPEM - The PEM-formatted private key.
   * @returns The imported private key.
   */
  private async importPrivateKey(privateKeyPEM: string): Promise<CryptoKey> {
    // Parse the PEM-formatted key
    const privateKeyData = this.parsePEM(privateKeyPEM);

    // Import the private key
    const privateKey = await crypto.subtle.importKey(
      "pkcs8",
      privateKeyData,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" },
      },
      true,
      ["decrypt"]
    );
    return privateKey;
  }
}

export { Crypto };
