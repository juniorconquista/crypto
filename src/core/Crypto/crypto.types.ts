export type Algorithm = "RSA-OAEP";

export interface CryptoConfig {
  publicKey?: string;
  privateKey?: string;
  algorithm?: "RSA-OAEP";
}
