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

//const activities = htmlActivities;
export const htmlActivities = [
  { id: "start", label: "A Jornada", type: "start", icon: MapIcon },
  
    {
      id: "title",
      label: "O Estandarte <title>",
      type: "activity",
      icon: Flag,
      description: "Define o texto exibido na aba do navegador.",
      example: `<title>Meu Site</title>`
    },
  
    {
      id: "body",
      label: "A Armadura: a Tag <body>",
      type: "activity",
      icon: Shield,
      description: "Tudo que aparece na tela fica dentro do <body>.",
      example: `<body>
    <h1>Olá mundo</h1>
  </body>`
    },
  
    {
      id: "h",
      label: "Hierarquia Real: a Tag <h>",
      type: "activity",
      icon: Crown,
      description: "As tags h1 até h6 definem títulos hierárquicos.",
      example: `<h1>Título Principal</h1>`
    },
  
    { id: "obstacle-2", label: "Masmorra: Pratique", type: "obstacle", icon: Skull },
  
    {
      id: "p",
      label: "Pergaminho: a Tag <p>",
      type: "activity",
      icon: Scroll,
      description: "A tag <p> cria parágrafos de texto.",
      example: `<p>Este é um parágrafo</p>`
    },
  
    {
      id: "br",
      label: "Fenda: a Tag <br>",
      type: "activity",
      icon: Flame,
      description: "Cria uma quebra de linha.",
      example: `Linha 1<br>Linha 2`
    },
  
    {
      id: "div",
      label: "Baú: a Tag <div>",
      type: "activity",
      icon: Tent,
      description: "Usada para agrupar elementos.",
      example: `<div class="caixa"></div>`
    },
  
    { id: "obstacle-3", label: "Acampamento: Pratique", type: "obstacle", icon: Tent },
  
    {
      id: "img",
      label: "Retrato: a Tag <img>",
      type: "activity",
      icon: Scroll,
      description: "Exibe imagens na página.",
      example: `<img src="foto.png" alt="Descrição" />`
    },
  
    {
      id: "a",
      label: "Portal: a Tag <a>",
      type: "activity",
      icon: Compass,
      description: "Cria links entre páginas.",
      example: `<a href="https://google.com">Google</a>`
    },
  
    {
      id: "button",
      label: "Gatilho: a Tag <button>",
      type: "activity",
      icon: Gem,
      description: "Cria botões clicáveis.",
      example: `<button>Clique aqui</button>`
    },
  
    {
      id: "end",
      label: "O Tesouro Final: teste",
      type: "final",
      icon: Crown,
      description: "Você chegou ao desafio final!"
    }
];
