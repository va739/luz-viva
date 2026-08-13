import { HeroKidsIllustration } from './HeroKidsIllustration';
import { OvelhinhaIllustration } from './OvelhinhaIllustration';
import { MeninoIllustration } from './MeninoIllustration';
import { MeninaBibliaIllustration } from './MeninaBibliaIllustration';
import { AdolescenteIllustration } from './AdolescenteIllustration';
import { NoeArcaIllustration } from './NoeArcaIllustration';
import { HistoriasIllustration } from './HistoriasIllustration';
import { JogosIllustration } from './JogosIllustration';
import { AtividadesIllustration } from './AtividadesIllustration';
import { MusicaIllustration } from './MusicaIllustration';
import { VersiculoIllustration } from './VersiculoIllustration';
import { DaviGoliasIllustration } from './DaviGoliasIllustration';
import { DanielIllustration } from './DanielIllustration';
import { JonasIllustration } from './JonasIllustration';
import { CriacaoIllustration } from './CriacaoIllustration';

export type KidsIlustracaoId =
  | 'heroKids'
  | 'ovelhinha'
  | 'menino'
  | 'meninaBiblia'
  | 'adolescente'
  | 'noeArca'
  | 'historias'
  | 'jogos'
  | 'atividades'
  | 'musica'
  | 'versiculo'
  | 'daviGolias'
  | 'daniel'
  | 'jonas'
  | 'criacao';

export const KIDS_ILUSTRACOES: Record<KidsIlustracaoId, typeof HeroKidsIllustration> = {
  heroKids: HeroKidsIllustration,
  ovelhinha: OvelhinhaIllustration,
  menino: MeninoIllustration,
  meninaBiblia: MeninaBibliaIllustration,
  adolescente: AdolescenteIllustration,
  noeArca: NoeArcaIllustration,
  historias: HistoriasIllustration,
  jogos: JogosIllustration,
  atividades: AtividadesIllustration,
  musica: MusicaIllustration,
  versiculo: VersiculoIllustration,
  daviGolias: DaviGoliasIllustration,
  daniel: DanielIllustration,
  jonas: JonasIllustration,
  criacao: CriacaoIllustration,
};
