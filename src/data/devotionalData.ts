import type { IlustracaoId } from '../components/devotional/illustrations';

export type VersiculoBiblico = {
  numero: string;
  texto: string;
};

export type PassagemBiblica = {
  livroCapitulo: string;
  traducao: string;
  versiculos: VersiculoBiblico[];
};

export function referenciaVersiculo(passagem: PassagemBiblica, indice: number): string {
  return `${passagem.livroCapitulo}:${passagem.versiculos[indice].numero}`;
}

export function referenciaCompleta(passagem: PassagemBiblica): string {
  if (passagem.versiculos.length === 1) {
    return `${passagem.livroCapitulo}:${passagem.versiculos[0].numero}`;
  }
  const primeiro = passagem.versiculos[0].numero;
  const ultimo = passagem.versiculos[passagem.versiculos.length - 1].numero;
  return `${passagem.livroCapitulo}:${primeiro}–${ultimo}`;
}

export type ConteudoDevocional = {
  titulo: string;
  contexto: string;
  oQueRevela: string;
  oQueDeusQuerEnsinar: string;
  aplicacao: string;
  perguntaReflexao: string;
};

export type CitacaoDevocional = {
  texto: string;
  autor: string;
};

export type OracaoDevocional = {
  texto: string;
};

export type DiaDevocional = {
  numeroDia: number;
  totalDias: number;
  ilustracaoPrincipal: IlustracaoId;
  ilustracaoDevocional: IlustracaoId;
  passagem: PassagemBiblica;
  devocional: ConteudoDevocional;
  citacao: CitacaoDevocional;
  oracao: OracaoDevocional;
};

export type JornadaDevocional = {
  id: string;
  tema: string;
  descricaoBreve: string;
  dias: DiaDevocional[];
};

export type DescansoSabado = {
  titulo: string;
  fraseDestaque: string;
  ilustracao: IlustracaoId;
  passagem: PassagemBiblica;
  reflexao: string;
  oracao: string;
};

/**
 * Conteúdo de demonstração — textos originais escritos para o Luz Viva.
 * As passagens bíblicas seguem o texto da Almeida Revista e Corrigida (ARC),
 * reconstruído do conhecimento do modelo; antes de produção, substituir por
 * uma fonte licenciada verificada (mesmo aviso de src/data/bibleText.ts).
 *
 * As citações de "autor" NÃO são atribuídas a pessoas reais a menos que a
 * frase seja de conhecimento amplamente verificável (ex.: texto bíblico).
 * Quando não há uma citação histórica verificável adequada para o tema do
 * dia, o campo `autor` é "Reflexão Luz Viva" — uma reflexão original do
 * próprio app, nunca atribuída a uma pessoa que não a escreveu.
 *
 * O dia 1 da jornada "paz" (Salmos 23:1–5) é o conteúdo de demonstração
 * completo desta etapa, com profundidade total. Os demais dias já seguem a
 * mesma estrutura de dados, com conteúdo mais enxuto — a serem aprofundados
 * quando o sistema for expandido para semanas reais.
 */
