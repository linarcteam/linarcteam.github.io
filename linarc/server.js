const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8001;

// Configuração de segurança
const SECURITY_CONFIG = {
  MAX_FILE_SIZE: 1024 * 10, // 10KB
  REQUEST_TIMEOUT: 30000, // 30 segundos
  MAX_REQUESTS_PER_MINUTE: 50,
  MAX_REQUESTS_PER_HOUR: 1000
};

// Dados de visitas
let visitData = {
  total: 0,
  today: 0,
  thisWeek: 0,
  thisMonth: 0,
  lastReset: new Date().toISOString()
};

// Função para salvar contador de visitas
async function saveVisitCount() {
  try {
    await fs.writeFile('visitCount.json', JSON.stringify(visitData, null, 2));
    console.log('💾 Contador de visitas salvo com sucesso');
  } catch (error) {
    console.error('❌ Erro ao salvar contador de visitas:', error.message);
  }
}

// Função para carregar contador de visitas
async function loadVisitCount() {
  try {
    const data = await fs.readFile('visitCount.json', 'utf8');
    visitData = JSON.parse(data);
    console.log('📖 Contador de visitas carregado:', visitData.total);
  } catch (error) {
    console.log('📝 Criando novo arquivo de contador...');
    await saveVisitCount();
  }
}

// Função para resetar contadores diários/semanais/mensais
function resetCounters() {
  const now = new Date();
  const lastReset = new Date(visitData.lastReset);
  
  // Reset diário
  if (now.getDate() !== lastReset.getDate() || 
      now.getMonth() !== lastReset.getMonth() || 
      now.getFullYear() !== lastReset.getFullYear()) {
    visitData.today = 0;
    visitData.lastReset = now.toISOString();
  }
  
  // Reset semanal (domingo)
  if (now.getDay() === 0 && lastReset.getDay() !== 0) {
    visitData.thisWeek = 0;
  }
  
  // Reset mensal
  if (now.getMonth() !== lastReset.getMonth()) {
    visitData.thisMonth = 0;
  }
}

// Middleware de segurança avançada
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
  hidePoweredBy: true,
  ieNoOpen: true,
  dnsPrefetchControl: { allow: false }
}));

// CORS configurado para máxima segurança
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://seudominio.com'] // Substitua pelo seu domínio
    : ['http://localhost:8000', 'http://127.0.0.1:8000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,
  maxAge: 86400 // 24 horas
}));

// Rate limiting avançado com fingerprinting
const advancedLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: SECURITY_CONFIG.MAX_REQUESTS_PER_HOUR,
  message: {
    error: 'Rate limit excedido',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil(15 * 60 / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Fingerprinting avançado: IP + User-Agent + Headers + Timestamp
    const fingerprint = req.ip + (req.get('User-Agent') || '') + 
              (req.get('Accept') || '') + (req.get('Accept-Language') || '') +
              Math.floor(Date.now() / (15 * 60 * 1000)).toString();
    return fingerprint;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit excedido',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(15 * 60 / 1000),
      timestamp: new Date().toISOString()
    });
  },
  skip: (req) => {
    // Pular rate limiting para health check
    return req.path === '/health';
  }
});

app.use(advancedLimiter);

// Rate limiting específico para contador de visitas
const visitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: SECURITY_CONFIG.MAX_REQUESTS_PER_MINUTE,
  message: {
    error: 'Muitas visitas registradas. Aguarde um minuto.',
    code: 'VISIT_RATE_LIMIT'
  },
  keyGenerator: (req) => {
    // Identificação mais precisa para visitas
    return req.ip + (req.get('User-Agent') || '') + 
              (req.get('Accept-Language') || '') + 
              (req.get('Accept-Encoding') || '');
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit de visitas excedido',
      code: 'VISIT_RATE_LIMIT',
      retryAfter: 60,
      timestamp: new Date().toISOString()
    });
  }
});

