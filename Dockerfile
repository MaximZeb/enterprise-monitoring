FROM nginx:alpine

# Удаляем конфигурацию по умолчанию
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу конфигурацию
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из репозитория
COPY . /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Nginx запустится автоматически
CMD ["nginx", "-g", "daemon off;"]