export const jornadaEsperar: JornadaDevocional = {
  id: 'esperar',
  tema: 'Quando Deus nos ensina a esperar',
  descricaoBreve: 'Três dias para aprender a confiar no tempo de Deus, mesmo quando a espera parece longa.',
  dias: [
    {
      numeroDia: 1,
      totalDias: 3,
      ilustracaoPrincipal: 'luzSuave',
      ilustracaoDevocional: 'aguasTranquilas',
      passagem: {
        livroCapitulo: 'Salmos 27',
        traducao: 'ARC',
        versiculos: [
          {
            numero: '14',
            texto: 'Espera no SENHOR; anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.',
          },
        ],
      },
      devocional: {
        titulo: 'Um coração que espera',
        contexto:
          'O Salmo 27 é uma oração de Davi em meio a adversários e perigos reais. É dentro dessa tensão, e não fora dela, que ele escreve sobre esperar no Senhor.',
        oQueRevela:
          'Deus se revela como fonte de coragem para quem espera. Não se trata de uma espera passiva, mas de uma espera sustentada pela certeza de que Ele fortalece o coração de quem confia.',
        oQueDeusQuerEnsinar:
          'Esperar em Deus é diferente de simplesmente aguardar. É manter o coração firme e continuar orando e confiando, mesmo sem saber quando a resposta virá.',
        aplicacao:
          'Se você está esperando por algo hoje, uma resposta, uma mudança, uma direção, deixe que essa espera seja acompanhada de coragem e não de ansiedade.',
        perguntaReflexao: 'O que muda se você trocar a ansiedade da espera pela coragem de esperar em Deus?',
      },
      citacao: {
        texto: 'Esperar em Deus não é ficar parado. É manter o coração firme enquanto Ele age.',
        autor: 'Reflexão Luz Viva',
      },
      oracao: {
        texto:
          'Senhor, ensina-me a esperar em Ti sem perder a paz. Quando a espera parecer longa demais, lembra o meu coração de que Tu já estás cuidando de tudo o que me preocupa.',
      },
    },
    {
      numeroDia: 2,
      totalDias: 3,
      ilustracaoPrincipal: 'pastoral',
      ilustracaoDevocional: 'luzSuave',
      passagem: {
        livroCapitulo: 'Isaías 40',
        traducao: 'ARC',
        versiculos: [
          {
            numero: '31',
            texto:
              'Mas os que esperam no SENHOR renovarão as suas forças; subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.',
          },
        ],
      },
      devocional: {
        titulo: 'Forças que se renovam',
        contexto:
          'Isaías escreve para um povo cansado e exilado, que sentia como se Deus tivesse se esquecido dele. É nesse cenário que a promessa de forças renovadas aparece.',
        oQueRevela:
          'Deus se revela como fonte inesgotável de força, disponível para quem escolhe esperar nEle em vez de confiar apenas nas próprias forças.',
        oQueDeusQuerEnsinar:
          'Existe uma força que não vem do esforço próprio, mas da proximidade com Deus. Renovar as forças começa por reconhecer que não precisamos caminhar sozinhos.',
        aplicacao:
          'Antes de tentar resolver tudo com suas próprias forças hoje, reserve um momento para se aproximar de Deus e pedir que Ele renove o seu fôlego.',
        perguntaReflexao: 'Em que área da sua vida você tem tentado seguir apenas com suas próprias forças?',
      },
      citacao: {
        texto: 'A força que Deus dá não elimina o cansaço. Ela sustenta quem continua caminhando.',
        autor: 'Reflexão Luz Viva',
      },
      oracao: {
        texto:
          'Pai, renova as minhas forças hoje. Onde eu estiver cansado, que eu encontre em Ti o fôlego que preciso para continuar caminhando.',
      },
    },
    {
      numeroDia: 3,
      totalDias: 3,
      ilustracaoPrincipal: 'aguasTranquilas',
      ilustracaoDevocional: 'pastoral',
      passagem: {
        livroCapitulo: 'Salmos 37',
        traducao: 'ARC',
        versiculos: [
          {
            numero: '7',
            texto:
              'Descansa no SENHOR, e espera nele; não te enfades por causa daquele que prospera em seu caminho, por causa do homem que executa astutos intentos.',
          },
        ],
      },
      devocional: {
        titulo: 'Descansar enquanto se espera',
        contexto:
          'O Salmo 37 foi escrito para pessoas tentadas a se inquietar ao ver o sucesso de quem age de forma injusta. Davi responde a essa inquietação com um convite ao descanso e à confiança.',
        oQueRevela:
          'Deus se revela como Aquele que não se esquece da justiça, mesmo quando ela parece demorar. Ele convida à confiança, não à comparação.',
        oQueDeusQuerEnsinar:
          'Descansar no Senhor significa parar de medir a própria vida pelo caminho dos outros e voltar os olhos para o tempo e o cuidado de Deus.',
        aplicacao:
          'Ao encerrar estes três dias, escolha descansar no tempo de Deus para a sua vida, em vez de se comparar com o ritmo de quem está ao seu redor.',
        perguntaReflexao: 'Existe alguma comparação que tem roubado a sua paz? O que significaria entregar isso a Deus hoje?',
      },
      citacao: {
        texto: 'Descansar no tempo de Deus é confiar que Ele nunca chega atrasado.',
        autor: 'Reflexão Luz Viva',
      },
      oracao: {
        texto:
          'Senhor, hoje escolho descansar em Ti. Tira de mim a ansiedade de comparar minha caminhada com a de outros, e ajuda-me a confiar no Teu tempo para a minha vida.',
      },
    },
  ],
};

