export function NEWID(): string {
	return Math.random().toString(36).replace(/[^a-z]+/g, '');
}

export function isNull(value: any): boolean {
  return [null, undefined].includes(value);
}

export function isNullOrWhitespace(value: any): boolean {
  return isNull(value) || value.toString().trim() === '';
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isJson(value: any): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function onlyUnique(value: any, index: number, self: any[]): boolean {
  return self.indexOf(value) === index;
}

export function replaceAll(text: string, oldValue: string, newValue: string): string {
  let result = JSON.stringify(text); // copy text-object
  while (result.indexOf(oldValue) !== -1) {
    result = result.replace(oldValue, newValue);
  }
  return result;
}

export function formatDateTime(date: Date, format: string): string {
  let result: string = JSON.stringify(format); // copy format-object

  result += replaceAll(result, 'yyyy', date.getFullYear().toString());
  result += replaceAll(result, 'yy', date.getFullYear().toString().slice(-2));
  result += replaceAll(result, 'MM', `00${date.getMonth()+1}`.slice(-2));
  result += replaceAll(result, 'M', (date.getMonth()+1).toString());
  result += replaceAll(result, 'dd', `00${date.getDate()}`.slice(-2));
  result += replaceAll(result, 'd', date.getDate().toString());
  result += replaceAll(result, 'HH', `00${date.getHours()}`.slice(-2));
  result += replaceAll(result, 'H', date.getHours().toString());
  result += replaceAll(result, 'hh', `00${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}`.slice(-2));
  result += replaceAll(result, 'h', (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()).toString());
  result += replaceAll(result, 'mm', `00${date.getMinutes()}`.slice(-2));
  result += replaceAll(result, 'm', date.getMinutes().toString());
  result += replaceAll(result, 'ss', `00${date.getSeconds()}`.slice(-2));
  result += replaceAll(result, 's', date.getSeconds().toString());
  result += replaceAll(result, 'z', `0000${date.getMilliseconds()}`.slice(-4));

  return result;
}
