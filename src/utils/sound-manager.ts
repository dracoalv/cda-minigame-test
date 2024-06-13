import { Howl } from 'howler'

export const timerSound = new Howl({ src: ['/assets/sounds/timer.mp3'], loop: true })
export const keyboardSound = new Howl({ src: ['/assets/sounds/click-button.mp3'] })
export const wrongSound = new Howl({ src: ['/assets/sounds/error.mp3'] })
export const correctSequenceSound = new Howl({ src: ['/assets/sounds/correct.mp3'] })
export const successSound = new Howl({ src: ['/assets/sounds/success.mp3'] })
