import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { replaceAll } from './general';

export function getHash(value: string): string {
  var hash = CryptoJS.SHA256(value).toString();
  var salt = replaceAll(CryptoJS.SHA256(hash[hash.length - 1]).toString(), { [hash[hash.length - 1]]: "" });
  return salt[0] + hash.substring(0, hash.length - 1);
}

export async function encryptRsa(publicKey: string, data: string): Promise<string> {
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
    Buffer.from(data, 'utf8')
  );

  return Buffer.from(encryptedKey).toString('base64');
}
