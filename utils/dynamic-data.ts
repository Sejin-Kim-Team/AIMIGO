import {
  BeardShape,
  ClothesShape,
  EarShape,
  EarringsShape,
  EyebrowsShape,
  EyesShape,
  FaceShape,
  GlassesShape,
  MouthShape,
  NoseShape,
  TopsShape,
  WidgetType,
} from '~/enums/widget.enums'

/** @internal */
type Data = Readonly<{
  [key in `${WidgetType}`]: {
    [key in string]: () => Promise<any>
  }
}>

const widgetData: Data = {
  [WidgetType.Face]: {
    [FaceShape.Base]: () => import('~/assets/images/widgets/face/base.svg?raw'),
  },

  [WidgetType.Ear]: {
    [EarShape.Attached]: () => import('~/assets/images/widgets/ear/attached.svg?raw'),
    [EarShape.Detached]: () => import('~/assets/images/widgets/ear/detached.svg?raw'),
  },

  [WidgetType.Eyes]: {
    [EyesShape.Ellipse]: () => import('~/assets/images/widgets/eyes/ellipse.svg?raw'),
    [EyesShape.Eyeshadow]: () =>
      import('~/assets/images/widgets/eyes/eyeshadow.svg?raw'),
    [EyesShape.Round]: () => import('~/assets/images/widgets/eyes/round.svg?raw'),
    [EyesShape.Smiling]: () => import('~/assets/images/widgets/eyes/smiling.svg?raw'),
  },

  [WidgetType.Beard]: {
    [BeardShape.Scruff]: () => import('~/assets/images/widgets/beard/scruff.svg?raw'),
  },

  [WidgetType.Clothes]: {
    [ClothesShape.Collared]: () =>
      import('~/assets/images/widgets/clothes/collared.svg?raw'),
    [ClothesShape.Crew]: () => import('~/assets/images/widgets/clothes/crew.svg?raw'),
    [ClothesShape.Open]: () => import('~/assets/images/widgets/clothes/open.svg?raw'),
  },

  [WidgetType.Earrings]: {
    [EarringsShape.Hoop]: () =>
      import('~/assets/images/widgets/earrings/hoop.svg?raw'),
    [EarringsShape.Stud]: () =>
      import('~/assets/images/widgets/earrings/stud.svg?raw'),
  },

  [WidgetType.Eyebrows]: {
    [EyebrowsShape.Down]: () =>
      import('~/assets/images/widgets/eyebrows/down.svg?raw'),
    [EyebrowsShape.Eyelashesdown]: () =>
      import('~/assets/images/widgets/eyebrows/eyelashesdown.svg?raw'),
    [EyebrowsShape.Eyelashesup]: () =>
      import('~/assets/images/widgets/eyebrows/eyelashesup.svg?raw'),
    [EyebrowsShape.Up]: () => import('~/assets/images/widgets/eyebrows/up.svg?raw'),
  },

  [WidgetType.Glasses]: {
    [GlassesShape.Round]: () =>
      import('~/assets/images/widgets/glasses/round.svg?raw'),
    [GlassesShape.Square]: () =>
      import('~/assets/images/widgets/glasses/square.svg?raw'),
  },

  [WidgetType.Mouth]: {
    [MouthShape.Frown]: () => import('~/assets/images/widgets/mouth/frown.svg?raw'),
    [MouthShape.Laughing]: () =>
      import('~/assets/images/widgets/mouth/laughing.svg?raw'),
    [MouthShape.Nervous]: () =>
      import('~/assets/images/widgets/mouth/nervous.svg?raw'),
    [MouthShape.Pucker]: () => import('~/assets/images/widgets/mouth/pucker.svg?raw'),
    [MouthShape.Sad]: () => import('~/assets/images/widgets/mouth/sad.svg?raw'),
    [MouthShape.Smile]: () => import('~/assets/images/widgets/mouth/smile.svg?raw'),
    [MouthShape.Smirk]: () => import('~/assets/images/widgets/mouth/smirk.svg?raw'),
    [MouthShape.Surprised]: () =>
      import('~/assets/images/widgets/mouth/surprised.svg?raw'),
  },

  [WidgetType.Nose]: {
    [NoseShape.Curve]: () => import('~/assets/images/widgets/nose/curve.svg?raw'),
    [NoseShape.Pointed]: () => import('~/assets/images/widgets/nose/pointed.svg?raw'),
    [NoseShape.Round]: () => import('~/assets/images/widgets/nose/round.svg?raw'),
  },

  [WidgetType.Tops]: {
    [TopsShape.Beanie]: () => import('~/assets/images/widgets/tops/beanie.svg?raw'),
    [TopsShape.Clean]: () => import('~/assets/images/widgets/tops/clean.svg?raw'),
    [TopsShape.Danny]: () => import('~/assets/images/widgets/tops/danny.svg?raw'),
    [TopsShape.Fonze]: () => import('~/assets/images/widgets/tops/fonze.svg?raw'),
    [TopsShape.Funny]: () => import('~/assets/images/widgets/tops/funny.svg?raw'),
    [TopsShape.Pixie]: () => import('~/assets/images/widgets/tops/pixie.svg?raw'),
    [TopsShape.Punk]: () => import('~/assets/images/widgets/tops/punk.svg?raw'),
    [TopsShape.Turban]: () => import('~/assets/images/widgets/tops/turban.svg?raw'),
    [TopsShape.Wave]: () => import('~/assets/images/widgets/tops/wave.svg?raw'),
  },
}

