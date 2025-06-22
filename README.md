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

> Для корректной работы необходим запущенный backend на `http://localhost:3000`

## Структура проекта:

- входная точка - main.tsx
- настройка роутинка App.tsx
- настройка основных стилей приложения - index.css
- настройка форматирования - prettier.prettier.json
- каждый компонент содержит index.ts, который экспортирует наружу необходимое
- типы вынесены в отдельные файлы types.ts

```
├───assets                    # картинки и иконки
├───components                # переиспользуемые и непереиспользуемые компоненты
│ ├───Button                  # переиспользуемая кнопка
│ ├───FileInfo
│ ├───Header                  # шапка страниц
│ ├───Highlights              # хайлайты на главной странице
│ ├───HighlightsList
│ ├───HistoryItem             # компонент одной записи в истории
│ ├───HistoryItemsList        № компонент со списком HistoryItem и модальным окном
│ ├───InfoDisplay             # переиспользуемый компонент с кнопкой, лоадером и текстом
│ ├───MainLayout              # каркас отображения элементов на странице
│ ├───Modal                   # модельное окно
│ ├───ReportGenarationField   # поле генерации отчета
│ ├───UploadAndSend           #drag&drop + кнопка отправки и UploadField
│ └───UploadField             # загрузка файла по кнопке
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
