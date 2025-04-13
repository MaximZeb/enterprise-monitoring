FROM nginx:alpine

# Копируем собранные файлы из репозитория
COPY . /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Nginx запустится автоматически
CMD ["nginx", "-g", "daemon off;"]
