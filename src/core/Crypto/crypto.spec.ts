import { Crypto } from "./Crypto";
import { CryptoConfig } from "./crypto.types";

const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApsSV4I+cb+viTqs4jDeUOacTOBLdh44KAYlnewdO4Mhs63fUZpVZtEmzwz3rwN3b6Dh7N3s2tNbsuDlw/Ziy/WfkW3LeSaV/D7E3j0r5E/no37xf0TzpOfUJA5hUVde4D2Y5VqqzSMQ3CVT5k5Tsdj30+f3PntastlVYxR1j2a5x33CQxmZK6py/GSHu2uA7IqxP31aF0+wsOb0ufrHH46plg+A+9e15HA0r99Pxs22jqTSHkKh5KSlREOrvX0OpMpyVXJQCBI8K94xuo45MNUl5swswR4Ihh3ktMA1yHXooURsscvd82gEA4otLwp2oOqxin/plG7M/tQ6CATf0GQIDAQAB
-----END PUBLIC KEY-----`;

const privateKeyPEM = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCmxJXgj5xv6+JOqziMN5Q5pxM4Et2HjgoBiWd7B07gyGzrd9RmlVm0SbPDPevA3dvoOHs3eza01uy4OXD9mLL9Z+Rbct5JpX8PsTePSvkT+ejfvF/RPOk59QkDmFRV17gPZjlWqrNIxDcJVPmTlOx2PfT5/c+e1qy2VVjFHWPZrnHfcJDGZkrqnL8ZIe7a4DsirE/fVoXT7Cw5vS5+scfjqmWD4D717XkcDSv30/GzbaOpNIeQqHkpKVEQ6u9fQ6kynJVclAIEjwr3jG6jjkw1SXmzCzBHgiGHeS0wDXIdeihRGyxy93zaAQDii0vCnag6rGKf+mUbsz+1DoIBN/QZAgMBAAECggEALYf8t5veBTysw/fBb575DCiOeb/E1e600qiWJSPgqERwYHWN+xgJrsx0lPjB9h1cnfFVytcMH6GSbdXZAJQBQmhsE3+wKwFRSJKE7c11ZbvUlclTi8gKkTVSabXcSLel3CZ3vy7J1jMkJ5sYrO97A+l0ihB+8AoCi6GPo/mbOmISfvLDINtJrpp3no2FtjAfjhBIuqN/286BrmF+tieMr6Y+dVmQ30lEmICDwMrfmUG/p7ou1hDPWSgNsr11KwVnxunCUHHqnm2YWrR75pI5ylD8VuSYTTBiKUpMV5walf8mMXwebX3KBjwPEbU9ZSHBflM6Ri6Ufl7tm0EzKyCeBQKBgQDTuUPtlEYVmV2pfayA0SNNdAI1V5ZPtAG2obDt8VYba0z0tCfnLtg3FHNqL8wAiyH7ajKKpHyYtdd6OKQbYZtWjaa7jSzrm6m3J93hpi7InoHd3gdoXMhiMrVgLY66WbNX8VIwroF3A1+pegJZk55Y/UT/m538YkS2386x0HznLwKBgQDJpJb30IBYbdDfT5XRVatG5lYbzgK0WnS7bekRusBXihQSSgEFSLgeiWFaose9XPv3i2WHqBaRO0livokhGaYNBUiWJe4EvD81cmpA43miSN2TRzAPJD7MzIZBljJmaYQNs0rLahfb+ZiUvzfhKrtIqEh9IuFmWZwlew8a8PAHNwKBgCJHpdLqpepLWZneqjZ1JiUdOlpOoxymhXx/c3kjEREBb4VTQf6xW/qXChTQRlR0Mn1VdXdzKGVFU+0LDK8OP6tk5fEJ65L+Mh1gjBFD6eE7oMU+dK6WDy+vDCTVW32almoPvYH6TyXo2u1Cvuyn9QRthWVpWcwKURvW4s1xdzerAoGAQJ/rcoj0WWL4qllLXsfiGNsBhe/EliDXgKp9JB2CP4wVWrc1FIh12fOVrAK3mU0PxAp9A7kvYmRp5KfEM0ORIGMtHFITspjSeUKuIxXEiepoeSc7k9698c0qyiJlDMWMeQeZVRAvjWS1LhcKxbN4SpUEhnaDXtYhYTHLaYsGookCgYBKWBjzynkUeo5jiy/kqWbU5sMwa/zpoBe+dwdG+jq6ojgavApt8P4dxbXl3z5NcOsPsfhj1LnZ2gIBvsWJjzjB6MKtnH0+OwKgfdkdThhoQvh6AVVf47Zf+u7a57rmK67wR1YqDneidMu3VqfTBVKmlKTugOrAvXHaAKMV96VtaQ==
-----END PRIVATE KEY-----`;

const makeSut = (
  config: CryptoConfig = {
    privateKey: privateKeyPEM,
    publicKey: publicKeyPEM,
  }
) => new Crypto(config);

describe("GIVEN Crypto", () => {
  describe("WHEN rendered", () => {
    it("THEN should decrypt data using a private key", async () => {
      const data = "30030030030";
      const sut = makeSut();
      const encryptedData = await sut.encrypt(data);
      const decryptedData = await sut.decrypt(encryptedData);
      expect(decryptedData).toBe(data);
    });

    it("AND should decrypt empty data", async () => {
      const data = "";
      const sut = makeSut();
      const encryptedData = await sut.encrypt(data);
      const decryptedData = await sut.decrypt(encryptedData);
      expect(decryptedData).toBe(data);
    });

    it("AND should decrypt data", async () => {
      const data = "30030030030";
      const sut = makeSut();
      const encryptedData = await sut.encrypt(data);
      const decryptedData = await sut.decrypt(encryptedData);
      expect(decryptedData).toBe(data);
    });

    it("AND should throw error on invalid private key", async () => {
      const data = "30030030030";
      const sut = makeSut({
        publicKey: publicKeyPEM,
        privateKey: "invalidPrivateKey",
        algorithm: "RSA-OAEP"
      });
      const decryptedData = await sut.encrypt(data);
      await expect(sut.decrypt(decryptedData)).rejects.toThrow();
    });

    it("AND should throw error on invalid encrypted data", async () => {
      const sut = makeSut();
      await expect(sut.decrypt("invalidEncryptedData")).rejects.toThrow();
    });

    it("AND should throw error when encrypting without public key", async () => {
      const data = "30030030030";
      const sut = new Crypto({ privateKey: privateKeyPEM });
      await expect(sut.encrypt(data)).rejects.toThrow(
        "Public key not provided."
      );
    });

    it("AND should throw error when decrypting without private key", async () => {
      const data = "30030030030";
      const sut = new Crypto({ publicKey: publicKeyPEM });
      const encryptedData = await sut.encrypt(data);
      const newSut = new Crypto({});
      await expect(newSut.decrypt(encryptedData)).rejects.toThrow(
        "Private key not provided."
      );
    });
  });
});