export const jornadaPaz: JornadaDevocional = {
  id: 'paz',
  tema: 'Encontrando paz na presença de Deus',
  descricaoBreve: 'Uma jornada de três dias sobre confiar na presença de Deus, mesmo em meio às incertezas.',
  dias: [
    {
      numeroDia: 1,
      totalDias: 3,
      ilustracaoPrincipal: 'pastoral',
      ilustracaoDevocional: 'aguasTranquilas',
      passagem: {
        livroCapitulo: 'Salmos 23',
        traducao: 'ARC',
        versiculos: [
          { numero: '1', texto: 'O SENHOR é o meu pastor; nada me faltará.' },
          { numero: '2', texto: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
          { numero: '3', texto: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
          {
            numero: '4',
            texto:
              'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.',
          },
          {
            numero: '5',
            texto:
              'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.',
          },
        ],
      },
      devocional: {
        titulo: 'O Pastor que cuida de tudo',
        contexto:
          'O Salmo 23 foi escrito por Davi, que antes de ser rei passou anos cuidando de ovelhas no campo. Ele conhecia de perto o trabalho de um pastor: proteger, alimentar, guiar e defender o rebanho, muitas vezes arriscando a própria vida por ele.\n\nQuando Davi chama Deus de "o meu pastor", ele não está usando uma figura de linguagem distante. Está descrevendo, a partir da própria experiência, o tipo de cuidado que Deus oferece: pessoal, atento e constante.',
        oQueRevela:
          'Neste salmo, Deus se revela como Aquele que provê, "nada me faltará", que oferece descanso em verdes pastos e águas tranquilas, que restaura a alma, que guia pelas veredas da justiça e que permanece presente mesmo nos momentos mais difíceis, "ainda que eu andasse pelo vale da sombra da morte, tu estás comigo".\n\nEle também aparece como um anfitrião generoso, que prepara mesa, unge a cabeça e enche o cálice até transbordar, uma imagem de honra e fartura, mesmo diante de adversários.',
        oQueDeusQuerEnsinar:
          'O convite deste salmo não é para uma vida sem dificuldades, mas para uma vida confiante em meio a elas. Davi não diz que o vale desaparece, ele diz que não precisa temer, porque não atravessa o vale sozinho.\n\nDeus quer ensinar que o Seu cuidado não depende das circunstâncias. Ele é pastor nos pastos verdes e também no vale da sombra da morte. É a presença dEle, e não a ausência de dificuldade, que sustenta.',
        aplicacao:
          'Talvez hoje você esteja em um período de pastos verdes, descansando na provisão de Deus. Ou talvez esteja atravessando um vale, um tempo de medo, perda ou incerteza.\n\nEm qualquer um dos dois, o convite é o mesmo: reconhecer que Deus é o seu pastor. Isso significa deixar de tentar guiar sozinho a própria vida e confiar Nele para prover, restaurar e guiar, mesmo quando o caminho não está claro.',
        perguntaReflexao: 'Em qual área da sua vida você precisa confiar mais na direção de Deus hoje?',
      },
      citacao: {
        texto: 'A paz que buscamos não está no fim do vale, mas na certeza de que o Pastor caminha com a gente por ele.',
        autor: 'Reflexão Luz Viva',
      },
      oracao: {
        texto:
          'Senhor, obrigado por seres o meu Pastor. Obrigado por cuidar de mim com um cuidado que eu não escolhi merecer, mas que Tu ofereces por quem És. Ensina-me a confiar que, assim como cuidas dos pastos e das águas tranquilas, Tu cuidas também de cada área da minha vida.\n\nQuando eu estiver cansado, conduz-me a lugares de descanso. Quando minha alma estiver exausta, refrigera-a como só Tu sabes fazer. E quando eu não souber para onde ir, guia-me pelas veredas da Tua justiça, não pelos meus próprios caminhos.\n\nNos vales que eu tiver que atravessar, e sei que alguns ainda virão, lembra o meu coração de que não estou sozinho. Tu estás comigo. A Tua vara e o Teu cajado me consolam, mesmo quando eu não consigo ver o caminho à frente.\n\nObrigado por preparares mesa para mim mesmo diante das minhas lutas, por me tratares com uma honra que eu não mereço. Hoje, entrego a Ti a minha caminhada, confiando que a Tua bondade e a Tua misericórdia me seguirão todos os dias da minha vida.',
      },
    },
    {
      numeroDia: 2,
      totalDias: 3,
      ilustracaoPrincipal: 'aguasTranquilas',
      ilustracaoDevocional: 'luzSuave',
      passagem: {
        livroCapitulo: 'Filipenses 4',
        traducao: 'ARC',
        versiculos: [
          {
            numero: '6-7',
            texto:
              'Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplica, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.',
          },
        ],
      },
      devocional: {
        titulo: 'Uma paz que não depende das circunstâncias',
        contexto:
          'Paulo escreve esta carta preso, em circunstâncias difíceis, e ainda assim ensina sobre uma paz que "excede todo o entendimento". Ele não fala de um lugar confortável, mas de um caminho para a paz em meio à dificuldade.',
        oQueRevela:
          'Deus se revela como Aquele que recebe as nossas petições e responde, não necessariamente resolvendo tudo, mas guardando o coração e a mente com uma paz que ultrapassa a lógica das circunstâncias.',
        oQueDeusQuerEnsinar:
          'A porta de entrada para a paz de Deus é a oração sincera, feita com gratidão, mesmo em meio à inquietação.',
        aplicacao:
          'Em vez de guardar para si aquilo que te inquieta hoje, traga isso diante de Deus em oração, com gratidão pelo que Ele já tem feito.',
        perguntaReflexao: 'O que está inquietando você hoje que ainda não foi entregue a Deus em oração?',
      },
      citacao: {
        texto: 'A paz de Deus não espera o problema acabar. Ela guarda o coração enquanto ele ainda existe.',
        autor: 'Reflexão Luz Viva',
      },
      oracao: {
        texto:
          'Deus, trago diante de Ti tudo o que me inquieta hoje. Obrigado por cuidar de mim. Que a Tua paz, que ultrapassa todo entendimento, guarde meu coração e minha mente.',
      },
    },
    {
      numeroDia: 3,
      totalDias: 3,
      ilustracaoPrincipal: 'luzSuave',
      ilustracaoDevocional: 'pastoral',
      passagem: {
        livroCapitulo: 'João 14',
        traducao: 'ARC',
        versiculos: [
          {
            numero: '27',
            texto:
              'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.',
          },
        ],
      },
      devocional: {
        titulo: 'A paz que Jesus deixa',
        contexto:
          'Jesus diz essas palavras pouco antes de ser preso e crucificado, sabendo que os discípulos enfrentariam medo e confusão. Mesmo assim, Ele escolhe falar sobre deixar paz.',
        oQueRevela:
          'Deus se revela, em Jesus, como a fonte de uma paz diferente da paz do mundo, uma paz que não depende de tudo estar bem, mas de quem está com você.',
        oQueDeusQuerEnsinar:
          'A paz de Jesus é uma herança, algo que Ele deixa, não algo que conquistamos por conta própria. Ela é recebida, não fabricada.',
        aplicacao:
          'Ao encerrar esta jornada, receba conscientemente a paz que Jesus oferece, em vez de continuar tentando produzir paz com as próprias forças.',
        perguntaReflexao: 'O que mudaria se você recebesse a paz de Jesus hoje, em vez de continuar tentando alcançá-la sozinho?',
      },
      citacao: {
        texto: 'A paz que Jesus deixa não depende de as circunstâncias mudarem. Depende de quem está com você nelas.',
        autor: 'Reflexão Luz Viva',
      },
      oracao: {
        texto:
          'Jesus, recebo a paz que só Tu podes dar. Que meu coração não se turbe nem se atemorize, porque Tu estás comigo hoje e sempre.',
      },
    },
  ],
};

export const descansoSabado: DescansoSabado = {
  titulo: 'Descansar em Deus',
  fraseDestaque: 'Hoje não é sobre correr. É sobre permanecer.',
  ilustracao: 'aguasTranquilas',
  passagem: {
    livroCapitulo: 'Mateus 11',
    traducao: 'ARC',
    versiculos: [
      {
        numero: '28-29',
        texto:
          'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração; e encontrareis descanso para a vossa alma.',
      },
    ],
  },
  reflexao:
    'O descanso que Jesus oferece não é apenas parar de trabalhar. É permanecer perto dEle. Hoje não é sobre quanto você consegue fazer, mas sobre quanto você consegue simplesmente estar com Deus.\n\nSe esta semana foi cheia, deixe que o sábado seja o que ele foi pensado para ser: um respiro. Um dia para lembrar que a sua vida não depende só do seu esforço, mas também da graça dEle.',
  oracao:
    'Senhor, obrigado por este dia de descanso. Ajuda-me a permanecer em Ti, sem pressa e sem culpa por parar. Que eu encontre na Tua presença o alívio que minha alma precisa.',
};

export const diasSemanaCurto = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'] as const;

export type ReferenciaDoDia =
  | { tipo: 'jornada'; jornada: JornadaDevocional; dia: DiaDevocional }
  | { tipo: 'descanso'; descanso: DescansoSabado };

/**
 * Mapeia o dia da semana (0 = domingo ... 6 = sábado) ao conteúdo correspondente.
 * Semana considerada de domingo a sábado: duas jornadas de 3 dias (dom-seg-ter
 * e qua-qui-sex) e um sábado de descanso.
 */
export function obterConteudoPorDiaDaSemana(indiceDiaSemana: number): ReferenciaDoDia {
  switch (indiceDiaSemana) {
    case 0:
      return { tipo: 'jornada', jornada: jornadaEsperar, dia: jornadaEsperar.dias[0] };
    case 1:
      return { tipo: 'jornada', jornada: jornadaEsperar, dia: jornadaEsperar.dias[1] };
    case 2:
      return { tipo: 'jornada', jornada: jornadaEsperar, dia: jornadaEsperar.dias[2] };
    case 3:
      return { tipo: 'jornada', jornada: jornadaPaz, dia: jornadaPaz.dias[0] };
    case 4:
      return { tipo: 'jornada', jornada: jornadaPaz, dia: jornadaPaz.dias[1] };
    case 5:
      return { tipo: 'jornada', jornada: jornadaPaz, dia: jornadaPaz.dias[2] };
    default:
      return { tipo: 'descanso', descanso: descansoSabado };
  }
}

export const mensagensConclusaoDia = [
  'Você caminhou com Deus hoje. Continue levando esta Palavra com você.',
  'Mais um passo dado com Deus. Que Ele continue falando ao seu coração.',
  'Você separou um tempo para Deus hoje. Isso nunca é em vão.',
];

export const mensagemConclusaoJornada = 'Que aquilo que Deus ensinou nesses três dias continue vivendo em você.';

export const mensagemConclusaoDescanso = 'Que o descanso de hoje fortaleça sua alma para a semana que vem.';
