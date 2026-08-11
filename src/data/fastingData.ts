export type DuracaoJejum = {
  dias: number;
  label: string;
};

/**
 * Durações comuns de jejum na tradição cristã (Ester, Daniel, jejuns de um
 * dia). Nesta etapa é apenas uma escolha local — sem persistência real.
 */
export const duracoesDisponiveis: DuracaoJejum[] = [
  { dias: 1, label: '1 dia' },
  { dias: 3, label: '3 dias' },
  { dias: 7, label: '7 dias' },
  { dias: 21, label: '21 dias' },
];

export const mensagemCentralJejum =
  'O jejum não termina quando você deixa de comer. Ele encontra seu propósito quando sua vida se volta para Deus.';

/**
 * Oração específica para o tempo de jejum — texto original do app, distinto
 * da reflexão bíblica abaixo (as duas experiências não devem se misturar).
 */
export const oracaoJejum =
  'Senhor, durante este tempo de jejum, aproximo meu coração do Teu. Ajuda-me a buscar a Tua presença acima de tudo, e que essa entrega tenha propósito na minha caminhada de fé. Em nome de Jesus, amém.';

/**
 * Versículo de reflexão sobre o jejum, na mesma versão (ARC) usada no
 * restante do app — ver aviso de fonte em src/data/bibleText.ts: texto
 * reconstruído do conhecimento do modelo, não de um banco de dados da ARC
 * verificado; substituir por fonte licenciada antes de produção.
 */
export const versiculoJejum = {
  texto: 'Convertei-vos a mim de todo o vosso coração; e isso com jejum, e choro, e pranto.',
  referencia: 'Joel 2:12',
  // Trecho a destacar visualmente dentro do versículo (não o versículo inteiro).
  destaque: 'jejum',
};

/**
 * Guia do Jejum — Etapa 2. Conteúdo escrito para quem pode estar fazendo o
 * primeiro jejum: linguagem simples, acolhedora, sem termos técnicos.
 * O foco permanece em Deus → oração → Palavra → propósito → entrega.
 */
export const guiaJejum = {
  introTitulo: 'O que é o jejum?',
  introTexto:
    'Jejuar é abrir mão de algo — geralmente do alimento — por um tempo, para voltar o coração para Deus. Não é uma dieta nem uma prova de força: é um convite para buscar a Deus com mais intensidade, quietar o coração e ouvir a Sua voz. Todo jejum deve ter um propósito espiritual claro — buscar direção, agradecer, interceder por alguém, arrepender-se ou simplesmente se aproximar Dele.',

  observacaoTitulo: 'Uma observação importante',
  observacaoParagrafos: [
    'Embora o jejum tenha um propósito espiritual, ele também envolve o corpo. Especialmente se você nunca jejuou antes, é importante considerar seus limites e cuidar da sua saúde.',
    'Se você possui alguma condição de saúde, como diabetes, hipoglicemia, está grávida ou possui histórico de transtornos alimentares, converse com um médico ou nutricionista antes de realizar jejuns alimentares, especialmente os mais prolongados.',
    'Se o jejum de alimentos não for adequado para você, também é possível praticar um jejum de outras coisas, como redes sociais, entretenimento ou outros hábitos que ocupam seu tempo e atenção. O propósito continua sendo o mesmo: separar um tempo para buscar a Deus em oração, na Palavra e na reflexão.',
  ],
  observacaoDestaque: 'O propósito do jejum não é prejudicar o corpo, mas voltar o coração para Deus.',

  antesTitulo: 'Antes do jejum',
  antesIntro: 'Um bom começo faz toda a diferença. Antes de iniciar, vale a pena parar um instante para:',
  antesItens: [
    'Definir o seu propósito',
    'Separar um tempo para oração',
    'Preparar o seu coração',
    'Escolher o período do jejum',
    'Pensar em como você vai buscar a Deus durante esse tempo',
  ],

  duranteTitulo: 'Durante o jejum',
  duranteIntro:
    'Não existe uma fórmula certa — cada jejum é uma jornada única com Deus. Mas esse tempo costuma ser mais rico quando é acompanhado de:',
  duranteItens: ['Oração', 'Leitura da Bíblia', 'Reflexão', 'Busca pela presença de Deus', 'Entrega do propósito que você definiu'],
  duranteFechamento: 'Volte sempre que puder para o seu propósito — ele é o fio que conecta os seus dias de jejum.',

  encerrandoTitulo: 'Encerrando o jejum',
  encerrandoTexto:
    'Encerrar o jejum também é parte da experiência espiritual. O que importa não é ter completado um número exato de dias, mas o quanto você buscou a Deus nesse tempo. Ao encerrar, reserve um momento para agradecer, refletir sobre o que Ele falou ao seu coração e pensar em como levar isso para o seu dia a dia.',
};

export type JejumBiblico = {
  id: string;
  nome: string;
  resumo: string;
  descricao: string;
  referencia: string;
};

/**
 * Introdução aos jejuns bíblicos — apenas conteúdo de descoberta/aprendizado
 * nesta etapa. Não é o jejum pessoal do usuário e não deve ser confundido
 * com ele; a implementação completa (guiada) fica para uma etapa futura.
 */
export const jejunsBiblicos: JejumBiblico[] = [
  {
    id: 'ester',
    nome: 'Jejum de Ester',
    resumo: 'Um jejum de coragem e intercessão',
    descricao:
      'Antes de se apresentar ao rei para interceder por seu povo, Ester pediu que todos os judeus jejuassem por três dias, sem comer nem beber. Foi um jejum de coragem diante de um momento decisivo.',
    referencia: 'Ester 4:16',
  },
  {
    id: 'daniel',
    nome: 'Jejum de Daniel',
    resumo: 'Um jejum de busca e entendimento',
    descricao:
      'Daniel jejuou por três semanas, abrindo mão de alimentos agradáveis, enquanto buscava entendimento de Deus durante um tempo de luto e súplica.',
    referencia: 'Daniel 10:2-3',
  },
  {
    id: 'jesus',
    nome: 'Jejum de Jesus',
    resumo: 'Um jejum de preparo e dependência do Pai',
    descricao:
      'Antes de iniciar Seu ministério, Jesus jejuou por quarenta dias no deserto, em oração e dependência total do Pai, sendo fortalecido para os desafios que viria a enfrentar.',
    referencia: 'Mateus 4:1-2',
  },
];
