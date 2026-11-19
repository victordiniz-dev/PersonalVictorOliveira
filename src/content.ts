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
