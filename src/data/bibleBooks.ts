export type Testamento = 'antigo' | 'novo';

export type Livro = {
  id: string;
  nome: string;
  testamento: Testamento;
  capitulos: number;
};

/**
 * Estrutura completa dos 66 livros da Bíblia, com contagem real de capítulos.
 * O texto de leitura em si (bibleText.ts) é preenchido aos poucos — a
 * navegação já funciona para todos os livros desde já.
 */
export const livrosBiblia: Livro[] = [
  // Antigo Testamento
  { id: 'genesis', nome: 'Gênesis', testamento: 'antigo', capitulos: 50 },
  { id: 'exodo', nome: 'Êxodo', testamento: 'antigo', capitulos: 40 },
  { id: 'levitico', nome: 'Levítico', testamento: 'antigo', capitulos: 27 },
  { id: 'numeros', nome: 'Números', testamento: 'antigo', capitulos: 36 },
  { id: 'deuteronomio', nome: 'Deuteronômio', testamento: 'antigo', capitulos: 34 },
  { id: 'josue', nome: 'Josué', testamento: 'antigo', capitulos: 24 },
  { id: 'juizes', nome: 'Juízes', testamento: 'antigo', capitulos: 21 },
  { id: 'rute', nome: 'Rute', testamento: 'antigo', capitulos: 4 },
  { id: '1samuel', nome: '1 Samuel', testamento: 'antigo', capitulos: 31 },
  { id: '2samuel', nome: '2 Samuel', testamento: 'antigo', capitulos: 24 },
  { id: '1reis', nome: '1 Reis', testamento: 'antigo', capitulos: 22 },
  { id: '2reis', nome: '2 Reis', testamento: 'antigo', capitulos: 25 },
  { id: '1cronicas', nome: '1 Crônicas', testamento: 'antigo', capitulos: 29 },
  { id: '2cronicas', nome: '2 Crônicas', testamento: 'antigo', capitulos: 36 },
  { id: 'esdras', nome: 'Esdras', testamento: 'antigo', capitulos: 10 },
  { id: 'neemias', nome: 'Neemias', testamento: 'antigo', capitulos: 13 },
  { id: 'ester', nome: 'Ester', testamento: 'antigo', capitulos: 10 },
  { id: 'jo', nome: 'Jó', testamento: 'antigo', capitulos: 42 },
  { id: 'salmos', nome: 'Salmos', testamento: 'antigo', capitulos: 150 },
  { id: 'proverbios', nome: 'Provérbios', testamento: 'antigo', capitulos: 31 },
  { id: 'eclesiastes', nome: 'Eclesiastes', testamento: 'antigo', capitulos: 12 },
  { id: 'cantares', nome: 'Cantares', testamento: 'antigo', capitulos: 8 },
  { id: 'isaias', nome: 'Isaías', testamento: 'antigo', capitulos: 66 },
  { id: 'jeremias', nome: 'Jeremias', testamento: 'antigo', capitulos: 52 },
  { id: 'lamentacoes', nome: 'Lamentações', testamento: 'antigo', capitulos: 5 },
  { id: 'ezequiel', nome: 'Ezequiel', testamento: 'antigo', capitulos: 48 },
  { id: 'daniel', nome: 'Daniel', testamento: 'antigo', capitulos: 12 },
  { id: 'oseias', nome: 'Oséias', testamento: 'antigo', capitulos: 14 },
  { id: 'joel', nome: 'Joel', testamento: 'antigo', capitulos: 3 },
  { id: 'amos', nome: 'Amós', testamento: 'antigo', capitulos: 9 },
  { id: 'obadias', nome: 'Obadias', testamento: 'antigo', capitulos: 1 },
  { id: 'jonas', nome: 'Jonas', testamento: 'antigo', capitulos: 4 },
  { id: 'miqueias', nome: 'Miquéias', testamento: 'antigo', capitulos: 7 },
  { id: 'naum', nome: 'Naum', testamento: 'antigo', capitulos: 3 },
  { id: 'habacuque', nome: 'Habacuque', testamento: 'antigo', capitulos: 3 },
  { id: 'sofonias', nome: 'Sofonias', testamento: 'antigo', capitulos: 3 },
  { id: 'ageu', nome: 'Ageu', testamento: 'antigo', capitulos: 2 },
  { id: 'zacarias', nome: 'Zacarias', testamento: 'antigo', capitulos: 14 },
  { id: 'malaquias', nome: 'Malaquias', testamento: 'antigo', capitulos: 4 },
  // Novo Testamento
  { id: 'mateus', nome: 'Mateus', testamento: 'novo', capitulos: 28 },
  { id: 'marcos', nome: 'Marcos', testamento: 'novo', capitulos: 16 },
  { id: 'lucas', nome: 'Lucas', testamento: 'novo', capitulos: 24 },
  { id: 'joao', nome: 'João', testamento: 'novo', capitulos: 21 },
  { id: 'atos', nome: 'Atos', testamento: 'novo', capitulos: 28 },
  { id: 'romanos', nome: 'Romanos', testamento: 'novo', capitulos: 16 },
  { id: '1corintios', nome: '1 Coríntios', testamento: 'novo', capitulos: 16 },
  { id: '2corintios', nome: '2 Coríntios', testamento: 'novo', capitulos: 13 },
  { id: 'galatas', nome: 'Gálatas', testamento: 'novo', capitulos: 6 },
  { id: 'efesios', nome: 'Efésios', testamento: 'novo', capitulos: 6 },
  { id: 'filipenses', nome: 'Filipenses', testamento: 'novo', capitulos: 4 },
  { id: 'colossenses', nome: 'Colossenses', testamento: 'novo', capitulos: 4 },
  { id: '1tessalonicenses', nome: '1 Tessalonicenses', testamento: 'novo', capitulos: 5 },
  { id: '2tessalonicenses', nome: '2 Tessalonicenses', testamento: 'novo', capitulos: 3 },
  { id: '1timoteo', nome: '1 Timóteo', testamento: 'novo', capitulos: 6 },
  { id: '2timoteo', nome: '2 Timóteo', testamento: 'novo', capitulos: 4 },
  { id: 'tito', nome: 'Tito', testamento: 'novo', capitulos: 3 },
  { id: 'filemom', nome: 'Filemom', testamento: 'novo', capitulos: 1 },
  { id: 'hebreus', nome: 'Hebreus', testamento: 'novo', capitulos: 13 },
  { id: 'tiago', nome: 'Tiago', testamento: 'novo', capitulos: 5 },
  { id: '1pedro', nome: '1 Pedro', testamento: 'novo', capitulos: 5 },
  { id: '2pedro', nome: '2 Pedro', testamento: 'novo', capitulos: 3 },
  { id: '1joao', nome: '1 João', testamento: 'novo', capitulos: 5 },
  { id: '2joao', nome: '2 João', testamento: 'novo', capitulos: 1 },
  { id: '3joao', nome: '3 João', testamento: 'novo', capitulos: 1 },
  { id: 'judas', nome: 'Judas', testamento: 'novo', capitulos: 1 },
  { id: 'apocalipse', nome: 'Apocalipse', testamento: 'novo', capitulos: 22 },
];

export function obterLivro(livroId: string): Livro | undefined {
  return livrosBiblia.find((livro) => livro.id === livroId);
}
