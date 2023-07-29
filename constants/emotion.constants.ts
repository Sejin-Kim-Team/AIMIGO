import type { EmotionalAvatarState } from '~/types/emotion.type'
import { EyebrowsShape, EyesShape, MouthShape } from '~/enums/widget.enums'

export const NormalEmotionalAvatarStates: [EmotionalAvatarState, EmotionalAvatarState] = [
  {
    emotion: 'Normal',
    widgets: {
      mouth: {
        shape: MouthShape.Smirk,
      },
      eyes: {
        shape: EyesShape.Ellipse,
      },
      eyebrows: {
        shape: EyebrowsShape.Up,
      },
    },
  },
  {
    emotion: 'Normal',
    widgets: {
      mouth: {
        shape: MouthShape.Surprised,
      },
      eyes: {
        shape: EyesShape.Ellipse,
      },
      eyebrows: {
        shape: EyebrowsShape.Up,
      },
    },
  },
]

export const PositiveEmotionalAvatarStates: [EmotionalAvatarState, EmotionalAvatarState] = [
  {
    emotion: 'Positive',
    widgets: {
      mouth: {
        shape: MouthShape.Smile,
      },
      eyes: {
        shape: EyesShape.Smiling,
      },
      eyebrows: {
        shape: EyebrowsShape.Up,
      },
    },
  },
  {
    emotion: 'Positive',
    widgets: {
      mouth: {
        shape: MouthShape.Laughing,
      },
      eyes: {
        shape: EyesShape.Smiling,
      },
      eyebrows: {
        shape: EyebrowsShape.Up,
      },
    },
  },
]

export const NegativeEmotionalAvatarStates: [EmotionalAvatarState, EmotionalAvatarState] = [
  {
    emotion: 'Negative',
    widgets: {
      mouth: {
        shape: MouthShape.Frown,
      },
      eyes: {
        shape: EyesShape.Ellipse,
      },
      eyebrows: {
        shape: EyebrowsShape.Down,
      },
    },
  },
  {
    emotion: 'Negative',
    widgets: {
      mouth: {
        shape: MouthShape.Nervous,
      },
      eyes: {
        shape: EyesShape.Ellipse,
      },
      eyebrows: {
        shape: EyebrowsShape.Down,
      },
    },
  },
]
