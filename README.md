## Установка и запуск:

1. Клонировать репозиторий:

```bash
git clone https://github.com/galagrin/analitics-service
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
├───assets                    # картинки и иконки
├───components                # переиспользуемые и непереиспользуемые компоненты
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
├───constants                 # константы для api
├───pages                     # страницы приложения
│ ├───GeneratorPage
│ ├───HistoryPage
│ └───HomePage
├───services
│ ├───api                     # логика запросов к api и валидации ошибак
│ └───storage                 # логика работы с local storage
├───store                     # стор zustand
└───utils                     # обработка дат
```

## Технологический стек:

- Язык: TypeScript

- Стили: CSS Modules
- State-менеджер: Zustand
- Роутинг: react-router-dom
- API: Fetch
- Модальные окна: React Portals
- Хранение данных для истории: LocalStorage
- Линтинг: ESLint + Prettier
