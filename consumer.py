import os
import datetime
import pika

credentials = pika.PlainCredentials('admin', 'admin')
params = pika.ConnectionParameters(os.environ.get('RABBITMQ_HOST', 'localhost'), credentials=credentials)

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
