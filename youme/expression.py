# pyqt5

from PyQt5 import QtCore
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5 import uic

def drawNormalExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)


if __name__=="__main__":
    pass
