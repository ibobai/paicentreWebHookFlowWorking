export function generatePaymentId(): string {
  const prefix = Math.random() < 0.5 ? 'py_' : 'PAY-';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = Math.random() < 0.5 ? 10 : 12;
  let result = prefix;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}