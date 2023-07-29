import type { AvatarOption } from '~/types/widget.types'

export const PlaygroundAvatar: AvatarOption = {
  gender: 'female',
  wrapperShape: 'circle',
  background: {
    color: 'linear-gradient(90deg, #ffecd2, #fcb69f)',
  },
  widgets: {
    face: {
      shape: 'base',
      fillColor: '#F8D9CE',
    },
    tops: {
      shape: 'wave',
      fillColor: '#F4D150',
    },
    ear: {
      shape: 'attached',
    },
    earrings: {
      shape: 'stud',
    },
    eyebrows: {
      shape: 'up',
    },
    eyes: {
      shape: 'eyeshadow',
    },
    nose: {
      shape: 'round',
    },
    glasses: {
      shape: 'round',
    },
    mouth: {
      shape: 'surprised',
    },
    beard: {
      shape: 'none',
      zIndex: 99,
    },
    clothes: {
      shape: 'open',
      fillColor: '#6BD9E9',
    },
  },
}
