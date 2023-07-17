import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { replaceAll } from './general';

export function getHash(value: string): string {
  var hash = CryptoJS.SHA256(value).toString();
  var salt = replaceAll(CryptoJS.SHA256(hash[hash.length - 1]).toString(), hash[hash.length - 1], "");
  return salt[0] + hash.substring(0, hash.length - 1);
}

export async function encryptRsa(value: string, publicKey: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'spki',
    Buffer.from(publicKey, 'base64'),
    { name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
    false,
    ['encrypt']
  );

  let encryptedKey: any = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    cryptoKey,
    Buffer.from(value, 'utf8')
  );

  return Buffer.from(encryptedKey).toString('base64');
}

export function encryptAes(value: string, secret: string, salt: string): string {
  const secretBytes = CryptoJS.enc.Utf16LE.parse(secret);
  const saltBytes = CryptoJS.enc.Utf16LE.parse(salt);
  const dataBytes = CryptoJS.enc.Utf16LE.parse(value);

  const derivedKey = CryptoJS.PBKDF2(secretBytes, saltBytes, { keySize: 256 / 32 + 128 / 32, iterations: 1000 });
  const aesKey = CryptoJS.lib.WordArray.create(derivedKey.words.slice(0, 256 / 32));

  const iv = CryptoJS.lib.WordArray.create(derivedKey.words.slice(256 / 32, 256 / 32 + 128 / 32));

  const encrypted = CryptoJS.AES.encrypt(dataBytes, aesKey, { iv });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
