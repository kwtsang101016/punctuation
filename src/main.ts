import './style.css';
import { mount } from './app';

try {
  mount();
} catch (error) {
  console.error('應用程式啟動失敗', error);
  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML =
      '<p style="padding:2rem;font-family:sans-serif;color:#b23a2f;">載入失敗，請重新整理頁面。</p>';
  }
}
