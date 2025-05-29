Как запустить проект:

1. Переключится на nvm use 14.15.0
2. Запусить npm i
3. Запустить ng s -o


для докера пересобрать
1. логинимся в vps ssh root@IP_адрес_сервера
2. останавливаем контейнер docker ps docker stop
3. удаляем контейнер docker ps -a docker rm tagcontainer
4. удаляем образ docker images docker rmi tagimage
5. переходим в папку frontend
6. удаляем rm -rf enterprise-monitoring
7. копируем репоизторий заново git clone url
8. переходим в enterprise-monitoring
9. делаем docker build -t frontend .
10. делаем docker run -d --restart always -p 80:80 frontend
