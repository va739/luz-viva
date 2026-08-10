import { MaterialCommunityIcons } from '@expo/vector-icons';

export type PedidoOracao = {
  id: string;
  titulo: string;
  descricao?: string;
  data: string;
  respondida: boolean;
};

/**
 * Mock dos pedidos de oração do usuário. Etapa 3 constrói só a estrutura
 * visual — salvar/editar pedidos reais fica para uma etapa futura com
 * persistência de dados.
 */
export const pedidosDeOracaoIniciais: PedidoOracao[] = [
  {
    id: '1',
    titulo: 'Saúde da minha mãe',
    descricao: 'Que Deus traga cura e força para ela nesse tratamento.',
    data: '08 ago',
    respondida: false,
  },
  {
    id: '2',
    titulo: 'Sabedoria no trabalho',
    descricao: 'Preciso de discernimento para uma decisão importante.',
    data: '05 ago',
    respondida: false,
  },
  { id: '3', titulo: 'Viagem em família', data: '28 jul', respondida: true },
];

export type OracaoGuiada = {
  id: string;
  titulo: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  /**
   * Texto de exemplo/placeholder — NÃO é gerado por IA ainda. Estrutura
   * pronta para, no futuro, este campo ser substituído por uma oração
   * personalizada gerada a partir do contexto escrito pela pessoa.
   */
  oracaoExemplo: string;
};

export const oracoesGuiadas: OracaoGuiada[] = [
  {
    id: 'gratidao',
    titulo: 'Gratidão',
    icon: 'hand-heart-outline',
    oracaoExemplo:
      'Senhor, hoje quero parar e agradecer por tudo o que Tu tens feito em minha vida. Obrigado pelo dom da vida, pela família, pelos amigos e por cada detalhe do Teu cuidado comigo. Ensina-me a viver com um coração agradecido, reconhecendo Tua bondade em cada dia. Em nome de Jesus, amém.',
  },
  {
    id: 'ansiedade',
    titulo: 'Ansiedade e preocupação',
    icon: 'waves',
    oracaoExemplo:
      'Pai, entrego a Ti as preocupações que pesam sobre o meu coração hoje. Tu conheces cada detalhe da minha situação e sabes exatamente do que eu preciso. Acalma minha mente, tira de mim a ansiedade e enche-me da Tua paz que excede todo entendimento. Em nome de Jesus, amém.',
  },
  {
    id: 'familia',
    titulo: 'Família',
    icon: 'account-group-outline',
    oracaoExemplo:
      'Senhor, coloco minha família em Tuas mãos. Abençoa cada pessoa que amo, protege nossos relacionamentos e nos ajuda a viver em união e amor. Que nossa casa seja um lugar de paz, respeito e fé. Fortalece os laços que nos unem. Em nome de Jesus, amém.',
  },
  {
    id: 'protecao',
    titulo: 'Proteção',
    icon: 'shield-outline',
    oracaoExemplo:
      'Deus, peço a Tua proteção sobre minha vida e sobre aqueles que amo. Guarda-nos de todo mal, perigo e adversidade. Sê o nosso abrigo e a nossa fortaleza em todos os momentos. Confio que Tuas mãos nos cobrem hoje e sempre. Em nome de Jesus, amém.',
  },
  {
    id: 'direcao',
    titulo: 'Direção',
    icon: 'compass-outline',
    oracaoExemplo:
      'Senhor, preciso da Tua direção neste momento da minha vida. Mostra-me o caminho que devo seguir e dá-me sabedoria para tomar as decisões certas. Que minha vontade se alinhe com a Tua vontade, e que eu tenha coragem para seguir onde Tu me guias. Em nome de Jesus, amém.',
  },
  {
    id: 'fe',
    titulo: 'Fortalecimento da fé',
    icon: 'star-four-points-outline',
    oracaoExemplo:
      'Pai, fortalece a minha fé nos momentos de dúvida e dificuldade. Ajuda-me a confiar em Ti mesmo quando não compreendo o que estou vivendo. Renova em mim a certeza de que Tu és fiel e que estás sempre ao meu lado. Em nome de Jesus, amém.',
  },
];

export const versiculoOracao = {
  texto: 'Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.',
  referencia: 'Mateus 7:7',
};
