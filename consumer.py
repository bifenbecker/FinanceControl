import pika, os

params = pika.ConnectionParameters(os.environ.get('RABBITMQ_HOST', 'localhost'))

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='hello')

def callback(ch, method, properties, body):
    print('Received')
    print(body)

channel.basic_consume(queue='hello',
                      auto_ack=True,
                      on_message_callback=callback)

channel.start_consuming()
