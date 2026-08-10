export type Versiculo = {
  numero: number;
  texto: string;
};

type CapitulosTexto = Record<number, Versiculo[]>;
type TextosPorLivro = Record<string, CapitulosTexto>;

/**
 * Texto de leitura completo. Nesta etapa só João 3 está preenchido como
 * exemplo funcional — os demais livros/capítulos já navegam normalmente,
 * mas exibem um aviso de "texto em breve" até o conteúdo ser adicionado.
 *
 * AVISO DE FONTE: este texto foi digitado a partir do conhecimento do
 * modelo sobre a versão Almeida Revista e Corrigida (domínio público), não
 * copiado de um banco de dados/API da ARC verificado. Antes de publicar,
 * substitua este conteúdo por um arquivo de texto da ARC licenciado/
 * verificado (ex.: API bíblica oficial ou arquivo de texto conferido),
 * para eliminar qualquer risco de erro de transcrição.
 */
export const textosBiblia: TextosPorLivro = {
  joao: {
    3: [
      { numero: 1, texto: 'E havia entre os fariseus um homem chamado Nicodemos, príncipe dos judeus.' },
      {
        numero: 2,
        texto:
          'Este foi ter de noite com Jesus, e disse-lhe: Rabi, bem sabemos que és Mestre, vindo de Deus; porque ninguém pode fazer estes sinais que tu fazes, se Deus não for com ele.',
      },
      {
        numero: 3,
        texto:
          'Jesus respondeu, e disse-lhe: Na verdade, na verdade te digo que aquele que não nascer de novo, não pode ver o reino de Deus.',
      },
      {
        numero: 4,
        texto:
          'Disse-lhe Nicodemos: Como pode um homem nascer, sendo velho? Pode, porventura, tornar a entrar no ventre de sua mãe, e nascer?',
      },
      {
        numero: 5,
        texto:
          'Jesus respondeu: Na verdade, na verdade te digo que aquele que não nascer da água e do Espírito não pode entrar no reino de Deus.',
      },
      { numero: 6, texto: 'O que é nascido da carne é carne, e o que é nascido do Espírito é espírito.' },
      { numero: 7, texto: 'Não te maravilhes de te ter dito: Necessário vos é nascer de novo.' },
      {
        numero: 8,
        texto:
          'O vento assopra onde quer, e ouves a sua voz, mas não sabes de onde vem, nem para onde vai; assim é todo aquele que é nascido do Espírito.',
      },
      { numero: 9, texto: 'Nicodemos respondeu, e disse-lhe: Como pode ser isto?' },
      { numero: 10, texto: 'Jesus respondeu, e disse-lhe: Tu és mestre de Israel, e não sabes isto?' },
      {
        numero: 11,
        texto:
          'Na verdade, na verdade te digo que nós dizemos o que sabemos e testificamos o que vimos; e não aceitais o nosso testemunho.',
      },
      {
        numero: 12,
        texto: 'Se vos falei coisas terrestres, e não crestes, como crereis, se vos falar das celestiais?',
      },
      {
        numero: 13,
        texto: 'Ora, ninguém subiu ao céu, senão o que desceu do céu, o Filho do homem, que está no céu.',
      },
      {
        numero: 14,
        texto: 'E como Moisés levantou a serpente no deserto, assim importa que o Filho do homem seja levantado,',
      },
      { numero: 15, texto: 'Para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
      {
        numero: 16,
        texto:
          'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      },
      {
        numero: 17,
        texto: 'Porque Deus enviou o seu Filho ao mundo não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.',
      },
      {
        numero: 18,
        texto:
          'Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus.',
      },
      {
        numero: 19,
        texto:
          'E a condenação é esta: Que a luz veio ao mundo, e os homens amaram mais as trevas do que a luz, porque as suas obras eram más.',
      },
      {
        numero: 20,
        texto: 'Porque todo aquele que faz o mal aborrece a luz, e não vem para a luz, para que as suas obras não sejam reprovadas.',
      },
      {
        numero: 21,
        texto:
          'Mas quem pratica a verdade vem para a luz, a fim de que as suas obras sejam manifestas, porque são feitas em Deus.',
      },
      {
        numero: 22,
        texto:
          'Depois disto foi Jesus com os seus discípulos para a terra da Judeia; e ali se demorou com eles, e batizava.',
      },
      {
        numero: 23,
        texto:
          'E João batizava também em Enom, junto a Salim, porque havia ali muitas águas; e vinham ali, e eram batizados.',
      },
      { numero: 24, texto: 'Porque ainda João não fora lançado na prisão.' },
      {
        numero: 25,
        texto: 'Houve, pois, uma questão entre os discípulos de João e os judeus, acerca da purificação.',
      },
      {
        numero: 26,
        texto:
          'E foram ter com João, e disseram-lhe: Rabi, aquele que estava contigo além do Jordão, do qual tu deste testemunho, ei-lo batizando, e todos vão ter com ele.',
      },
      {
        numero: 27,
        texto: 'João respondeu, e disse: O homem não pode receber coisa alguma, se lhe não for dada do céu.',
      },
      {
        numero: 28,
        texto:
          'Vós mesmos me sois testemunhas de que eu disse: Não sou o Cristo, mas sou enviado adiante dele.',
      },
      {
        numero: 29,
        texto:
          'Aquele que tem a esposa é o esposo; mas o amigo do esposo, que assiste e o ouve, alegra-se muito com a voz do esposo. Assim, pois, já este meu gozo está cumprido.',
      },
      { numero: 30, texto: 'É necessário que ele cresça e que eu diminua.' },
      {
        numero: 31,
        texto:
          'Aquele que vem de cima é sobre todos; aquele que é da terra é da terra e fala da terra. Aquele que vem do céu é sobre todos.',
      },
      {
        numero: 32,
        texto: 'E aquilo que ele viu e ouviu, isso testifica; e ninguém aceita o seu testemunho.',
      },
      {
        numero: 33,
        texto: 'Aquele que aceitar o seu testemunho, esse confirma que Deus é verdadeiro.',
      },
      {
        numero: 34,
        texto:
          'Porque aquele que Deus enviou fala as palavras de Deus; pois não lhe dá Deus o Espírito por medida.',
      },
      { numero: 35, texto: 'O Pai ama o Filho e todas as coisas entregou nas suas mãos.' },
      {
        numero: 36,
        texto:
          'Aquele que crê no Filho tem a vida eterna; mas aquele que não crê no Filho não verá a vida, mas a ira de Deus sobre ele permanece.',
      },
    ],
  },
};

export function obterVersiculos(livroId: string, capitulo: number): Versiculo[] | null {
  return textosBiblia[livroId]?.[capitulo] ?? null;
}

export type SecaoTitulo = {
  /** Número do versículo em que a seção/história começa. */
  versiculoInicial: number;
  titulo: string;
};

type CapitulosSecoes = Record<number, SecaoTitulo[]>;
type SecoesPorLivro = Record<string, CapitulosSecoes>;

/**
 * Títulos editoriais de seção (comuns em edições de estudo), associados ao
 * versículo em que cada trecho começa. Só existem onde os dados realmente
 * trazem essa divisão — nenhum título é inventado para preencher lacunas.
 */
export const secoesBiblia: SecoesPorLivro = {
  joao: {
    3: [
      { versiculoInicial: 1, titulo: 'Jesus instrui Nicodemos acerca do novo nascimento' },
      { versiculoInicial: 22, titulo: 'Outro testemunho de João Batista' },
    ],
  },
};

export function obterSecoes(livroId: string, capitulo: number): SecaoTitulo[] {
  return secoesBiblia[livroId]?.[capitulo] ?? [];
}

/** Mock do progresso de leitura, usado no card "Continue lendo". */
export const leituraAtual = {
  livroId: 'joao',
  livroNome: 'João',
  capitulo: 3,
  versiculo: 16,
  progresso: 0.42,
};
