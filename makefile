.PHONY: i ino u da ni nu nci dev prod gen ncu ncuu apply rebuild migrate backup queue clear cg seedin seedout fixseed reset merge
.DEFAULT_GOAL := help

######################
### COMPOSER

i:
	ddev composer install --no-dev --working-dir=backend

ino:
	ddev composer install --no-scripts --no-interaction --no-dev --working-dir=backend

u:
	ddev exec rm -rf ./backend/storage/runtime/*
	ddev composer update --working-dir=backend

da:
	ddev exec rm -rf ./backend/storage/runtime/*
	ddev composer dump-autoload -a --working-dir=backend

######################
### NODE/NPM

ni:
	ddev npm i --prefix=frontend

nu:
	ddev npm update --prefix=frontend

nci:
	ddev npm ci --no-audit --legacy-peer-deps --prefix=frontend

dev:
	ddev npm run dev --prefix=frontend

prod:
	ddev npm run prod --prefix=frontend

gen:
	ddev npm run generate --prefix=frontend

ncu:
	ddev exec ./frontend/node_modules/.bin/ncu --packageFile=./frontend/package.json

ncuu:
	ddev exec ./frontend/node_modules/.bin/ncu -u --packageFile=./frontend/package.json

######################
### CRAFT

apply:
	ddev php ./backend/craft project-config/apply

#apply-force:
#	ddev php ./backend/craft project-config/apply --force

rebuild:
	ddev php ./backend/craft project-config/rebuild

migrate:
	ddev php ./backend/craft migrate/all --interactive=0

backup:
	ddev php ./backend/craft db/backup --zip

queue:
	ddev php ./backend/craft queue/run -v

clear:
	ddev php ./backend/craft clear-caches/data
	ddev php ./backend/craft clear-caches/temp-files

gc:
	ddev php ./backend/craft gc/run --delete-all-trashed

seedin:
	ddev php ./backend/craft db/restore ./backend/storage/backups/seed.sql --drop-all-tables --interactive=0

seedout:
	make gc
	ddev php ./backend/craft db/backup ./backend/storage/backups/seed.sql --overwrite --interactive=0

######################
### UTILS

fixseed:
	ddev exec "sed -i 's/SET @@/-- SET @@/g' ./backend/storage/backups/seed.sql"

reset:
	ddev poweroff
	docker network prune --force
	ddev start
	make clear

merge:
#	git add -A
#	git commit -m '...'
	git push . HEAD:main
	git push origin main

######################
### TEST

#test-build:
#	ddev exec ./backend/vendor/bin/codecept build

#test:
#	ddev exec ln --symbolic --force ../.env ./tests/.env
#	ddev exec ln --symbolic --force ../../../config/app.php ./tests/_craft/config/app.php
#	ddev exec ln --symbolic --force ../../../config/general.php ./tests/_craft/config/general.php
#	ddev exec ln --symbolic --force ../../../config/routes.php ./tests/_craft/config/routes.php
#	ddev exec ln --symbolic --force ../../../config/license.key ./tests/_craft/config/license.key
#	ddev exec ./backend/vendor/bin/codecept run unit --xml
#	ddev exec mv ./tests/_output/report.xml ./tests/_output/unit.xml
#	ddev exec ./backend/vendor/bin/codecept run api --xml
#	ddev exec mv ./tests/_output/report.xml ./tests/_output/api.xml

help: Makefile
	@sed -n 's/^##//p' $<

%:
	@:

# git rm -r --cached .; git add .; git commit -m "fix untracked files";

# rm -rf .git && git init && git add -A && git commit -m "reset repo" && git branch -M main
