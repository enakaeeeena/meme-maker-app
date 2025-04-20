# Meme Maker Pro - Генератор мемов с продвинутым редактором

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev)
[![React Router](https://img.shields.io/badge/React_Router-6.15.0-green)](https://reactrouter.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.1-purple)](https://getbootstrap.com)

Инструмент для создания мемов с интуитивным интерфейсом и функциями редактирования

![meme_app](https://github.com/user-attachments/assets/9016cba0-97b1-44b0-b801-b949d49948e3)

## Основные возможности
- **Динамическое добавление текста** в любую область изображения
- **Интерактивное перетаскивание** текстовых блоков
- **Двойной режим редактирования**:
  - Редактирование по клику
  - Перетаскивание текста
- **Экспорт в JPEG** с высоким качеством
- **База мемов** через Imgflip API
- **Адаптивный интерфейс** с сохранением пропорций

## Технологический стек
- **React** + **TypeScript**
- **React Bootstrap** для UI компонентов
- **html-to-image** для экспорта
- **Imgflip API** для шаблонов мемов

## Быстрый старт
1. Клонируйте репозиторий:
```bash
git clone https://github.com/enakaeeeena/meme-maker-app.git
```
2.Установите зависимости:
``` bash
cd vite-project
npm install
```
3. Запустите приложение
``` bash
npm run dev
```
## Структура компонентов
```
src/
├── components/
│   ├── Text.tsx        # Текстовый блок с редактированием
│   └── Card.tsx        # Карточка шаблона мема
├── pages/
│   ├── Home.tsx        # Главная страница с шаблонами
│   └── Edit.tsx        # Редактор мемов
└── api/
    └── memes.ts        # API интеграция
```
##  Примеры использования
Добавление и редактирование текста
```tsx
const Text = () => {
  const [editMode, setEditMode] = useState(false);
  const handleClick = () => setEditMode(true);
  
  return (
    <div onDrag={handleDrag}>
      {editMode ? (
        <input value={text} onChange={updateText} />
      ) : (
        <h3 onClick={handleClick}>{text}</h3>
      )}
    </div>
  );
};
```
Экспорт готового изображения
```
const handleExport = () => {
  toJpeg(memeRef.current, {
    quality: 0.95,
    backgroundColor: "#fff",
  }).then(dataUrl => {
    const link = document.createElement("a");
    link.download = "meme.jpg";
    link.href = dataUrl;
    link.click();
  });
};
```

## Возможности для улучшения
- Добавить выбор шрифтов и цветов текста
- Реализовать слои для управления элементами
- Добавить историю изменений (undo/redo)
- Интеграция с социальными сетями
