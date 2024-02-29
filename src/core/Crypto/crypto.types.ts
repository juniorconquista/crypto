export type Algorithm = "RSA-OAEP";
export type Hash = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export interface CryptoConfig {
  publicKey?: string;
  privateKey?: string;
  algorithm?: Algorithm;
  hash?: Hash
}
