export function formatPhoneNumber(value?: string | null): string | undefined {
  value = value?.trim();

  if (!value) return;

  // Убираем все символы, кроме цифр
  let phone = value.replace(/\D/g, '');

  // Если длина не соответствует ожидаемой, возвращаем исходную строку или null
  if (phone.length !== 11) {
    // Если длина 10, добавляем '7' в начало
    if (phone.length === 10) {
      phone = '7' + phone;
    } else {
      return value;
    }
  }

  // Опционально: если номер начинается с '8', заменяем на '7'
  if (phone.startsWith('8')) {
    phone = '7' + phone.slice(1);
  }

  // Форматируем как: +7 (XXX) XXX-XX-XX
  const formatted = `+${phone[0]} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7, 9)}-${phone.substring(9)}`;

  return formatted;
}
