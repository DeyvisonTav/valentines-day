export type GiftAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "copy"; label: string; value: string };

export interface Gift {
  id: string;
  /** Etiqueta curta exibida no card (ex: "Vale guarda-roupa"). */
  tag: string;
  title: string;
  /** Valor em destaque, quando faz sentido (ex: "R$ 300"). */
  value?: string;
  /** Texto carinhoso que descreve o presente. */
  message: string;
  /** Acento neon principal — usado no 3D (emissive) e no overlay. */
  color: string;
  /** Tom secundário pra gradientes e brilho. */
  glow: string;
  /** Posição da caixa no arco da cena (x, y, z). */
  position: [number, number, number];
  action?: GiftAction;
  /** Selo de confirmação (ex: presente que já foi entregue). */
  confirmation?: string;
  /** Arte decorativa holográfica exibida atrás do card. */
  art?: "headphone" | "wardrobe" | "english" | "breakfast";
}

/**
 * Os 4 presentes da Eduarda. Esta é a ÚNICA fonte da verdade —
 * cena 3D, HUD, cards e tela final leem daqui.
 */
export const GIFTS: Gift[] = [
  {
    id: "pix-guarda-roupa",
    tag: "Vale guarda-roupa",
    title: "Pix de R$ 300",
    value: "R$ 300",
    message:
      "Pra você renovar o look do jeito que quiser, sem palpite meu. Escolhe o que te deixa linda — a única regra é gostar.",
    color: "#ff7ec0",
    glow: "#ff9fd0",
    position: [-3.4, 0.35, 0],
    confirmation: "Já caiu na sua conta 💸",
    art: "wardrobe",
  },
  {
    id: "cambly-ingles",
    tag: "Curso de inglês",
    title: "Cambly",
    message:
      "Pra turbinar o inglês conversando com nativos de verdade. Um empurrão na carreira que já é incrível.",
    color: "#b06bff",
    glow: "#c79bff",
    position: [-1.15, -0.25, 0.4],
    action: { kind: "link", label: "Abrir Cambly", href: "https://www.cambly.com/" },
    art: "english",
  },
  {
    id: "headphone-rosa",
    tag: "Você pediu",
    title: "Headphone rosa",
    message:
      "Você comentou que precisava de um fone novo. Esse é over-ear, rosa, do jeitinho que combina com você.",
    color: "#ff9ad5",
    glow: "#ffc2e6",
    position: [1.15, -0.25, 0.4],
    art: "headphone",
  },
  {
    id: "cafe-ursinho",
    tag: "Surpresa presencial",
    title: "Café da manhã + ursinho",
    message:
      "Tem um café da manhã especial te esperando, com um ursinho de pelúcia de companhia. Esse você ganha pessoalmente.",
    color: "#c9a7ff",
    glow: "#e0ccff",
    position: [3.4, 0.35, 0],
    art: "breakfast",
  },
];

export const GIFT_COUNT = GIFTS.length;

/**
 * 5º presente — não é uma caixa clicável. Já está a caminho (ela sabe dele) e
 * não chega a tempo; é revelado depois que os 4 presentes são abertos.
 */
export const INCOMING_GIFT = {
  tag: "Você já sabe desse",
  title: "As mil partes do meu coração",
  author: "Colleen Hoover",
  eta: "Chega 16 de junho",
  message:
    "Seu livro tá viajando até você. Não dá tempo de chegar hoje, mas dia 16 ele bate na sua porta — e eu sei o quanto você vai amar cada página.",
  color: "#ff7ec0",
  glow: "#c79bff",
  art: "book" as const,
};
