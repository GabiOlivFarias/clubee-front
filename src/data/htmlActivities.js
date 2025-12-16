import Flag from "../assets/icons/Flag";
import {
  Scroll,
  Crown,
  Sword,
  Shield,
  Map as MapIcon,
  Compass,
  Skull,
  Gem,
  Flame,
  Tent
} from "lucide-react";

export const htmlActivities = [
  {
    id: "start",
    label: "A Jornada",
    type: "start",
    icon: MapIcon,
    description: "Sua aventura no mundo do HTML começa agora!"
  },

  {
    id: "head",
    label: "O Capacete: a Tag <head>",
    type: "activity",
    icon: Flag,
    image: "/assets/images/html/head.png",
    description: "A tag <head> guarda informações importantes da página, mas não aparece na tela.",
    example: `
<head>
  <title>Meu título</title>
</head>`,
    challenge: "Crie uma página HTML com a tag <head> e defina um título para ela."
  },

  {
    id: "obstacle-1",
    label: "Primeiro Desafio",
    type: "activity",
    icon: Sword,
    challenge:
      "Crie uma estrutura básica de HTML contendo <head> e <title>. Dê um nome criativo para sua página."
  },

  {
    id: "title",
    label: "O Estandarte: a Tag <title>",
    type: "activity",
    icon: Flag,
    image: "/assets/images/html/title.png",
    description: "Define o texto exibido na aba do navegador.",
    example: `<title>Meu Site</title>`,
    challenge:
      "Altere o título da sua página para o nome do seu jogo ou personagem favorito."
  },

  {
    id: "body",
    label: "A Armadura: a Tag <body>",
    type: "activity",
    icon: Shield,
    image: "/assets/images/html/body.png",
    description: "Tudo que aparece na tela fica dentro do <body>.",
    example: `
<body>
  <h1>Olá mundo</h1>
</body>`,
    challenge:
      "Crie uma página que mostre uma mensagem dentro do <body>."
  },

  {
    id: "h",
    label: "Hierarquia Real: a Tag <h1> até <h6>",
    type: "activity",
    icon: Crown,
    image: "/assets/images/html/h.png",
    description:
      "As tags h1 até h6 definem títulos. Use apenas um h1 por página.",
    example: `<h1>Título Principal</h1>`,
    challenge:
      "Crie um título principal (h1) e dois subtítulos (h2 e h3)."
  },

  {
    id: "obstacle-2",
    label: "Masmorra da Revisão",
    type: "activity",
    icon: Skull,
    challenge:
      "Crie uma página com: <title>, <body>, um <h1> e um <h2>. O tema pode ser um castelo, jogo ou história."
  },

  {
    id: "p",
    label: "Pergaminho: a Tag <p>",
    type: "activity",
    icon: Scroll,
    image: "/assets/images/html/p.png",
    description: "A tag <p> cria parágrafos de texto.",
    example: `<p>Este é um parágrafo</p>`,
    challenge:
      "Escreva um pequeno parágrafo contando a história do seu personagem."
  },

  {
    id: "br",
    label: "Fenda: a Tag <br>",
    type: "activity",
    icon: Flame,
    image: "/assets/images/html/br.png",
    description: "Cria uma quebra de linha dentro do texto.",
    example: `<p>Linha 1<br>Linha 2</p>`,
    challenge:
      "Crie um parágrafo com pelo menos duas quebras de linha."
  },

  {
    id: "div",
    label: "Baú: a Tag <div>",
    type: "activity",
    icon: Tent,
    image: "/assets/images/html/div.png",
    description:
      "Usada para agrupar elementos. Ajuda a organizar a página.",
    example: `<div class="caixa"></div>`,
    challenge:
      "Crie uma <div> que contenha um título e um parágrafo."
  },

  {
    id: "obstacle-3",
    label: "Acampamento de Treino",
    type: "activity",
    icon: Tent,
    challenge:
      "Monte uma página com <h1>, <p> e <div>, organizando tudo como se fosse uma ficha de personagem."
  },

  {
    id: "img",
    label: "Retrato: a Tag <img>",
    type: "activity",
    icon: Scroll,
    image: "/assets/images/html/img.png",
    description: "Exibe imagens na página.",
    example: `<img src="hero.png" alt="Herói" />`,
    challenge:
      "Adicione uma imagem do seu personagem ou algo que você goste."
  },

  {
    id: "a",
    label: "Portal: a Tag <a>",
    type: "activity",
    icon: Compass,
    image: "/assets/images/html/a.png",
    description:
      "Cria links entre páginas ou sites.",
    example: `<a href="https://google.com">Google</a>`,
    challenge:
      "Crie um link que leve para um site que você gosta."
  },

  {
    id: "button",
    label: "Gatilho: a Tag <button>",
    type: "activity",
    icon: Gem,
    image: "/assets/images/html/button.png",
    description:
      "Cria botões clicáveis (a ação vem depois com JavaScript).",
    example: `<button>Clique aqui</button>`,
    challenge:
      "Crie um botão com o texto: 'Iniciar Aventura'."
  },

  {
    id: "list",
    label: "Inventário: <ul> e <li>",
    type: "activity",
    icon: Scroll,
    image: "/assets/images/html/ul.png",
    description:
      "Usadas para criar listas de itens.",
    example: `
<ul>
  <li>Espada</li>
  <li>Escudo</li>
  <li>Poção</li>
</ul>`,
    challenge:
      "Crie uma lista com 3 itens do inventário do seu personagem."
  },

  {
    id: "end",
    label: "O Tesouro Final",
    type: "activity",
    icon: Crown,
    description:
      "Crie uma página completa usando tudo que aprendeu: título, texto, imagem, lista e botão."
  }
];
