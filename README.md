## Установка и запуск:

1. Клонировать репозиторий:

```bash
git clone [ссылка-на-репозиторий]
```

2. Установить зависимости:

```bash
npm install
```

3.  Запустить проект:

```bash
npm run dev
```

## Структура проекта:

```
├───assets
├───components
│ ├───Button
│ ├───FileInfo
│ ├───Header
│ ├───Highlights
│ ├───HighlightsList
│ ├───HistoryItem
│ ├───HistoryItemsList
│ ├───InfoDisplay
│ ├───MainLayout
│ ├───Modal
│ ├───ReportGenarationField
│ ├───UploadAndSend
│ └───UploadField
├───constants
├───pages
│ ├───GeneratorPage
│ ├───HistoryPage
│ └───HomePage
├───services
│ ├───api
│ └───storage
├───store
└───utils
```

## Технологический стек:

-   Язык: TypeScript

-   Стили: CSS Modules
-   State-менеджер: Zustand
-   Роутинг: react-router-dom
-   API: Fetch
-   Модальные окна: React Portals
-   Хранение данных для истории: LocalStorage
-   Линтинг: ESLint + Prettier
