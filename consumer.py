import datetime
import pika
import os

# todo: Fix
# from django.conf import settings
# settings.configure()
# credentials = pika.PlainCredentials(settings.RABBITMQ_USER, settings.RABBITMQ_PASSWORD)
#
# params = pika.ConnectionParameters(settings.RABBITMQ_HOST, credentials=credentials)


# region RABBITMQ
RABBITMQ_HOST = os.environ.get('RABBITMQ_HOST', 'localhost')
RABBITMQ_USER = os.environ.get('RABBITMQ_USER', 'localhost')
RABBITMQ_PASSWORD = os.environ.get('RABBITMQ_PASSWORD', 'localhost')
# endregion
credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)

params = pika.ConnectionParameters(RABBITMQ_HOST, credentials=credentials)

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='logger')


def logger_debug(ch, method, properties, body):
    print(f'[INFO]: [{datetime.datetime.utcnow()}] - {str(body)[2:-1]}')



channel.basic_consume(queue='logger',
                      auto_ack=True,
                      on_message_callback=logger_debug)

channel.start_consuming()

channel.close()