// Middleware para parsing seguro com limites
app.use(express.json({ 
  limit: SECURITY_CONFIG.MAX_FILE_SIZE,
  verify: (req, res, buf) => {
    // Verificar se o JSON é válido
    try {
      JSON.parse(buf);
    } catch (e) {
      throw new Error('JSON inválido');
    }
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: SECURITY_CONFIG.MAX_FILE_SIZE,
  parameterLimit: 10 // Máximo 10 parâmetros
}));

// Middleware de timeout
app.use((req, res, next) => {
  req.setTimeout(SECURITY_CONFIG.REQUEST_TIMEOUT);
  res.setTimeout(SECURITY_CONFIG.REQUEST_TIMEOUT);
  next();
});

// Middleware de logging
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const requestId = Math.random().toString(36).substring(7);
  
  // Adicionar ID único à requisição
  req.requestId = requestId;
  
  // Log da requisição
  console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.path} - IP: ${ip} - UA: ${userAgent.substring(0, 100)}`);
  
  // Verificar User-Agent suspeito
  if (userAgent.includes('bot') || userAgent.includes('crawler') || userAgent.includes('spider')) {
    console.warn(`⚠️ [${requestId}] User-Agent suspeito detectado: ${userAgent}`);
  }
  
  next();
});

// Middleware de validação de entrada
app.use((req, res, next) => {
  // Validar tamanho do corpo da requisição
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > SECURITY_CONFIG.MAX_FILE_SIZE) {
    return res.status(413).json({
      error: 'Payload muito grande',
      maxSize: SECURITY_CONFIG.MAX_FILE_SIZE
    });
  }
  
  // Validar User-Agent
  if (!req.get('User-Agent') || req.get('User-Agent').length < 10) {
    return res.status(400).json({
      error: 'User-Agent inválido'
    });
  }
  
  next();
});

// Servir arquivos estáticos com headers de segurança avançados
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    // Headers de segurança para arquivos estáticos
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Cache control para arquivos estáticos
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 ano
      res.setHeader('ETag', Math.random().toString(36).substring(7)); // Simplified ETag
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  },
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// API para contador de visitas com validação avançada
app.post('/api/visit', visitLimiter, async (req, res) => {
  try {
    // Validar request com sanitização
    const { timestamp, userAgent, ip } = req.body;
    
    if (!timestamp || !userAgent || !ip) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        code: 'INVALID_DATA',
        requestId: req.requestId
      });
    }
    
    // Validar timestamp (não pode ser muito antigo ou futuro)
    const requestTime = new Date(timestamp);
    const now = new Date();
    const timeDiff = Math.abs(now - requestTime);
    
    if (timeDiff > 5 * 60 * 1000) { // 5 minutos
      return res.status(400).json({ 
        error: 'Timestamp inválido',
        code: 'INVALID_TIMESTAMP',
        requestId: req.requestId
      });
    }
    
    // Verificar se não é um bot com padrões avançados
    const botPatterns = [
      /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
      /python/i, /java/i, /perl/i, /ruby/i, /php/i, /go/i, /node/i,
      /headless/i, /phantom/i, /selenium/i, /puppet/i, /playwright/i
    ];
    
    const isBot = botPatterns.some(pattern => pattern.test(userAgent));
    if (isBot) {
      console.log(`🤖 [${req.requestId}] Bot detectado: ${userAgent}`);
      return res.status(200).json({ 
        message: 'Bot detectado - visita não contada',
        isBot: true,
        requestId: req.requestId
      });
    }
    
    // Verificar padrões suspeitos
    if (userAgent.length < 20 || userAgent.length > 300) {
      console.warn(`⚠️ [${req.requestId}] User-Agent suspeito: ${userAgent}`);
    }
    
    // Resetar contadores se necessário
    resetCounters();
    
    // Incrementar contadores
    visitData.total++;
    visitData.today++;
    visitData.thisWeek++;
    visitData.thisMonth++;
    
    // Salvar no arquivo
    await saveVisitCount();
    
    console.log(`📊 [${req.requestId}] Nova visita registrada! Total: ${visitData.total}`);
    
    res.json({
      success: true,
      message: 'Visita registrada com sucesso',
      data: visitData,
      requestId: req.requestId
    });
    
  } catch (error) {
    console.error(`❌ [${req.requestId}] Erro ao registrar visita:`, error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR',
      requestId: req.requestId
    });
  }
});

// Endpoint para estatísticas (sem autenticação para permitir visualização pública)
app.get('/api/stats', (req, res) => {
  try {
    // Verificar se os dados existem
    if (!visitData) {
      return res.status(500).json({
        success: false,
        message: 'Dados de visitas não disponíveis'
      });
    }

    res.json({
      success: true,
      data: {
        total: visitData.total,
        today: visitData.today,
        thisWeek: visitData.thisWeek,
        thisMonth: visitData.thisMonth,
        lastReset: visitData.lastReset
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Health check com informações de segurança
app.get('/health', (req, res) => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '2.0.0',
    security: {
      encryption: 'DESABILITADO',
      hashing: 'DESABILITADO',
      rateLimiting: 'ACTIVE',
      csp: 'ENABLED',
      cors: 'RESTRICTED'
    },
    requestId: req.requestId
  };
  
  res.json(healthData);
});

// Middleware de tratamento de erros avançado
app.use((err, req, res, next) => {
  console.error(`❌ [${req.requestId || 'UNKNOWN'}] Erro não tratado:`, err);
  
  // Não expor detalhes internos em produção
  const errorMessage = process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'Erro interno do servidor';
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'UNHANDLED_ERROR',
    message: errorMessage,
    requestId: req.requestId || 'UNKNOWN',
    timestamp: new Date().toISOString()
  });
});

// 404 handler com informações de segurança
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    code: 'NOT_FOUND',
    available: ['/api/visit', '/api/stats', '/health'],
    requestId: req.requestId || 'UNKNOWN',
    timestamp: new Date().toISOString()
  });
});

// Inicializar servidor com segurança
async function startServer() {
  try {
    await loadVisitCount();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor LINARC v2.0 rodando na porta ${PORT}`);
      console.log(`📊 Contador de visitas: ${visitData.total}`);
      console.log(`🔒 Modo de segurança: ATIVADO (CRÍTICO)`);
      console.log(`🔐 Criptografia: DESABILITADO`);
      console.log(`🛡️ Rate Limiting: ${SECURITY_CONFIG.MAX_REQUESTS_PER_HOUR}/hora`);
      console.log(`🌐 Acesse: http://localhost:${PORT}`);
      console.log(`🔑 API Key: DESABILITADO`);
    });
    
    // Configurações de segurança do servidor
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;
    server.maxConnections = 100;
    
    // Salvar contador a cada 5 minutos
    setInterval(saveVisitCount, 5 * 60 * 1000);
    
    // Resetar contadores diariamente à meia-noite
    setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetCounters();
        console.log('🔄 Contadores diários resetados');
      }
    }, 60 * 1000);
    
    // Log de segurança a cada hora
    setInterval(() => {
      console.log(`🔒 [${new Date().toISOString()}] Status de segurança: ATIVO`);
    }, 60 * 60 * 1000);
    
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown com segurança
process.on('SIGTERM', async () => {
  console.log('🔄 Desligando servidor com segurança...');
  await saveVisitCount();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 Desligando servidor com segurança...');
  await saveVisitCount();
  process.exit(0);
});

// Proteção contra crashes
process.on('uncaughtException', async (error) => {
  console.error('💥 Erro não capturado:', error);
  await saveVisitCount();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('💥 Promise rejeitada não tratada:', reason);
  await saveVisitCount();
  process.exit(1);
});

startServer(); 