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

def drawHeartOneExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawChord(250, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(300, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(250, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(250, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawChord(450, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(500, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(450, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(450, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawLine(400, 250, 300, 350)
    paint.drawLine(400, 250, 500, 350)
    paint.drawLine(300, 350, 500, 350)

def drawHeartTwoExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawChord(250, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(300, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(250, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(250, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawChord(450, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawChord(500, 130, 50, 50, 0 * 16, 180 * 16)
    paint.drawPie(450, 105, 100, 100, 180 * 16, 90 * 16)
    paint.drawPie(450, 105, 100, 100, 270 * 16, 90 * 16)
    paint.drawLine(300, 350, 500, 350)

def drawSmileTeethExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawLine(300, 280, 500, 280)
    paint.drawLine(366, 280, 366, 355)
    paint.drawLine(434, 280, 434, 355)
    paint.drawArc(300, 200, 200, 160, 180 * 16, 180 * 16)

def drawDissapointedExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawLine(400, 250, 300, 350)
    paint.drawLine(400, 250, 500, 350)

def drawBlankExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawLine(300, 350, 500, 350)

def drawSurpriseExpression(paint):
    paint.setBrush(QColor(Qt.white))
    paint.setPen(QPen(Qt.white, 5))
    paint.drawEllipse(250, 100, 80, 120)
    paint.drawEllipse(470, 100, 80, 120)
    paint.drawArc(300, 230, 200, 180, 0 * 16, 360 * 16)

if __name__=="__main__":
    pass
