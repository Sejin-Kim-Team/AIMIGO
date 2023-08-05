import type { AvatarOption } from '~/types/widget.types'
import {
  ClothesShape,
  EarShape,
  EarringsShape,
  EyebrowsShape,
  EyesShape,
  FaceShape,
  Gender,
  GlassesShape,
  MouthShape,
  NoseShape,
  TopsShape,
} from '~/enums/widget.enums'

export const PlaygroundAvatar: AvatarOption = {
  gender: Gender.Male,
  wrapperShape: 'circle',
  background: {
    color: 'linear-gradient(90deg, #ffecd2, #fcb69f)',
  },
  widgets: {
    face: {
      shape: FaceShape.Base,
      fillColor: '#F8D9CE',
    },
    tops: {
      shape: TopsShape.Wave,
      fillColor: '#F4D150',
    },
    ear: {
      shape: EarShape.Attached,
    },
    earrings: {
      shape: EarringsShape.None,
    },
    eyebrows: {
      shape: EyebrowsShape.Up,
    },
    eyes: {
      shape: EyesShape.Round,
    },
    nose: {
      shape: NoseShape.Round,
    },
    glasses: {
      shape: GlassesShape.None,
    },
    mouth: {
      shape: MouthShape.Smile,
    },
    beard: {
      shape: 'none',
      zIndex: 99,
    },
    clothes: {
      shape: ClothesShape.Open,
      fillColor: '#6BD9E9',
    },
  },
}
