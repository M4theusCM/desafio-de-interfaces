import { useState } from 'react'

type Page = 'home' | 'cofrinho' | 'moedas' | 'cartoes' | 'historico' | 'responsavel'
type TransactionType = 'receita' | 'despesa'
type AccountType = 'cofrinho' | 'moedas' | 'cartoes'
type Transaction = { id: number; date: string; description: string; category: string; type: TransactionType; value: number; account: AccountType }
type Goal = { id: number; account: 'moedas' | 'cartoes'; title: string; target: number; saved: number }

function Icon({ name, size = 20 }: { name: 'plus' | 'minus' | 'gift' | 'wallet' | 'dots' | 'food' | 'game' | 'book' | 'heart' | 'check'; size?: number }) {
  const paths = {
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    gift: <><path d="M20 12v10H4V12M2 7h20v5H2zM12 7v15M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" /></>,
    wallet: <><path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6" /><path d="M16 13h4" /></>,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    food: <><path d="M6 3v8M3 3v5a3 3 0 0 0 6 0V3M6 11v10M15 3v18M15 3c4 2 5 6 5 9h-5" /></>,
    game: <><path d="M8 6h8a6 6 0 0 1 5.6 8.1l-1.2 3.1a2 2 0 0 1-3.2.8L15 16H9l-2.2 2a2 2 0 0 1-3.2-.8l-1.2-3.1A6 6 0 0 1 8 6Z" /><path d="M7 11v4M5 13h4M17 12h.01M19 14h.01" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /><path d="M4 5.5v14" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const accountData = {
  cofrinho: {
    eyebrow: 'Meu primeiro cofrinho',
    title: 'Cofrinho',
    subtitle: 'Cada moedinha é um passo para realizar seus sonhos.',
    balance: 'R$ 128,00',
    saved: 'R$ 42',
    spent: 'R$ 18',
    shared: 'R$ 8',
    art: 'pig',
    persona: 'Maria, 6 anos',
    profile: 'Primeiros passos',
    responsibility: 'Aprender a guardar',
    habits: ['Reconhecer de onde vem o dinheiro', 'Guardar para um desejo simples', 'Celebrar cada pequena conquista'],
    nextStep: 'Guardar R$ 5 por semana',
  },
  moedas: {
    eyebrow: 'Minha coleção',
    title: 'Moedas',
    subtitle: 'Organize suas economias e acompanhe cada conquista.',
    balance: 'R$ 264,00',
    saved: 'R$ 96',
    spent: 'R$ 24',
    shared: 'R$ 12',
    art: 'coins',
    persona: 'Liz, 9 anos',
    profile: 'Escolhas conscientes',
    responsibility: 'Planejar antes de gastar',
    habits: ['Separar desejo de necessidade', 'Dividir a mesada por objetivos', 'Registrar as próprias escolhas'],
    nextStep: 'Planejar os gastos da semana',
  },
  cartoes: {
    eyebrow: 'Próximo passo',
    title: 'Cartões',
    subtitle: 'Aprenda a planejar antes de usar seu dinheiro.',
    balance: 'R$ 410,00',
    saved: 'R$ 150',
    spent: 'R$ 65',
    shared: 'R$ 20',
    art: 'card',
    persona: 'Caio, 12 anos',
    profile: 'Autonomia acompanhada',
    responsibility: 'Administrar um orçamento',
    habits: ['Definir limites por categoria', 'Acompanhar saldo e extrato', 'Reservar antes de consumir'],
    nextStep: 'Manter 20% do mês na reserva',
  },
}

function Mark({ small = false }: { small?: boolean }) {
  return (
    <button className={`mark ${small ? 'mark-small' : ''}`} onClick={() => location.reload()} aria-label="Ir para o início">
      <span className="mark-icon">h</span>
      <span>hamm</span>
    </button>
  )
}

function Illustration({ type = 'pig' }: { type?: string }) {
  return (
    <div className={`illustration illustration-${type}`} aria-hidden="true">
      <span className="spark s1">✦</span>
      <span className="spark s2">✦</span>
      {type === 'pig' && <><div className="pig-ear" /><div className="pig-body"><div className="pig-eye" /><div className="pig-snout" /></div><div className="coin">R$</div></>}
      {type === 'coins' && <><div className="coin-stack c1">1</div><div className="coin-stack c2">5</div><div className="coin-stack c3">10</div></>}
      {type === 'card' && <><div className="money-bag">R$</div><div className="bank-card"><span>hamm</span><b>•••• 2048</b></div></>}
    </div>
  )
}

function Home({ go }: { go: (page: Page) => void }) {
  return (
    <main>
      <header className="topbar shell">
        <Mark />
        <nav>
          <a href="#contas">Tipos de conta</a>
          <a href="#funciona">Como funciona</a>
          <a href="#responsaveis">Para responsáveis</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-ghost" onClick={() => go('cofrinho')}>Entrar</button>
          <button className="btn btn-primary" onClick={() => go('responsavel')}>Sou responsável</button>
        </div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">Educação financeira desde cedo</span>
          <h1>Pequenas escolhas.<br /><em>Grandes conquistas.</em></h1>
          <p>Um jeito leve e divertido de aprender a cuidar do dinheiro, criar metas e construir sonhos.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-large" onClick={() => go('cofrinho')}>Começar agora <span>→</span></button>
            <button className="btn btn-ghost btn-large">Ouvir esta página</button>
          </div>
        </div>
        <div className="hero-art"><Illustration /></div>
      </section>

      <section className="accounts shell" id="contas">
        <div className="section-heading">
          <span className="eyebrow">Cresce junto com você</span>
          <h2>Um jeito de aprender em cada fase</h2>
        </div>
        <div className="account-grid">
          {[
            ['cofrinho', '5 a 8 anos', 'Conta Cofrinho', 'Guardar fica mais fácil quando cada moeda tem um sonho.', 'pig'],
            ['moedas', '9 a 10 anos', 'Conta Moedas', 'Metas, escolhas e pequenas responsabilidades no dia a dia.', 'coins'],
            ['cartoes', '10 a 12 anos', 'Conta Cartões', 'Mais autonomia para planejar, gastar e acompanhar.', 'card'],
          ].map(([page, age, title, text, art], i) => (
            <button className={`account-card tone-${i + 1}`} key={page} onClick={() => go(page as Page)}>
              <span className="card-age">{age}</span>
              <span className="mini-art"><Illustration type={art} /></span>
              <strong>{title}</strong>
              <span>{text}</span>
              <b>Conhecer conta →</b>
            </button>
          ))}
        </div>
      </section>

      <section className="steps shell" id="funciona">
        <div className="section-heading"><span className="eyebrow">Simples de verdade</span><h2>Aprender fazendo funciona melhor</h2></div>
        <div className="step-grid">
          {[['01', 'Escolha uma meta', 'Defina algo que você quer conquistar.'], ['02', 'Organize o valor', 'Descubra quanto guardar a cada semana.'], ['03', 'Veja seu sonho crescer', 'Acompanhe o progresso e celebre cada passo.']].map(([n, t, d]) => (
            <article className="step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>
          ))}
        </div>
      </section>

      <section className="guardian shell" id="responsaveis">
        <div><span className="eyebrow light">Para toda a família</span><h2>Você acompanha.<br />A criança aprende.</h2><p>Orientação na medida certa, com segurança e espaço para a autonomia crescer.</p></div>
        <ul><li>Limites personalizados</li><li>Acompanhamento em tempo real</li><li>Conversas mais leves sobre dinheiro</li></ul>
        <button className="btn btn-coral btn-large" onClick={() => go('responsavel')}>Área do responsável →</button>
      </section>
      <footer className="shell"><Mark small /><span>Dinheiro também se aprende brincando.</span><small>© 2025 Hamm</small></footer>
    </main>
  )
}

function SideNav({ active, go }: { active: Page; go: (page: Page) => void }) {
  return (
    <aside className="sidebar">
      <Mark />
      <div className="side-links">
        <span>MINHA CONTA</span>
        <button className={active !== 'historico' && active !== 'responsavel' ? 'active' : ''} onClick={() => go('cofrinho')}>⌂ <b>Visão geral</b></button>
        <button className={active === 'historico' ? 'active' : ''} onClick={() => go('historico')}>↻ <b>Histórico</b></button>
        <button className={active === 'responsavel' ? 'active' : ''} onClick={() => go('responsavel')}>◎ <b>Responsável</b></button>
      </div>
      <button className="btn btn-ghost logout" onClick={() => go('home')}>Sair</button>
    </aside>
  )
}

function Dashboard({ kind, go, onAdd, transactions, goals, onNewGoal, onDeposit }: { kind: AccountType; go: (page: Page) => void; onAdd: (type: TransactionType, account: AccountType) => void; transactions: Transaction[]; goals: Goal[]; onNewGoal: (account: 'moedas' | 'cartoes') => void; onDeposit: (goal: Goal) => void }) {
  const data = accountData[kind]
  const accountTransactions = transactions.filter((item) => item.account === kind)
  const income = accountTransactions.filter((item) => item.type === 'receita').reduce((sum, item) => sum + item.value, 0)
  const spent = accountTransactions.filter((item) => item.type === 'despesa' && item.category !== 'Doação').reduce((sum, item) => sum + item.value, 0)
  const shared = accountTransactions.filter((item) => item.type === 'despesa' && item.category === 'Doação').reduce((sum, item) => sum + item.value, 0)
  const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const accountGoals = goals.filter((goal) => goal.account === kind)
  return (
    <div className="app-layout">
      <SideNav active={kind} go={go} />
      <main className="dashboard">
        <header className="dash-head">
          <div><span className="eyebrow">{data.profile}</span><h1>Olá, {data.persona.split(',')[0]}!</h1><p>{data.subtitle}</p></div>
          <button className="avatar" onClick={() => go('responsavel')}>{data.persona.charAt(0)}</button>
        </header>
        <div className="account-tabs">
          {(['cofrinho', 'moedas', 'cartoes'] as const).map((item) => <button key={item} className={kind === item ? 'active' : ''} onClick={() => go(item)}>{accountData[item].title}</button>)}
        </div>
        <section className={`balance-panel balance-${kind}`}>
          <div className="balance-art"><Illustration type={data.art} /></div>
          <div className="balance-copy"><span>{kind === 'cartoes' ? 'Saldo disponível' : 'Valor acumulado'}</span><strong>{money(income - spent - shared)}</strong><small>{accountTransactions.length} movimentações registradas</small><button className="btn btn-primary" onClick={() => onAdd('receita', kind)}>Adicionar valor</button></div>
        </section>
        <section className="metric-grid">
          {[['Guardado', money(income), '↑'], ['Gasto', money(spent), '↗'], ['Doado', money(shared), '♡']].map(([label, value, icon]) => (
            <article className={`metric ${label === 'Gasto' ? 'metric-spent' : ''}`} key={label}><span className="metric-icon">{icon}</span><div><small>{label}</small><strong>{value}</strong></div></article>
          ))}
        </section>
        {kind !== 'cofrinho' && <section className="goals-section">
          <div className="goals-head"><div><span className="eyebrow">Meus planos</span><h2>Objetivos</h2></div><button className="icon-action" onClick={() => onNewGoal(kind)} aria-label="Criar objetivo" title="Criar objetivo"><Icon name="plus" size={24} /></button></div>
          <div className={`goal-grid goals-${kind}`}>{accountGoals.map((goal, index) => {
            const progress = Math.min(100, Math.round(goal.saved / goal.target * 100))
            return <article key={goal.id}><span>{kind === 'cartoes' && index < 2 ? 'Meta mensal' : `Objetivo 0${index + 1}`}</span><strong>{goal.title}</strong><p>{money(goal.saved)} de {money(goal.target)}</p><div><i style={{ width: `${progress}%` }} /></div><footer><small>{progress}% concluído</small><button onClick={() => onDeposit(goal)} aria-label={`Depositar em ${goal.title}`} title="Adicionar depósito"><Icon name="plus" size={18} /></button></footer></article>
          })}</div>
        </section>}
        <section className={`responsibility-card responsibility-${kind}`}>
          <div className="persona-label"><span>{data.persona}</span><b>{data.responsibility}</b></div>
          <div>
            <span className="eyebrow">Responsabilidades desta fase</span>
            <h2>{data.profile}</h2>
            <ul>{data.habits.map((habit) => <li key={habit}>{habit}</li>)}</ul>
          </div>
          <div className="next-step"><small>Próximo hábito</small><strong>{data.nextStep}</strong><span>Progresso da semana</span><div><i /></div></div>
        </section>
      </main>
    </div>
  )
}

function History({ go, onAdd, transactions }: { go: (page: Page) => void; onAdd: (type: TransactionType, account: AccountType) => void; transactions: Transaction[] }) {
  const formatDate = (date: string) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`)).replace('.', '')
  const formatValue = (item: Transaction) => `${item.type === 'receita' ? '+' : '−'} ${item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  return <div className="app-layout"><SideNav active="historico" go={go} /><main className="dashboard"><header className="dash-head"><div><span className="eyebrow">Seus movimentos</span><h1>Histórico</h1><p>Acompanhe tudo que entrou, saiu ou foi guardado.</p></div><button className="avatar">B</button></header><section className="history-card"><div className="history-head"><div><h2>Últimas movimentações</h2><small>{transactions.length} registros</small></div><button className="icon-action" onClick={() => onAdd('despesa', 'cofrinho')} aria-label="Adicionar movimentação" title="Adicionar movimentação"><Icon name="plus" size={25} /></button></div>{transactions.map((item) => <div className="history-row history-enter" key={item.id}><time>{formatDate(item.date)}</time><b>{item.description}<small className={`account-tag tag-${item.account}`}>{accountData[item.account].title}</small></b><span>{item.category}</span><strong className={item.type === 'receita' ? 'positive' : ''}>{formatValue(item)}</strong></div>)}</section></main></div>
}

function TransactionModal({ initialType, initialAccount, onClose, onSave }: { initialType: TransactionType; initialAccount: AccountType; onClose: () => void; onSave: (transaction: Omit<Transaction, 'id'>) => void }) {
  const [type, setType] = useState(initialType)
  const [account, setAccount] = useState(initialAccount)
  const [category, setCategory] = useState('')
  const [saved, setSaved] = useState(false)
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget as HTMLFormElement)
    onSave({
      type,
      category,
      description: String(form.get('description')),
      value: Number(form.get('value')),
      date: String(form.get('date')),
      account,
    })
    setSaved(true)
    window.setTimeout(onClose, 900)
  }
  const categories = type === 'receita'
    ? [['Mesada', 'wallet'], ['Presente', 'gift'], ['Outro', 'dots']] as const
    : [['Alimentação', 'food'], ['Lazer', 'game'], ['Educação', 'book'], ['Doação', 'heart'], ['Outro', 'dots']] as const
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-title">
        {saved ? <div className="modal-success"><span><Icon name="check" size={34} /></span><h2>Movimentação registrada</h2><p>Seu saldo e histórico foram atualizados.</p></div> : <>
          <header><div><span className="eyebrow">Nova movimentação</span><h2 id="transaction-title">Adicionar ao histórico</h2></div><button className="modal-close" onClick={onClose} aria-label="Fechar">×</button></header>
          <div className="type-toggle">
            <button type="button" className={type === 'receita' ? 'active income' : ''} onClick={() => { setType('receita'); setCategory('') }} aria-label="Receita" title="Receita"><Icon name="plus" size={25} /></button>
            <button type="button" className={type === 'despesa' ? 'active expense' : ''} onClick={() => { setType('despesa'); setCategory('') }} aria-label="Despesa" title="Despesa"><Icon name="minus" size={25} /></button>
          </div>
          <form onSubmit={submit}>
            <fieldset className="account-picker"><legend>Conta</legend><div>{(['cofrinho', 'moedas', 'cartoes'] as AccountType[]).map((item) => <button type="button" key={item} className={account === item ? `active tag-${item}` : ''} onClick={() => setAccount(item)}>{accountData[item].title}</button>)}</div></fieldset>
            <label>Descrição<input name="description" autoFocus required placeholder={type === 'receita' ? 'Ex.: Mesada' : 'Ex.: Lanche'} /></label>
            <div className="form-row">
              <label>Valor (R$)<input name="value" required type="number" min="0.01" step="0.01" placeholder="0,00" /></label>
              <label>Data<input name="date" required type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label>
            </div>
            <fieldset className="category-picker"><legend>Categoria</legend><div>{categories.map(([label, icon]) => <button type="button" key={label} className={category === label ? 'active' : ''} onClick={() => setCategory(label)} aria-label={label} title={label}><Icon name={icon} size={24} /></button>)}</div><input className="hidden-category" tabIndex={-1} required value={category} onChange={() => undefined} aria-label="Categoria selecionada" /></fieldset>
            <label className="optional">Observação <span>opcional</span><textarea rows={3} placeholder="Conte um pouco sobre esta movimentação" /></label>
            <div className="modal-actions"><button type="button" className="icon-cancel" onClick={onClose} aria-label="Cancelar" title="Cancelar">×</button><button className={`icon-save ${type === 'despesa' ? 'expense' : ''}`} type="submit" aria-label={`Salvar ${type}`} title={`Salvar ${type}`}><Icon name="check" size={25} /></button></div>
          </form>
        </>}
      </section>
    </div>
  )
}

