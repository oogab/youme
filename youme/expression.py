# pyqt5

import youme_main as ym

from PyQt5 import QtCore
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5 import uic

def drawLoadingExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(100, 100, 100, 100, 180 * 16, 180 * 16)
    paint.drawArc(340, 100, 100, 100, 180 * 16, 180 * 16)
    paint.drawArc(160, 200, 200, 160, 180 * 16, 180 * 16)

def drawNormalExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawTalkExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.setPen(QPen(Qt.white, 5))
    paint.drawChord(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawSmileExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(250, 150, 100, 100, 0 * 16, 180 * 16)
    paint.drawArc(450, 150, 100, 100, 0 * 16, 180 * 16)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawHeartExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawArc(100, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawArc(150, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawArc(100, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawArc(100, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawArc(340, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawArc(390, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawArc(340, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawArc(340, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawLine(245, 200, 100, 250)
    paint.drawLine(245, 200, 390, 250)
    paint.drawLine(100, 250, 390, 250)


if __name__=="__main__":
    pass
