# Simulador de Elevador

## Drive
https://drive.google.com/drive/folders/1eGFzdHF63dvN-pRXSQpkxgPLCukfAoJo?usp=sharing

Este projeto simula o funcionamento de um elevador com interface gráfica interativa, desenvolvido como projeto acadêmico.

## Funcionalidades

- **Interface gráfica** de elevador com 4 andares (Térreo, 1, 2, 3)
- **Animação fluida** de movimentação do elevador entre andares
- **Animação das portas** ao abrir e fechar
- **Painel de controle** com botões para cada andar
- **Sistema de logs** que registra todas as atividades do elevador
- **Visor digital** para mostrar o andar atual
- **Sistema de emergência** com alarme sonoro e bloqueio de controles
- **Interior do elevador** visível apenas quando as portas estão abertas
- **Efeitos sonoros** para movimentação e operação das portas
- **Atalhos de teclado** para acionar controles (0-3 para andares, E para emergência)

## Tecnologias Utilizadas

- HTML5
- CSS3 (com animações e transições)
- JavaScript (Vanilla JS)

## Como Executar

1. Clone o repositório:
   ```
   git clone https://seu-repositorio/simulador-elevador.git
   ```

2. Abra o arquivo `index.html` em qualquer navegador moderno.

## Estrutura do Projeto

- `index.html` - Estrutura HTML da aplicação
- `style.css` - Estilização e animações
- `script.js` - Lógica de funcionamento do elevador

## Controles

### Mouse/Touch
- Botões numéricos (0-3): Movimenta o elevador para o andar desejado
- Botão EMERGÊNCIA: Ativa o modo de emergência
- Botão RESET: Desativa o modo de emergência (quando ativo)
- Botão "Limpar Logs": Apaga o histórico de atividades

### Teclado
- Teclas `0`, `1`, `2`, `3`: Movimenta o elevador para o respectivo andar
- Tecla `E`: Ativa/desativa o modo de emergência

## Sistema de Emergência

O sistema de emergência simula situações reais onde o elevador precisa ser parado imediatamente:

1. Ao ativar a emergência:
   - Um alarme sonoro é disparado
   - O poço do elevador pisca em vermelho
   - Os controles de andar são bloqueados
   - As portas são abertas automaticamente (se estiverem fechadas)
   - Um log vermelho é registrado

2. Para desativar a emergência:
   - Pressione o botão RESET (anteriormente EMERGÊNCIA)
   - As funções normais são restauradas
   - Um log de desativação é registrado

## Personalização

O projeto foi desenvolvido de forma modular, permitindo fácil personalização:

- Modificar cores no arquivo CSS
- Ajustar sons alterando as URLs no JavaScript
- Adicionar mais andares ajustando a estrutura HTML e valores no JavaScript

## Autor

Desenvolvido como projeto acadêmico.
