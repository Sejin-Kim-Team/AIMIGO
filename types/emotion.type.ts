import type { MouthShape } from '~/enums/widget.enums'
import type { Widget } from '~/types/widget.types'

export type EmotionType = 'Normal' | 'Positive' | 'Negative'

export interface EmotionalAvatarState {
  emotion: EmotionType
  widgets: {
    mouth: [Widget<MouthShape>, Widget<MouthShape>]
    eye: [Widget<MouthShape>, Widget<MouthShape>]
    eyebrows: [Widget<MouthShape>, Widget<MouthShape>]
  }
}
