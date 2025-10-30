import type { TurningMode } from '@/types/slides'

export const ANIMATION_DEFAULT_DURATION = 1000
export const ANIMATION_DEFAULT_TRIGGER = 'click'
export const ANIMATION_CLASS_PREFIX = 'animate__'

export const ENTER_ANIMATIONS = [
  {
    type: 'bounce',
    name: 'Bounce',
    children: [
      { name: 'Bounce In', value: 'bounceIn' },
      { name: 'Bounce Right', value: 'bounceInLeft' },
      { name: 'Bounce Left', value: 'bounceInRight' },
      { name: 'Bounce Up', value: 'bounceInUp' },
      { name: 'Bounce Down', value: 'bounceInDown' },
    ],
  },
  {
    type: 'fade',
    name: 'Fade In',
    children: [
      { name: 'Fade In', value: 'fadeIn' },
      { name: 'Fade Down', value: 'fadeInDown' },
      { name: 'Down Fast', value: 'fadeInDownBig' },
      { name: 'Fade Right', value: 'fadeInLeft' },
      { name: 'Left Fast', value: 'fadeInLeftBig' },
      { name: 'Fade Left', value: 'fadeInRight' },
      { name: 'Right Fast', value: 'fadeInRightBig' },
      { name: 'Fade Up', value: 'fadeInUp' },
      { name: 'Up Fast', value: 'fadeInUpBig' },
      { name: 'Top Left', value: 'fadeInTopLeft' },
      { name: 'Top Right', value: 'fadeInTopRight' },
      { name: 'Bottom Left', value: 'fadeInBottomLeft' },
      { name: 'Bottom Right', value: 'fadeInBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: 'Rotate',
    children: [
      { name: 'Rotate In', value: 'rotateIn' },
      { name: 'Bottom Left', value: 'rotateInDownLeft' },
      { name: 'Rotate Down', value: 'rotateInDownRight' },
      { name: 'Top Left', value: 'rotateInUpLeft' },
      { name: 'Top Right', value: 'rotateInUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: 'Zoom In',
    children: [
      { name: 'Zoom In', value: 'zoomIn' },
      { name: 'Zoom Down', value: 'zoomInDown' },
      { name: 'Zoom Left', value: 'zoomInLeft' },
      { name: 'Zoom Right', value: 'zoomInRight' },
      { name: 'Zoom Up', value: 'zoomInUp' },
    ],
  },
  {
    type: 'slide',
    name: 'Slide In',
    children: [
      { name: 'Slide Down', value: 'slideInDown' },
      { name: 'Slide Right', value: 'slideInLeft' },
      { name: 'Slide Left', value: 'slideInRight' },
      { name: 'Slide Up', value: 'slideInUp' },
    ],
  },
  {
    type: 'flip',
    name: 'Flip In',
    children: [
      { name: 'Flip X Axis', value: 'flipInX' },
      { name: 'Flip Y Axis', value: 'flipInY' },
    ],
  },
  {
    type: 'back',
    name: 'Back In (Zoom + Slide)',
    children: [
      { name: 'Back Down', value: 'backInDown' },
      { name: 'Back Left', value: 'backInLeft' },
      { name: 'Back Right', value: 'backInRight' },
      { name: 'Back Up', value: 'backInUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: 'Fly In',
    children: [
      { name: 'Fly Right', value: 'lightSpeedInRight' },
      { name: 'Fly Left', value: 'lightSpeedInLeft' },
    ],
  },
]

export const EXIT_ANIMATIONS = [
  {
    type: 'bounce',
    name: 'Bounce',
    children: [
      { name: 'Bounce Out', value: 'bounceOut' },
      { name: 'Bounce Left', value: 'bounceOutLeft' },
      { name: 'Bounce Right', value: 'bounceOutRight' },
      { name: 'Bounce Up', value: 'bounceOutUp' },
      { name: 'Bounce Down', value: 'bounceOutDown' },
    ],
  },
  {
    type: 'fade',
    name: 'Fade Out',
    children: [
      { name: 'Fade Out', value: 'fadeOut' },
      { name: 'Fade Down', value: 'fadeOutDown' },
      { name: 'Down Fast', value: 'fadeOutDownBig' },
      { name: 'Fade Left', value: 'fadeOutLeft' },
      { name: 'Left Fast', value: 'fadeOutLeftBig' },
      { name: 'Fade Right', value: 'fadeOutRight' },
      { name: 'Right Fast', value: 'fadeOutRightBig' },
      { name: 'Fade Up', value: 'fadeOutUp' },
      { name: 'Up Fast', value: 'fadeOutUpBig' },
      { name: 'Top Left', value: 'fadeOutTopLeft' },
      { name: 'Top Right', value: 'fadeOutTopRight' },
      { name: 'Bottom Left', value: 'fadeOutBottomLeft' },
      { name: 'Bottom Right', value: 'fadeOutBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: 'Rotate Out',
    children: [
      { name: 'Rotate Out', value: 'rotateOut' },
      { name: 'Bottom Left', value: 'rotateOutDownLeft' },
      { name: 'Bottom Right', value: 'rotateOutDownRight' },
      { name: 'Top Left', value: 'rotateOutUpLeft' },
      { name: 'Top Right', value: 'rotateOutUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: 'Zoom Out',
    children: [
      { name: 'Zoom Out', value: 'zoomOut' },
      { name: 'Zoom Down', value: 'zoomOutDown' },
      { name: 'Zoom Left', value: 'zoomOutLeft' },
      { name: 'Zoom Right', value: 'zoomOutRight' },
      { name: 'Zoom Up', value: 'zoomOutUp' },
    ],
  },
  {
    type: 'slide',
    name: 'Slide Out',
    children: [
      { name: 'Slide Out Down', value: 'slideOutDown' },
      { name: 'Slide Left', value: 'slideOutLeft' },
      { name: 'Slide Right', value: 'slideOutRight' },
      { name: 'Slide Up', value: 'slideOutUp' },
    ],
  },
  {
    type: 'flip',
    name: 'Flip Out',
    children: [
      { name: 'Flip X Axis', value: 'flipOutX' },
      { name: 'Flip Y Axis', value: 'flipOutY' },
    ],
  },
  {
    type: 'back',
    name: 'Back Out (Shrink + Slide)',
    children: [
      { name: 'Back Down', value: 'backOutDown' },
      { name: 'Back Left', value: 'backOutLeft' },
      { name: 'Back Right', value: 'backOutRight' },
      { name: 'Back Up', value: 'backOutUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: 'Fly Out',
    children: [
      { name: 'Fly Right', value: 'lightSpeedOutRight' },
      { name: 'Fly Left', value: 'lightSpeedOutLeft' },
    ],
  },
]

export const ATTENTION_ANIMATIONS = [
  {
    type: 'shake',
    name: 'Shake',
    children: [
      { name: 'Left/Right', value: 'shakeX' },
      { name: 'Up/Down', value: 'shakeY' },
      { name: 'Head Shake', value: 'headShake' },
      { name: 'Swing', value: 'swing' },
      { name: 'Wobble', value: 'wobble' },
      { name: 'Tada', value: 'tada' },
      { name: 'Jelly', value: 'jello' },
    ],
  },
  {
    type: 'other',
    name: 'Other',
    children: [
      { name: 'Bounce', value: 'bounce' },
      { name: 'Flash', value: 'flash' },
      { name: 'Pulse', value: 'pulse' },
      { name: 'Rubber Band', value: 'rubberBand' },
      { name: 'Heart Beat', value: 'heartBeat' },
    ],
  },
]

interface SlideAnimation {
  label: string
  value: TurningMode
}

export const SLIDE_ANIMATIONS: SlideAnimation[] = [
  { label: 'None', value: 'no' },
  { label: 'Random', value: 'random' },
  { label: 'Left/Right', value: 'slideX' },
  { label: 'Up/Down', value: 'slideY' },
  { label: 'Left/Right (3D)', value: 'slideX3D' },
  { label: 'Up/Down (3D)', value: 'slideY3D' },
  { label: 'Fade In/Out', value: 'fade' },
  { label: 'Rotate', value: 'rotate' },
  { label: 'Expand Vertically', value: 'scaleY' },
  { label: 'Expand Horizontally', value: 'scaleX' },
  { label: 'Zoom In', value: 'scale' },
  { label: 'Zoom Out', value: 'scaleReverse' },
]