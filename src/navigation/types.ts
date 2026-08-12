/**
 * Tipos da navegação principal. Novas abas/telas devem ser adicionadas aqui
 * conforme os próximos módulos forem entrando (mantendo a estrutura preservada).
 */
export type RootTabParamList = {
  Inicio: undefined;
  Biblia: undefined;
  Oracao: undefined;
  Jejum: undefined;
  Perfil: undefined;
};

/**
 * Navegação interna da aba Bíblia (lista de livros → capítulos → leitura).
 * A tab bar principal permanece visível durante toda essa navegação.
 */
export type BibliaStackParamList = {
  BibliaHome: undefined;
  Capitulos: { livroId: string };
  Leitura: { livroId: string; capitulo: number };
};

/**
 * Navegação interna da aba Início (Home → Devocional Diário). Mesma ideia da
 * BibliaStackParamList: a tab bar permanece visível durante a navegação.
 */
export type HomeStackParamList = {
  HomeMain: undefined;
  Devocional: undefined;
};
