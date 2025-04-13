# Используем официальный образ Node.js для сборки
FROM node:14.15.0

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код Angular-приложения
COPY . .

# Собираем Angular-приложение для production
RUN npm run build --prod

# Используем Nginx для обслуживания статических файлов
FROM nginx:alpine

# Копируем собранные файлы из этапа сборки
COPY --from=builder /app/dist/monitoring/browser /usr/share/nginx/html  # <- ИЗМЕНЕНО

# Открываем порт 80
EXPOSE 80

# Nginx запустится автоматически
CMD ["nginx", "-g", "daemon off;"]