const prefix: string = 'XX';

interface ILocalValue {
  value: string;
  expiry?: number;
}

export function getLocalValue(key: string): string|null {
  const item = localStorage.getItem(`${prefix}_${key}`);

  if (!item) {
    return null;
  }

  const data: ILocalValue = JSON.parse(item);

  if (data.expiry && data.expiry > Date.now()) {
    removeLocalValue(key);
    return null;
  }

  return data.value;
}

export function setLocalValue(key: string, value: string, expiry?: Date): void {
  const data: ILocalValue = { value };

  if (expiry) {
    data.expiry = expiry.valueOf();
  }

  localStorage.setItem(`${prefix}_${key}`, JSON.stringify(data));
}

export function removeLocalValue(key: string): void {
  localStorage.removeItem(`${prefix}_${key}`);
}
