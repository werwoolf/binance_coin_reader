SHELL= /bin/sh
include .env

COMPOSE_CONFIG=--env-file .env -p binance_coin_reader -f docker/docker-compose.$(ENVIRONMENT).yml

#ifeq ($(ENVIRONMENT),production)
#	INSTALL_DEPS_COMMAND = app npm ci --only=prod --legacy-peer-deps
#else
#	INSTALL_DEPS_COMMAND = app npm ci --legacy-peer-deps
#endif

up:
	docker-compose $(COMPOSE_CONFIG) up -d

#install:
#	docker-compose $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" $(INSTALL_DEPS_COMMAND)
#
#generate-migrations:
#	docker-compose $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" app npm run typeorm:run-migrations
#
#migrate:
#	docker-compose $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" app npm run typeorm:run-migrations

down:
	docker-compose $(COMPOSE_CONFIG) down

#deploy: up install migrate