const previewData: Data = {
  [WidgetType.Face]: {
    [FaceShape.Base]: () => import('~/assets/images/preview/face/base.svg?raw'),
  },

  [WidgetType.Ear]: {
    [EarShape.Attached]: () => import('~/assets/images/preview/ear/attached.svg?raw'),
    [EarShape.Detached]: () => import('~/assets/images/preview/ear/detached.svg?raw'),
  },

  [WidgetType.Eyes]: {
    [EyesShape.Ellipse]: () => import('~/assets/images/preview/eyes/ellipse.svg?raw'),
    [EyesShape.Eyeshadow]: () =>
      import('~/assets/images/preview/eyes/eyeshadow.svg?raw'),
    [EyesShape.Round]: () => import('~/assets/images/preview/eyes/round.svg?raw'),
    [EyesShape.Smiling]: () => import('~/assets/images/preview/eyes/smiling.svg?raw'),
  },

  [WidgetType.Beard]: {
    [BeardShape.Scruff]: () => import('~/assets/images/preview/beard/scruff.svg?raw'),
  },

  [WidgetType.Clothes]: {
    [ClothesShape.Collared]: () =>
      import('~/assets/images/preview/clothes/collared.svg?raw'),
    [ClothesShape.Crew]: () => import('~/assets/images/preview/clothes/crew.svg?raw'),
    [ClothesShape.Open]: () => import('~/assets/images/preview/clothes/open.svg?raw'),
  },

  [WidgetType.Earrings]: {
    [EarringsShape.Hoop]: () =>
      import('~/assets/images/preview/earrings/hoop.svg?raw'),
    [EarringsShape.Stud]: () =>
      import('~/assets/images/preview/earrings/stud.svg?raw'),
  },

  [WidgetType.Eyebrows]: {
    [EyebrowsShape.Down]: () =>
      import('~/assets/images/preview/eyebrows/down.svg?raw'),
    [EyebrowsShape.Eyelashesdown]: () =>
      import('~/assets/images/preview/eyebrows/eyelashesdown.svg?raw'),
    [EyebrowsShape.Eyelashesup]: () =>
      import('~/assets/images/preview/eyebrows/eyelashesup.svg?raw'),
    [EyebrowsShape.Up]: () => import('~/assets/images/preview/eyebrows/up.svg?raw'),
  },

  [WidgetType.Glasses]: {
    [GlassesShape.Round]: () =>
      import('~/assets/images/preview/glasses/round.svg?raw'),
    [GlassesShape.Square]: () =>
      import('~/assets/images/preview/glasses/square.svg?raw'),
  },

  [WidgetType.Mouth]: {
    [MouthShape.Frown]: () => import('~/assets/images/preview/mouth/frown.svg?raw'),
    [MouthShape.Laughing]: () =>
      import('~/assets/images/preview/mouth/laughing.svg?raw'),
    [MouthShape.Nervous]: () =>
      import('~/assets/images/preview/mouth/nervous.svg?raw'),
    [MouthShape.Pucker]: () => import('~/assets/images/preview/mouth/pucker.svg?raw'),
    [MouthShape.Sad]: () => import('~/assets/images/preview/mouth/sad.svg?raw'),
    [MouthShape.Smile]: () => import('~/assets/images/preview/mouth/smile.svg?raw'),
    [MouthShape.Smirk]: () => import('~/assets/images/preview/mouth/smirk.svg?raw'),
    [MouthShape.Surprised]: () =>
      import('~/assets/images/preview/mouth/surprised.svg?raw'),
  },

  [WidgetType.Nose]: {
    [NoseShape.Curve]: () => import('~/assets/images/preview/nose/curve.svg?raw'),
    [NoseShape.Pointed]: () => import('~/assets/images/preview/nose/pointed.svg?raw'),
    [NoseShape.Round]: () => import('~/assets/images/preview/nose/round.svg?raw'),
  },

  [WidgetType.Tops]: {
    [TopsShape.Beanie]: () => import('~/assets/images/preview/tops/beanie.svg?raw'),
    [TopsShape.Clean]: () => import('~/assets/images/preview/tops/clean.svg?raw'),
    [TopsShape.Danny]: () => import('~/assets/images/preview/tops/danny.svg?raw'),
    [TopsShape.Fonze]: () => import('~/assets/images/preview/tops/fonze.svg?raw'),
    [TopsShape.Funny]: () => import('~/assets/images/preview/tops/funny.svg?raw'),
    [TopsShape.Pixie]: () => import('~/assets/images/preview/tops/pixie.svg?raw'),
    [TopsShape.Punk]: () => import('~/assets/images/preview/tops/punk.svg?raw'),
    [TopsShape.Turban]: () => import('~/assets/images/preview/tops/turban.svg?raw'),
    [TopsShape.Wave]: () => import('~/assets/images/preview/tops/wave.svg?raw'),
  },
}

export { previewData, widgetData }
