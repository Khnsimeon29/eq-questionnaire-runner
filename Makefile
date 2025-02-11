SCHEMAS_VERSION=`cat .schemas-version`
DESIGN_SYSTEM_VERSION=`cat .design-system-version`
RUNNER_ENV_FILE?=.development.env

clean:
	find schemas/* -prune | grep -v "schemas/test" | xargs rm -r
	rm -rf templates/components
	rm -rf templates/layout

load-schemas:
	./scripts/load_release.sh onsdigital/eq-questionnaire-schemas $(SCHEMAS_VERSION)

load-design-system-templates:
	./scripts/load_release.sh onsdigital/design-system $(DESIGN_SYSTEM_VERSION)
	./scripts/load_print_styles_from_cdn.sh $(DESIGN_SYSTEM_VERSION)

build: load-design-system-templates load-schemas translate

lint: lint-python
	yarn lint

lint-python:
	pipenv run ./scripts/run_lint_python.sh

format: format-python
	yarn format

format-python:
	pipenv run isort .
	pipenv run black .

test:
	pipenv run ./scripts/run_tests.sh

test-unit:
	pipenv run ./scripts/run_tests_unit.sh

test-functional:
	pipenv run ./scripts/run_tests_functional.sh

validate-test-schemas:
	pipenv run ./scripts/validate_test_schemas.sh

translation-templates:
	pipenv run python -m scripts.extract_translation_templates

test-translation-templates:
	pipenv run python -m scripts.extract_translation_templates --test

translate:
	pipenv run pybabel compile -d app/translations

run-validator:
	pipenv run ./scripts/run_validator.sh

link-development-env:
	ln -sf $(RUNNER_ENV_FILE) .env

run: build link-development-env
	pipenv run flask run

run-gunicorn-async: link-development-env
	WEB_SERVER_TYPE=gunicorn-async pipenv run ./run_app.sh

run-gunicorn-threads: link-development-env
	WEB_SERVER_TYPE=gunicorn-threads pipenv run ./run_app.sh

run-uwsgi: link-development-env
	WEB_SERVER_TYPE=uwsgi pipenv run ./run_app.sh

run-uwsgi-threads: link-development-env
	WEB_SERVER_TYPE=uwsgi-threads pipenv run ./run_app.sh

run-uwsgi-async: link-development-env
	WEB_SERVER_TYPE=uwsgi-async pipenv run ./run_app.sh

dev-compose-up:
	docker-compose -f docker-compose-dev-mac.yml pull eq-questionnaire-launcher
	docker-compose -f docker-compose-dev-mac.yml up -d

dev-compose-up-linux:
	docker-compose -f docker-compose-dev-linux.yml up -d

dev-compose-down:
	docker-compose -f docker-compose-dev-mac.yml down

dev-compose-down-linux:
	docker-compose -f docker-compose-dev-linux.yml down

profile:
	pipenv run python profile_application.py
