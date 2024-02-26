export type Algorithm =
  | "RSA-OAEP"
  | "RSA-OAEP-256"
  | "RSA1_5"
  | "RSAES-PKCS1-v1_5"
  | "RSA-PSS";

export interface CryptoConfig {
  publicKey?: string;
  privateKey?: string;
  algorithm?: "RSA-OAEP";
}
