import type { EyebrowsShape, EyesShape, MouthShape } from '~/enums/widget.enums'
import type { Widget } from '~/types/widget.types'

export type EmotionType = 'Normal' | 'Positive' | 'Negative'
export interface EmotionalAvatarState {
  emotion: EmotionType
  widgets: {
    mouth: Widget<MouthShape>
    eyes: Widget<EyesShape>
    eyebrows: Widget<EyebrowsShape>
  }
}
