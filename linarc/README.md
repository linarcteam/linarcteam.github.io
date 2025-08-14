# 🌟 LINARC - Website Oficial

## 🚀 **Funcionalidades Implementadas**

### ✨ **Design e Interface**
- **Design Tecnológico**: Interface moderna com gradientes, neon effects e backdrop-filter
- **Responsivo**: Adaptação automática para PC, tablet e mobile
- **Animações Suaves**: Sistema de animações que executa apenas uma vez por sessão
- **Sem Scroll Geral**: Layout otimizado que se adapta perfeitamente à tela
- **Scroll Interno**: Apenas nas seções que necessitam (News, formulários)

### 🌍 **Sistema Multilíngue**
- **10 Idiomas Suportados**: Inglês, Português, Espanhol, Francês, Alemão, Italiano, Russo, Chinês, Tailandês e Hindi
- **Seleção Inicial**: Tela dedicada para escolha de idioma ao entrar no site
- **Cookies**: Lembrança da linguagem escolhida
- **Botão de Troca**: "Trocar Idioma" adaptado para cada linguagem

### 📰 **Sistema de Notícias**
- **9 Notícias Atualizadas**: Incluindo Instagram, Antivirus, Nova Aparência e Pentesting
- **Sistema de Likes**: Contador de likes com limite de 1 por usuário
- **Cookies**: Persistência dos likes e identificação de usuários
- **Modal Detalhado**: Visualização completa das notícias sem scroll

### 🔐 **Sistema de Pentesting (Linarc for All)**
- **Formulário de Envio**: Link do site, observações e contato
- **Cofre Secreto**: Acesso com senha `7733L` ao clicar na letra "P"
- **Armazenamento Local**: Sites enviados salvos no localStorage
- **Status de Análise**: Controle de sites pendentes, em análise e concluídos

### 🛡️ **Antivirus Crov**
- **Descrição Detalhada**: Tecnologia própria e inteligência artificial
- **Botão "Em Breve"**: Download desabilitado com design apagado
- **Multilíngue**: Adaptado para todas as linguagens suportadas

### 📊 **Estatísticas em Tempo Real**
- **Contador de Visitas**: Total, hoje, semana e mês
- **Backend Seguro**: API protegida com autenticação
- **Detecção de Bots**: Sistema inteligente para filtrar visitas legítimas
- **Persistência**: Dados salvos em arquivo criptografado

### 🔒 **Segurança Avançada**
- **Criptografia AES-256-GCM**: Dados sensíveis criptografados
- **Hash SHA-256**: Verificação de integridade dos dados
- **Rate Limiting**: Proteção contra spam e ataques DDoS
- **Headers de Segurança**: CSP, HSTS, XSS Protection
- **Validação de Entrada**: Sanitização e validação rigorosa
- **Fingerprinting Avançado**: Identificação única de usuários
- **Timeout de Requisições**: Proteção contra ataques de tempo
- **Logs de Segurança**: Monitoramento de atividades suspeitas

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- HTML5, CSS3, JavaScript ES6+
- CSS Grid, Flexbox, CSS Variables
- Animações CSS e JavaScript
- LocalStorage para persistência local

### **Backend**
- Node.js com Express.js
- Helmet.js para headers de segurança
- CORS configurado para segurança
- Rate limiting avançado
- Criptografia nativa do Node.js

### **Segurança**
- AES-256-GCM para criptografia
- SHA-256 para hashing
- Rate limiting com fingerprinting
- Validação e sanitização de entrada
- Headers de segurança HTTP

## 🚀 **Como Executar**

### **1. Instalar Dependências**
```bash
npm install
```

### **2. Iniciar Servidor**
```bash
npm start
```

### **3. Acessar o Site**
```
http://localhost:8000
```

## 🔑 **Acesso ao Sistema**

### **Contador de Visitas**
- **Endpoint**: `/api/visit`
- **Método**: POST
- **Autenticação**: Não requerida

### **Estatísticas**
- **Endpoint**: `/api/stats`
- **Método**: GET
- **Autenticação**: Requer API Key no header `X-API-Key`

### **Cofre de Sites**
- **Senha**: `7733L`
- **Acesso**: Clique na letra "P" na aba Lançamentos

## 📱 **Responsividade**

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação automática para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis

## 🔒 **Recursos de Segurança**

### **Proteção Contra Ataques**
- ✅ SQL Injection
- ✅ XSS (Cross-Site Scripting)
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ DDoS (Distributed Denial of Service)
- ✅ Rate Limiting
- ✅ Bot Detection
- ✅ Input Validation
- ✅ Header Sanitization

### **Criptografia e Hashing**
- ✅ AES-256-GCM para dados sensíveis
- ✅ SHA-256 para verificação de integridade
- ✅ Salt rounds para senhas (bcrypt)
- ✅ Chaves criptográficas únicas por sessão

### **Headers de Segurança**
- ✅ Content Security Policy (CSP)
- ✅ HTTP Strict Transport Security (HSTS)
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block

## 🌟 **Funcionalidades Especiais**

### **Sistema de Animações**
- Animações executam apenas uma vez por sessão
- Sistema de tracking para evitar repetições
- Transições suaves entre seções

### **Sistema de Likes**
- Limite de 1 like por usuário por notícia
- Persistência via cookies
- Contador em tempo real

### **Formulário de Pentesting**
- Validação de entrada
- Armazenamento seguro local
- Sistema de cofre com senha

## 📈 **Monitoramento e Logs**

- Logs detalhados de todas as requisições
- Identificação única de cada request
- Monitoramento de atividades suspeitas
- Logs de segurança em tempo real

## 🔄 **Atualizações Automáticas**

- Reset diário de contadores
- Reset semanal e mensal
- Salvamento automático a cada 5 minutos
- Graceful shutdown com salvamento de dados

## 🌐 **Compatibilidade**

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, Tablet, Mobile
- **Sistemas**: Windows, macOS, Linux, Android, iOS

---

## 🎯 **Próximas Funcionalidades**

- [ ] Sistema de usuários e login
- [ ] Dashboard administrativo
- [ ] Relatórios de pentesting
- [ ] Sistema de notificações
- [ ] API pública para desenvolvedores
- [ ] Integração com ferramentas de segurança

---

**Desenvolvido com ❤️ pela Equipe LINARC**
**Versão**: 2.0.0
**Última Atualização**: Agosto 2025