function GoalModal({ mode, onClose, onCreate, onDeposit }: { mode: { account: 'moedas' | 'cartoes'; goal?: Goal }; onClose: () => void; onCreate: (goal: Omit<Goal, 'id' | 'saved'>) => void; onDeposit: (id: number, value: number) => void }) {
  const isDeposit = Boolean(mode.goal)
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget as HTMLFormElement)
    if (mode.goal) onDeposit(mode.goal.id, Number(form.get('value')))
    else onCreate({ account: mode.account, title: String(form.get('title')), target: Number(form.get('value')) })
    onClose()
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="transaction-modal goal-modal" role="dialog" aria-modal="true"><header><div><span className="eyebrow">{isDeposit ? 'Mais perto da conquista' : 'Um novo sonho'}</span><h2>{isDeposit ? 'Adicionar depósito' : 'Criar objetivo'}</h2></div><button className="modal-close" onClick={onClose} aria-label="Fechar">×</button></header><form onSubmit={submit}>
    <label>Título<input name="title" required defaultValue={mode.goal?.title ?? ''} disabled={isDeposit} placeholder="Ex.: Minha bicicleta" /></label>
    {isDeposit && <label>Valor do objetivo<input value={mode.goal?.target.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} disabled readOnly /></label>}
    <label>{isDeposit ? 'Valor do depósito' : 'Valor do objetivo'} (R$)<input name="value" autoFocus required type="number" min="0.01" step="0.01" placeholder="0,00" /></label>
    <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button><button className="btn btn-primary" type="submit">{isDeposit ? 'Depositar' : 'Criar objetivo'}</button></div>
  </form></section></div>
}

