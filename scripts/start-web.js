// O Expo CLI não lê a variável de ambiente PORT sozinho — se a porta padrão
// (8081) estiver ocupada, ele pergunta interativamente se deve usar outra,
// o que trava em ambientes não interativos. Este script repassa a porta
// atribuída (via PORT) explicitamente como --port, evitando esse prompt.
const { spawnSync } = require('child_process');

const port = process.env.PORT || '8081';

const result = spawnSync('npx', ['expo', 'start', '--web', '--port', port], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);
