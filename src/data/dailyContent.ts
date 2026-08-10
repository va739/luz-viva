/**
 * Conteúdo mock da Etapa 1. Nas próximas etapas isso será substituído
 * por dados vindos de uma fonte real (API/backend), mas a estrutura de tipos
 * já reflete o modelo final: versículo (Bíblia) e citação (autores) são
 * entidades distintas e não devem ser combinadas.
 */
export type VersiculoDoDia = {
  texto: string;
  referencia: string;
};

export type CitacaoDoDia = {
  texto: string;
  autor: string;
};

export const versiculoDoDia: VersiculoDoDia = {
  texto: 'O Senhor é o meu pastor; nada me faltará.',
  referencia: 'Salmos 23:1',
};

export const citacaoDoDia: CitacaoDoDia = {
  texto:
    'Fizeste-nos para Ti, e inquieto está o nosso coração enquanto não repousa em Ti.',
  autor: 'Santo Agostinho',
};

export const propositoAtual = {
  titulo: 'Jejum de Ester',
  etapa: 'Dia 2 de 3',
  progresso: 0.66,
};
