import { PastoralSceneIllustration } from './PastoralSceneIllustration';
import { StillWatersIllustration } from './StillWatersIllustration';
import { SoftLightIllustration } from './SoftLightIllustration';
import { PrayerLightIllustration } from './PrayerLightIllustration';

export type IlustracaoId = 'pastoral' | 'aguasTranquilas' | 'luzSuave' | 'oracaoLuz';

export const ILUSTRACOES: Record<IlustracaoId, typeof PastoralSceneIllustration> = {
  pastoral: PastoralSceneIllustration,
  aguasTranquilas: StillWatersIllustration,
  luzSuave: SoftLightIllustration,
  oracaoLuz: PrayerLightIllustration,
};

export { PastoralSceneIllustration, StillWatersIllustration, SoftLightIllustration, PrayerLightIllustration };
