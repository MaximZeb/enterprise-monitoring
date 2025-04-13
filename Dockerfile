FROM nginx:alpine

# Удаляем конфигурацию по умолчанию
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы Angular приложения из папки dist/monitoring/browser
# в папку /usr/share/nginx/html внутри контейнера.
COPY dist/monitoring/browser /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
