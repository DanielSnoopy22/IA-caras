input.onButtonPressed(Button.B, function () {
    music.stopAllSounds()
    unlocked = false
})
let microbit_Choice2_type = ""
let microbit_Choice = 0
let SerialData = ""
let unlocked = false
unlocked = false
let puntuación = 0
music.setVolume(185)
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(puntuación)
    }
})
basic.forever(function () {
    SerialData = serial.readString()
})
basic.forever(function () {
    if (unlocked == false) {
        if (SerialData == "CaraDaniel") {
            basic.showIcon(IconNames.Yes)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            unlocked = true
        } else if (SerialData == "CaraEyenga") {
            basic.showIcon(IconNames.Yes)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            unlocked = true
        } else if (SerialData == "Nada") {
            unlocked = false
            music.play(music.tonePlayable(131, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            basic.showIcon(IconNames.No)
            basic.pause(200)
            basic.showIcon(IconNames.Happy)
        } else {
            unlocked = false
        }
    } else if (unlocked == true) {
        microbit_Choice = randint(1, 3)
        SerialData = serial.readString()
        basic.pause(1000)
        basic.showLeds(`
            # # # # #
            . . . # .
            . . # . .
            # . . # .
            . # # # .
            `)
        basic.pause(500)
        basic.showLeds(`
            # # # . .
            . . . # .
            . . # . .
            . # . . .
            # # # # #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            # # # # #
            `)
        basic.clearScreen()
        basic.pause(500)
        music.play(music.tonePlayable(311, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.clearScreen()
        if (microbit_Choice == 1) {
            microbit_Choice2_type = "Tijeras"
        } else if (microbit_Choice == 2) {
            microbit_Choice2_type = "Piedra"
        } else if (microbit_Choice == 3) {
            microbit_Choice2_type = "Papel"
        }
        if (SerialData == "Tijeras" && microbit_Choice2_type != "Tijeras") {
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            puntuación += 1
        } else if (SerialData == "Papel" && microbit_Choice2_type != "Papel") {
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            puntuación += 1
        } else if (SerialData == "Piedra" && microbit_Choice2_type != "Piedra") {
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            puntuación += 1
        } else {
            music.play(music.tonePlayable(147, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            puntuación += -1
        }
    }
    basic.pause(3000)
})
