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

export const versiculoDoDia: VersiculoDoDia = {
  texto: 'O Senhor é o meu pastor; nada me faltará.',
  referencia: 'Salmos 23:1',
};

/**
 * Convite genérico para o módulo de Jejum. Não representa um jejum real em
 * andamento — os jejuns de personagens bíblicos (Ester, Daniel, Jesus...)
 * ainda não foram implementados, então nenhum progresso é exibido aqui.
 */
export const propositoAtual = {
  titulo: 'Continue seu propósito',
  subtitulo: 'Comece um jejum e acompanhe sua jornada de fé aqui.',
};
