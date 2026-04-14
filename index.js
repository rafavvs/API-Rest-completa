// Importar Express
const express = require('express');

// Criar aplicação
const app = express();

// Definir porta
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// ID counter para novos registros
let nextId = 11;

// Endpoint raiz
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API REST completa de jogos funcionando!',
        status: 'sucesso',
        timestamp: new Date().toISOString()
    });
});

// Endpoint de informações
app.get('/info', (req, res) => {
    res.json({
        nome: 'API REST completa de jogos',
        versao: '1.0.0',
        autor: 'Rafael Vasconcelos'
    });
});

// Banco de dados em memória com 12 jogos iniciais
const jogos = [
  {
    id: 1,
    titulo: "Valorant",
    genero: "FPS",
    plataforma: "PC/PS5/Xbox Series X|S",
    ano: 2020,
    preco: 0.00,
    desenvolvedora: "Riot Games"
  },
  {
    id: 2,
    titulo: "Grand Theft Auto V",
    genero: "Ação/Aventura",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S",
    ano: 2013,
    preco: 149.90,
    desenvolvedora: "Rockstar Games"
  },
  {
    id: 3,
    titulo: "Cyberpunk 2077",
    genero: "RPG/Ação",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X",
    ano: 2020,
    preco: 199.90,
    desenvolvedora: "CD Projekt Red"
  },
  {
    id: 4,
    titulo: "Dead by Daylight",
    genero: "Sobrevivência/Horror",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S/Nintendo Switch",
    ano: 2016,
    preco: 69.99,
    desenvolvedora: "Behaviour Interactive Inc"
  },
  {
    id: 5,
    titulo: "Fortnite",
    genero: "Battle Royale",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S/Mobile",
    ano: 2018,
    preco: 0.00,
    desenvolvedora: "Epic Games"
  },
  {
    id: 6,
    titulo: "Minecraft",
    genero: "Sandbox",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S/Nintendo Switch/Mobile",
    ano: 2011,
    preco: 99.00,
    desenvolvedora: "Mojang Studios"
  },
  {
    id: 7,
    titulo: "Red Dead Redemption 2",
    genero: "Ação/Aventura",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S",
    ano: 2018,
    preco: 299.90,
    desenvolvedora: "Rockstar Games"
  },
  {
    id: 8,
    titulo: "Roblox",
    genero: "Sandbox/Multijogador",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S/Mobile",
    ano: 2006,
    preco: 0.00,
    desenvolvedora: "Roblox Corporation"
  },
  {
    id: 9,
    titulo: "CS:GO",
    genero: "FPS",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S",
    ano: 2012,
    preco: 0.00,
    desenvolvedora: "Valve Corporation"
  },
  {
    id: 10,
    titulo: "Overwatch 2",
    genero: "FPS",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S",
    ano: 2022,
    preco: 0.00,
    desenvolvedora: "Blizzard Entertainment"
  },
  {
    id: 11,
    titulo: "Poppy Playtime",
    genero: "Sobrevivência/Horror",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S/Nintendo Switch/Mobile",
    ano: 2021,
    preco: 49.90,
    desenvolvedora: "MOB Games"
  },
  {
    id: 12,
    titulo: "Among Us",
    genero: "Multijogador/Party Game",
    plataforma: "PC/PS4/PS5/Xbox One/Xbox Series X|S/Mobile",
    ano: 2018,
    preco: 0.00,
    desenvolvedora: "InnerSloth"
  }
];

