import pika, os

params = pika.ConnectionParameters(os.environ.get('RABBITMQ_HOST', 'localhost'))

connection = pika.BlockingConnection(params)

channel = connection.channel()



def publish():
    channel.basic_publish(exchange='',
                          routing_key='hello',
                          body='Hello World!')


