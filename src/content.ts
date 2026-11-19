// Textos da página. Revisar com o Victor antes de publicar.

export interface Goal {
  name: string
  /** Exemplo de prescrição mostrado ao lado do objetivo no hero. */
  prescription: string
  training: string
  audience: string
}

export interface Mode {
  title: string
  /** Onde o atendimento acontece (etiqueta do painel). */
  where: string
  summary: string
  includes: string[]
  cta: string
  message: string
}

export interface Step {
  title: string
  text: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Photo {
  src: string
  alt: string
}

export const goals: Goal[] = [
  {
    name: 'Força',
    prescription: '5×5',
    training:
      'Cargas progressivas, menos repetições e descanso maior. A técnica vem primeiro nos exercícios base: agachamento, levantamento terra e supino.',
    audience: 'Quem quer ficar mais forte no dia a dia ou render mais no esporte.',
  },
  {
    name: 'Emagrecimento',
    prescription: '3×15',
    training:
      'Musculação combinada com condicionamento, com volume e intensidade ajustados à sua rotina e ao seu gasto diário.',
    audience: 'Quem quer perder gordura sem perder massa muscular.',
  },
  {
    name: 'Hipertrofia',
    prescription: '4×10',
    training:
      'Volume bem distribuído na semana, execução controlada e progressão registrada treino a treino.',
    audience: 'Quem quer ganhar massa muscular de forma consistente.',
  },
]

export const modes: Mode[] = [
  {
    title: 'Presencial em Vila Velha',
    where: 'Vila Velha, ES',
    summary: 'Aulas acompanhadas do início ao fim, na academia ou no local combinado.',
    includes: [
      'Avaliação física antes de começar',
      'Correção de execução em cada série',
      'Cargas planejadas e registradas',
      'Reavaliações para medir a evolução',
    ],
    cta: 'Quero treinar presencial',
    message: 'Oi Victor! Quero saber sobre o treino presencial em Vila Velha.',
  },
  {
    title: 'Consultoria online',
    where: 'Qualquer cidade',
    summary: 'Para quem mora em outra cidade ou prefere treinar no próprio horário.',
    includes: [
      'Treino montado para a sua academia e rotina',
      'Orientação de execução dos exercícios',
      'Dúvidas e ajustes pelo WhatsApp',
      'Revisão periódica do plano',
    ],
    cta: 'Quero a consultoria online',
    message: 'Oi Victor! Quero saber sobre a consultoria online.',
  },
]

export const steps: Step[] = [
  {
    title: 'Conversa',
    text: 'Você conta seu objetivo, sua rotina, histórico de lesões e quanto tempo tem para treinar.',
  },
  {
    title: 'Avaliação',
    text: 'Medidas e testes de movimento e de força para saber de onde estamos partindo.',
  },
  {
    title: 'Plano de treino',
    text: 'Montado para o seu objetivo e para a estrutura que você tem disponível.',
  },
  {
    title: 'Acompanhamento',
    text: 'Cargas registradas, retorno constante e ajustes sempre que o corpo responder.',
  },
]

// TODO: trocar pelas fotos reais (alunos com autorização de uso de imagem), formato 4:5.
export const photos = {
  hero: {
    src: '/img/victor-hero.svg',
    alt: 'Victor Oliveira orientando um aluno durante o treino',
  },
  about: {
    src: '/img/victor-sobre.svg',
    alt: 'Retrato de Victor Oliveira, personal trainer',
  },
  students: [
    { src: '/img/aluno-1.svg', alt: 'Aluno do Victor Oliveira durante o treino' },
    { src: '/img/aluno-2.svg', alt: 'Aluna do Victor Oliveira durante o treino' },
    { src: '/img/aluno-3.svg', alt: 'Aluno do Victor Oliveira durante o treino' },
    { src: '/img/aluno-4.svg', alt: 'Aluna do Victor Oliveira durante o treino' },
  ] satisfies Photo[],
}

export const faqs: Faq[] = [
  {
    question: 'Onde acontecem as aulas presenciais?',
    answer:
      'Em Vila Velha (ES). O local é combinado na primeira conversa, de acordo com a academia que você frequenta.',
  },
  {
    question: 'Nunca treinei. Posso começar?',
    answer:
      'Pode. O plano começa pelo seu nível atual, com foco em aprender a técnica antes de aumentar a carga.',
  },
  {
    question: 'Como funciona a consultoria online?',
    answer:
      'Você recebe o treino montado para a sua academia e a sua rotina, com orientações de execução, e fala comigo pelo WhatsApp para tirar dúvidas e mandar o retorno dos treinos.',
  },
  {
    question: 'Preciso fazer dieta junto?',
    answer:
      'Alimentação faz parte do resultado. Oriento hábitos gerais e, quando precisa, indico acompanhamento com nutricionista.',
  },
  {
    question: 'Quanto custa?',
    answer:
      'Depende da modalidade e de quantas vezes por semana você vai treinar. Chame no WhatsApp para receber as opções.',
  },
]

// ---------- Resultados ----------

// TODO: trocar por fotos reais de antes e depois de um aluno (com autorização), mesmo
// enquadramento e mesmo tamanho nas duas, formato 4:5.
export const beforeAfter = {
  before: { src: '/img/antes.svg', alt: 'Aluno antes de começar o acompanhamento' },
  after: { src: '/img/depois.svg', alt: 'O mesmo aluno depois do acompanhamento' },
}

// Seguidores do @victoroliveira.personal (1.418 em 19/11/2026). Atualizar de vez em quando.
export const instagramFollowers = 1400

// ---------- Depoimentos ----------

// TODO: TEXTOS DE EXEMPLO. Trocar por depoimentos reais (com autorização do aluno) e
// apagar `placeholder: true`. Enquanto houver placeholder, a página mostra a etiqueta
// "Depoimento de exemplo". Não publicar o site com depoimentos inventados.
export const testimonials = [
  {
    quote:
      'Eu treinava sozinho havia anos sem sair do lugar. Com a ficha anotada e os ajustes toda semana, minha carga no agachamento finalmente voltou a subir.',
    name: 'Nome do aluno',
    designation: 'Presencial em Vila Velha · objetivo: força',
    src: '/img/aluno-1.svg',
    placeholder: true,
  },
  {
    quote:
      'O que mais ajudou foi não precisar pensar no treino. Chego na academia, abro o plano e sei exatamente o que fazer e com quanto de carga.',
    name: 'Nome da aluna',
    designation: 'Consultoria online · objetivo: emagrecimento',
    src: '/img/aluno-2.svg',
    placeholder: true,
  },
  {
    quote:
      'Mando o vídeo da execução e recebo a correção no mesmo dia. Parece que ele está do lado, mesmo eu treinando em outra cidade.',
    name: 'Nome do aluno',
    designation: 'Consultoria online · objetivo: hipertrofia',
    src: '/img/aluno-3.svg',
    placeholder: true,
  },
]
