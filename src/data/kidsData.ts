import type { KidsIlustracaoId } from '../components/kids/illustrations';

export type FaixaEtaria = {
  id: string;
  titulo: string;
  ilustracao: KidsIlustracaoId;
};

/**
 * Conteúdo de demonstração da área Kids — esqueleto/layout desta etapa.
 * As faixas etárias são apenas seleção visual por enquanto (não filtram
 * conteúdo real ainda). Estrutura pensada para ser facilmente expandida
 * quando histórias, jogos e atividades reais forem implementados.
 */
export const faixasEtarias: FaixaEtaria[] = [
  { id: '2-5', titulo: '2 a 5', ilustracao: 'ovelhinha' },
  { id: '6-9', titulo: '6 a 9', ilustracao: 'menino' },
  { id: '10-12', titulo: '10 a 12', ilustracao: 'meninaBiblia' },
  { id: '13+', titulo: '13+', ilustracao: 'adolescente' },
];

export const historiaDestaque = {
  titulo: 'Noé e a Arca',
  descricao: 'Deus protegeu Noé e sua família com muito amor.',
  ilustracao: 'noeArca' as KidsIlustracaoId,
};

export type ExploreItem = {
  id: string;
  titulo: string;
  ilustracao: KidsIlustracaoId;
};

export const exploreItems: ExploreItem[] = [
  { id: 'historias', titulo: 'Histórias Bíblicas', ilustracao: 'historias' },
  { id: 'jogos', titulo: 'Jogos Bíblicos', ilustracao: 'jogos' },
  { id: 'atividades', titulo: 'Atividades e Desenhos', ilustracao: 'atividades' },
  { id: 'musica', titulo: 'Música e Louvores', ilustracao: 'musica' },
  { id: 'versiculo', titulo: 'Versículo do Dia', ilustracao: 'versiculo' },
];

export type HistoriaProgresso = {
  id: string;
  titulo: string;
  percentual: number;
  ilustracao: KidsIlustracaoId;
};

export const continuarAprendendo: HistoriaProgresso[] = [
  { id: 'davi-golias', titulo: 'Davi e Golias', percentual: 66, ilustracao: 'daviGolias' },
  { id: 'daniel', titulo: 'Daniel na Cova dos Leões', percentual: 40, ilustracao: 'daniel' },
  { id: 'jonas', titulo: 'Jonas e o Grande Peixe', percentual: 20, ilustracao: 'jonas' },
  { id: 'criacao', titulo: 'A Criação', percentual: 0, ilustracao: 'criacao' },
];