// Validação de dados do jogo
function validarJogo(jogo) {
  const erros = [];

  if (!jogo.titulo || typeof jogo.titulo !== 'string' || jogo.titulo.trim() === '') {
    erros.push('Título é obrigatório e deve ser uma string');
  }

  if (!jogo.genero || typeof jogo.genero !== 'string' || jogo.genero.trim() === '') {
    erros.push('Gênero é obrigatório e deve ser uma string');
  }

  if (!jogo.plataforma || typeof jogo.plataforma !== 'string' || jogo.plataforma.trim() === '') {
    erros.push('Plataforma é obrigatória e deve ser uma string');
  }

  if (!jogo.ano || typeof jogo.ano !== 'number' || jogo.ano < 1950 || jogo.ano > new Date().getFullYear()) {
    erros.push(`Ano é obrigatório e deve ser um número entre 1950 e ${new Date().getFullYear()}`);
  }

  if (jogo.preco === undefined || typeof jogo.preco !== 'number' || jogo.preco < 0) {
    erros.push('Preço é obrigatório e deve ser um número não-negativo');
  }

  if (!jogo.desenvolvedora || typeof jogo.desenvolvedora !== 'string' || jogo.desenvolvedora.trim() === '') {
    erros.push('Desenvolvedora é obrigatória e deve ser uma string');
  }

  return erros;
}

// Endpoint GET para listar todos os jogos com filtros, ordenação e paginação
app.get('/api/jogos', (req, res) => {
  try {
    const { genero, plataforma, ordem, page, limit } = req.query;
    let jogosFiltrados = [...jogos]; 

    // Filtrar por gênero
    if (genero) {
        jogosFiltrados = jogosFiltrados.filter(j => j.genero.toLowerCase() === genero.toLowerCase());
    }

    // Filtrar por plataforma
    if (plataforma) {
        // Utilizo o .includes no lugar de === porque a plataforma costuma ser "PC/PS5" e etc.
        jogosFiltrados = jogosFiltrados.filter(j => j.plataforma.toLowerCase().includes(plataforma.toLowerCase()));
    }

    // Ordenar
    if (ordem) {
        if (ordem === 'titulo' || ordem === 'título') {
            jogosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (ordem === 'preco') { 
            jogosFiltrados.sort((a, b) => a.preco - b.preco);
        }
    }

    // Paginação e Preparação da Resposta
    const possuiPagina = !!page;
    const possuiLimite = !!limit;
    let jogosRetorno = jogosFiltrados;

    // Objeto padrão da resposta
    const resposta = {
        sucesso: true,
        total: jogosFiltrados.length,
        dados: jogosRetorno
    };

    if (possuiPagina || possuiLimite) {
        const pagina = parseInt(page || '1', 10);
        const limite = parseInt(limit || '10', 10);

        if ((possuiPagina && (isNaN(pagina) || pagina < 1)) || (possuiLimite && (isNaN(limite) || limite < 1))) {
            return res.status(400).json({ sucesso: false, erro: 'page e limit devem ser inteiros positivos quando fornecidos.' });
        }

        const indiceInicial = (pagina - 1) * limite;
        const indiceFinal = indiceInicial + limite;
        
        jogosRetorno = jogosFiltrados.slice(indiceInicial, indiceFinal);
        
        // Atualiza os dados da resposta para refletir a paginação
        resposta.dados = jogosRetorno;
        resposta.page = pagina;
        resposta.limit = limite;
    }

    // Envio da resposta
    res.status(200).json(resposta);

  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao listar jogos',
      erro: erro.message
    });
  }
});

// Endpoint GET para buscar jogo por ID
app.get('/api/jogos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Validação do ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido. Deve ser um número'
      });
    }

    const jogo = jogos.find(j => j.id === parseInt(id));

    if (!jogo) {
      return res.status(404).json({
        sucesso: false,
        mensagem: `Jogo com ID ${id} não encontrado`
      });
    }

    res.status(200).json({
      sucesso: true,
      dados: jogo
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar jogo',
      erro: erro.message
    });
  }
});

