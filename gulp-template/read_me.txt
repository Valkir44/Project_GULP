

Комманды npm, которые нам пригодятся :
npm list - список всех установленных пакетов 
npm -g ls --depth=0 - список глобально установленнных пакетов
npm outdated проверить, не устарели ли пакеты
npm update gulp - обновление версий плагинов
npm init - создать package.json
npm install package_name - установить пакет (package_name - название нужного пакета)
npm install package_name --save-dev - установить пакет и вносит запись о нем в package.json в секцию devDependencies 
npm uninstall  package_name - удаление пакета
npm install - установить все пакеты, перечисленные в package.json 
Перед запуском в продакшн npm shrinkwrap - фиксируем версии пакетов,теперь npm install будет устанавливать именно их и вы будете уверены что все будет работать как надо

ссылки для информации:

1. https://simplamarket.com/blog/ispolzovanie-gulp-chast-1---ustanovka

2. https://habrahabr.ru/post/133363/#npm_install

3. Видеокурс по созданию https://www.youtube.com/watch?v=vW51JUVT66w&t=443s