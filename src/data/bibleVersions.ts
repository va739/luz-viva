export type VersaoBiblia = {
  id: string;
  sigla: string;
  nome: string;
};

/**
 * Apenas uma versão disponível nesta etapa, mas a estrutura já está pronta
 * para receber outras versões/licenças no futuro (basta adicionar ao array).
 */
export const versoesDisponiveis: VersaoBiblia[] = [
  { id: 'arc', sigla: 'ARC', nome: 'Almeida Revista e Corrigida' },
];

export const versaoPadrao = versoesDisponiveis[0];