// Endpoint POST para criar um novo jogo
app.post('/api/jogos', (req, res) => {
  try {
    const { titulo, genero, plataforma, ano, preco, desenvolvedora } = req.body;

    // Validação
    const erros = validarJogo({
      titulo,
      genero,
      plataforma,
      ano,
      preco,
      desenvolvedora
    });

    if (erros.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Erro na validação dos dados',
        erros: erros
      });
    }

    // Verificar se o título já existe
    const jogoExistente = jogos.find(j => 
      j.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (jogoExistente) {
      return res.status(409).json({
        sucesso: false,
        mensagem: 'Já existe um jogo com este título'
      });
    }

    // Criar novo jogo
    const novoJogo = {
      id: nextId++,
      titulo: titulo.trim(),
      genero: genero.trim(),
      plataforma: plataforma.trim(),
      ano,
      preco,
      desenvolvedora: desenvolvedora.trim()
    };

    jogos.push(novoJogo);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Jogo criado com sucesso',
      dados: novoJogo
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao criar jogo',
      erro: erro.message
    });
  }
});

// Endpoint PUT para atualizar um jogo
app.put('/api/jogos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, genero, plataforma, ano, preco, desenvolvedora } = req.body;

    // Validação do ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido. Deve ser um número'
      });
    }

    const jogoIndex = jogos.findIndex(j => j.id === parseInt(id));

    if (jogoIndex === -1) {
      return res.status(404).json({
        sucesso: false,
        mensagem: `Jogo com ID ${id} não encontrado`
      });
    }

    // Validação dos dados (se fornecidos)
    const dadosAtualizacao = {
      titulo: titulo !== undefined ? titulo : jogos[jogoIndex].titulo,
      genero: genero !== undefined ? genero : jogos[jogoIndex].genero,
      plataforma: plataforma !== undefined ? plataforma : jogos[jogoIndex].plataforma,
      ano: ano !== undefined ? ano : jogos[jogoIndex].ano,
      preco: preco !== undefined ? preco : jogos[jogoIndex].preco,
      desenvolvedora: desenvolvedora !== undefined ? desenvolvedora : jogos[jogoIndex].desenvolvedora
    };

    const erros = validarJogo(dadosAtualizacao);
    if (erros.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Erro na validação dos dados',
        erros: erros
      });
    }

    // Verificar se o novo título já existe (em outro jogo)
    if (titulo !== undefined) {
      const outroJogo = jogos.find(j => 
        j.id !== parseInt(id) && j.titulo.toLowerCase() === titulo.toLowerCase()
      );
      if (outroJogo) {
        return res.status(409).json({
          sucesso: false,
          mensagem: 'Já existe outro jogo com este título'
        });
      }
    }

    // Atualizar jogo
    jogos[jogoIndex] = {
      ...jogos[jogoIndex],
      ...dadosAtualizacao
    };

    res.status(200).json({
      sucesso: true,
      mensagem: 'Jogo atualizado com sucesso',
      dados: jogos[jogoIndex]
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar jogo',
      erro: erro.message
    });
  }
});

// Endpoint DELETE para deletar um jogo
app.delete('/api/jogos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Validação do ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido. Deve ser um número'
      });
    }

    const jogoIndex = jogos.findIndex(j => j.id === parseInt(id));

    if (jogoIndex === -1) {
      return res.status(404).json({
        sucesso: false,
        mensagem: `Jogo com ID ${id} não encontrado`
      });
    }

    const jogoRemovido = jogos.splice(jogoIndex, 1);

    res.status(200).json({
      sucesso: true,
      mensagem: 'Jogo deletado com sucesso',
      dados: jogoRemovido[0]
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao deletar jogo',
      erro: erro.message
    });
  }
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
    rota: req.path,
    metodo: req.method
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Total de jogos: ${jogos.length}`);
  console.log(`🔗 Acesse os endpoints:`);
  console.log(`   GET    /api/jogos`);
  console.log(`   GET    /api/jogos/:id`);
  console.log(`   POST   /api/jogos`);
  console.log(`   PUT    /api/jogos/:id`);
  console.log(`   DELETE /api/jogos/:id`);
});

module.exports = app;