function GuardianDashboard({ go }: { go: (page: Page) => void }) {
  return <div className="app-layout"><SideNav active="responsavel" go={go} /><main className="dashboard"><header className="dash-head"><div><span className="eyebrow">Área do responsável</span><h1>Olá, Marina!</h1><p>Acompanhe a evolução da criança sem tirar a autonomia dela.</p></div><button className="avatar guardian-avatar">M</button></header><section className="guardian-wireframe"><div className="guardian-kpis"><article><small>Saldo total</small><strong>R$ 264,00</strong><span>↑ 12% neste mês</span></article><article><small>Economia do mês</small><strong>R$ 96,00</strong><span>Acima da média</span></article><article><small>Meta atual</small><strong>Bicicleta</strong><span>68% concluída</span></article><article><small>Limite disponível</small><strong>R$ 120,00</strong><span>Uso saudável</span></article></div><div className="guardian-chart"><div><span className="eyebrow">Visão dos últimos meses</span><h2>Progresso financeiro</h2><p>Uma visão clara dos hábitos e conquistas.</p></div><div className="chart" aria-label="Gráfico de economia mensal">{[36, 51, 45, 68, 77, 92].map((h, i) => <div key={i}><span style={{height: `${h}%`}}></span><small>{['Jan','Fev','Mar','Abr','Mai','Jun'][i]}</small></div>)}</div></div></section><section className="guardian-objectives"><article><small>Objetivo 01</small><strong>Bicicleta</strong><span>68%</span></article><article><small>Objetivo 02</small><strong>Livro novo</strong><span>42%</span></article><article><small>Objetivo 03</small><strong>Passeio</strong><span>25%</span></article></section></main></div>
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [modal, setModal] = useState<{ type: TransactionType; account: AccountType } | null>(null)
  const [goalModal, setGoalModal] = useState<{ account: 'moedas' | 'cartoes'; goal?: Goal } | null>(null)
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, account: 'moedas', title: 'Bicicleta', target: 500, saved: 340 },
    { id: 2, account: 'moedas', title: 'Livro novo', target: 100, saved: 42 },
    { id: 3, account: 'moedas', title: 'Passeio', target: 200, saved: 50 },
    { id: 4, account: 'cartoes', title: 'Reserva mensal', target: 300, saved: 240 },
    { id: 5, account: 'cartoes', title: 'Limite de lazer', target: 200, saved: 110 },
    { id: 6, account: 'cartoes', title: 'Curso de design', target: 600, saved: 210 },
  ])
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 8, date: '2025-06-15', description: 'Mesada', category: 'Mesada', type: 'receita', value: 180, account: 'cartoes' },
    { id: 7, date: '2025-06-14', description: 'Cinema', category: 'Lazer', type: 'despesa', value: 45, account: 'cartoes' },
    { id: 6, date: '2025-06-13', description: 'Dinheiro guardado', category: 'Mesada', type: 'receita', value: 100, account: 'moedas' },
    { id: 5, date: '2025-06-12', description: 'Livro novo', category: 'Educação', type: 'despesa', value: 28, account: 'moedas' },
    { id: 4, date: '2025-06-10', description: 'Moedas da semana', category: 'Presente', type: 'receita', value: 42, account: 'cofrinho' },
    { id: 3, date: '2025-06-08', description: 'Mesada', category: 'Mesada', type: 'receita', value: 50, account: 'moedas' },
    { id: 2, date: '2025-06-02', description: 'Presente para a vovó', category: 'Doação', type: 'despesa', value: 12, account: 'cofrinho' },
    { id: 1, date: '2025-05-29', description: 'Meta bicicleta', category: 'Outro', type: 'receita', value: 20, account: 'cofrinho' },
  ])
  const saveTransaction = (transaction: Omit<Transaction, 'id'>) => setTransactions((current) => [{ ...transaction, id: Date.now() }, ...current])
  const openTransaction = (type: TransactionType, account: AccountType) => setModal({ type, account })
  const createGoal = (goal: Omit<Goal, 'id' | 'saved'>) => setGoals((current) => [...current, { ...goal, id: Date.now(), saved: 0 }])
  const depositGoal = (id: number, value: number) => setGoals((current) => current.map((goal) => goal.id === id ? { ...goal, saved: Math.min(goal.target, goal.saved + value) } : goal))
  const go = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  let content
  if (page === 'home') content = <Home go={go} />
  else if (page === 'historico') content = <History go={go} onAdd={openTransaction} transactions={transactions} />
  else if (page === 'responsavel') content = <GuardianDashboard go={go} />
  else content = <Dashboard kind={page} go={go} onAdd={openTransaction} transactions={transactions} goals={goals} onNewGoal={(account) => setGoalModal({ account })} onDeposit={(goal) => setGoalModal({ account: goal.account, goal })} />
  return <>{content}{modal && <TransactionModal initialType={modal.type} initialAccount={modal.account} onClose={() => setModal(null)} onSave={saveTransaction} />}{goalModal && <GoalModal mode={goalModal} onClose={() => setGoalModal(null)} onCreate={createGoal} onDeposit={depositGoal} />}</>
}
