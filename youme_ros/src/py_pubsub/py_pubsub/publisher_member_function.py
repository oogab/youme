import rclpy
from rclpy.node import Node

import socketio

from geometry_msgs.msg import Twist
from std_msgs.msg import String


global sio
sio = socketio.Client(logger=True, engineio_logger=True)

global status
status ='stop'

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')

        sio.connect('http://172.30.1.41:8000/')
        sio.emit("roomjoin","turtlebot")
        self.cmd_publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

        self.cmd_msg = Twist()

    def turtlebot_cw_rot(self) :

        self.cmd_msg.angular.z=0.1
    def turtlebot_stop(self) :
        self.cmd_msg.linear.x=0.0
        self.cmd_msg.angular.z=0.0
    def timer_callback(self):
        global status
        if status=='start':
            self.turtlebot_cw_rot()
        else :
            self.turtlebot_stop()

        self.cmd_publisher.publish(self.cmd_msg)
    
    @sio.event
    def connect():
        print('connection established')

    @sio.event
    def disconnect():
        print('disconnected from server')

    @sio.on("turtlebot")
    def turtlebot(data):
        global status
        status = data


def main(args=None):
    rclpy.init(args=args)

    minimal_publisher = MinimalPublisher()

    rclpy.spin(minimal_publisher)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
