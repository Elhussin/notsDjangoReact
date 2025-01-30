pip install gunicorn

gunicorn --bind 127.0.0.1:8000 notsDjango.wsgi


gunicorn --bind 127.0.0.1:8000 notsDjango.wsgi --reload

pip install uvicorn


notsDjango.asgi:application --host 127.0.0.1 --port 8000 --reload