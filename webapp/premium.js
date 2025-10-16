// Подключение к Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Подхват цвета кнопки из темы TG
const setPrimaryFromTheme = () => {
  const buttonColor = tg.themeParams?.button_color;
  if (buttonColor) {
    document.documentElement.style.setProperty('--primary', buttonColor);
  }
};
setPrimaryFromTheme();
tg.onEvent?.('themeChanged', setPrimaryFromTheme);

// Поддержка: можно передать ?support=username или ?support_url=https://t.me/xxx
const qs = new URLSearchParams(location.search);
const SUPPORT_USERNAME = qs.get('support') || 'progpt5_bot';
const SUPPORT_URL = qs.get('support_url') || `https://t.me/${SUPPORT_USERNAME}`;

// Кнопки
document.getElementById('buy')?.addEventListener('click', () => {
  tg.sendData(JSON.stringify({ type: 'subscribe' })); // бот пришлёт invoice
  tg.close();
});

document.getElementById('status')?.addEventListener('click', () => {
  tg.sendData(JSON.stringify({ type: 'status' }));
  tg.close();
});

document.getElementById('support')?.addEventListener('click', () => {
  tg.openTelegramLink(SUPPORT_URL);
});
