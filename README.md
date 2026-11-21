# OVERCLOCK · Protocolo de Recuperação

Cruzadinha de **Arquitetura Computacional** em forma de jogo, feita em HTML, CSS e JavaScript puros.

Um surto de energia apagou os nomes dos componentes de um computador e a CPU está esquentando. O jogador é o técnico de plantão: precisa descobrir os 16 termos da cruzadinha e confirmar cada um com o botão **Conferir** para religar a máquina antes que a temperatura chegue a 100 °C.

🔗 **Jogue aqui:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/

---

## Como jogar

1. Escolha a dificuldade e clique em **Iniciar recuperação**.
2. Clique numa casa ou numa pista e **digite direto nas casas** do tabuleiro. Clicar de novo na mesma casa troca entre horizontal e vertical.
3. Clique em **Conferir** para verificar o tabuleiro:
   - palavras certas ficam **verdes** e travadas, e o componente correspondente acende no esquema da placa;
   - palavras completas e erradas ficam **vermelhas** e esquentam a CPU;
   - palavras começadas e não terminadas ficam com a borda **laranja**.
4. O contador mostra o progresso, por exemplo **"8 de 16 palavras"**.
5. **Reiniciar** limpa o tabuleiro e começa a partida do zero.
6. Confirme as 16 palavras para dar o *boot* na máquina e entrar no ranking.

### Mecânicas

| Mecânica | Como funciona |
|---|---|
| Temperatura | Sobe com o tempo e com cada palavra errada; desce a cada acerto. Em 100 °C acontece o *thermal shutdown* e a partida acaba. |
| Combo | Conferências seguidas sem nenhum erro aumentam o multiplicador de pontos (até x3). Um erro zera o combo. |
| Ciclos | Moeda ganha a cada acerto, usada para comprar ferramentas. |
| Ferramentas | **Sonda** revela uma letra · **Diagnóstico** confere só a palavra atual sem esquentar · **Cooler** baixa 20 °C · **Decodificar** revela a palavra inteira (vale 0 pontos). |
| Esquema da placa | Cada palavra confirmada acende um componente no diagrama do computador. Clicar nele abre o manual técnico com a explicação do conceito. |
| Bit flip | No modo Overclock, de tempos em tempos uma letra não confirmada do tabuleiro é corrompida. |
| Conquistas | 14 conquistas salvas no navegador (ex.: "Hierarquia completa", "Zero defeitos", "Overclocker"). |
| Ranking | Os 10 melhores resultados ficam salvos no navegador (`localStorage`). |

### Dificuldades

| Modo | Temperatura | Ferramentas | Pontos |
|---|---|---|---|
| Estagiário | desligada | baratas, muitos ciclos | x1 |
| Engenheiro | sobe devagar, erro +7 °C | preço normal | x1,5 |
| Overclock | sobe rápido, erro +11 °C, bit flips | caras, sem Decodificar | x2,5 |

### Teclado

`←↑→↓` mover · `Espaço` trocar direção · `Tab` / `Shift+Tab` próxima/anterior palavra · `Backspace` apagar · `Enter` conferir · `Esc` pausar

---

## Palavras e pistas

O tabuleiro usa **as 16 palavras** da lista, e todas se cruzam com pelo menos uma outra.

### Horizontais

| Nº | Palavra | Pista |
|---|---|---|
| 4 | MEMORIADEMASSA | Onde os arquivos ficam guardados de forma permanente em grande volume, como HDs e SSDs. |
| 8 | CPU | O “cérebro” do computador: busca, decodifica e executa as instruções dos programas. |
| 9 | ROM | Memória não volátil gravada na fábrica, cujo conteúdo original não pode ser alterado. |
| 10 | ULA | Parte da CPU que faz somas, subtrações, comparações e operações como E e OU. |
| 11 | FLASH | Memória permanente regravável em blocos, usada em pendrives, cartões SD e SSDs. |
| 12 | DMA | Recurso que deixa periféricos transferirem dados para a RAM sem ocupar a CPU. |
| 15 | MICROCONTROLADOR | Chip único com processador, memória e periféricos, usado em sistemas embarcados como o Arduino. |
| 16 | ADDRESSBUS | Conjunto de linhas pelas quais a CPU indica qual posição de memória quer acessar. |

### Verticais

| Nº | Palavra | Pista |
|---|---|---|
| 1 | DATABUS | Conjunto de linhas que transporta os valores lidos ou escritos entre CPU e memória. |
| 2 | REGISTRADORES | Pequenas memórias dentro do processador; as mais rápidas, guardam os valores em uso agora. |
| 3 | CACHE | Memória pequena e veloz entre a CPU e a principal, com os dados mais usados. |
| 5 | EEPROM | Memória permanente que pode ser apagada e regravada byte a byte; guarda configurações. |
| 6 | DUALCORE | Processador com um par de unidades de execução independentes no mesmo chip. |
| 7 | QUADCORE | Processador com quatro unidades de execução independentes no mesmo chip. |
| 13 | UC | Parte da CPU que coordena as outras, enviando sinais em cada etapa da instrução. |
| 14 | RAM | Memória principal volátil, onde ficam os programas abertos; apaga ao desligar. |

---

## Estrutura do projeto

```
arqcomp-cruzadinha/
├── index.html   estrutura da página, modais e esquema da placa (SVG)
├── style.css    visual de placa de circuito, estados das casas e responsividade
├── script.js    tabuleiro, digitação, Conferir, temperatura, ferramentas, conquistas e ranking
└── README.md
```

Sem bibliotecas nem etapa de build: basta abrir o `index.html` no navegador ou publicar no GitHub Pages.

## Tecnologias

- HTML5, CSS3 e JavaScript puro
- SVG animado para o esquema da placa
- Web Audio API para os efeitos sonoros (sem arquivos de áudio)
- `localStorage` para ranking e conquistas
