import { FormEvent, useMemo, useState } from 'react';

type Sender = 'assistant' | 'user';

type Message = {
  id: number;
  sender: Sender;
  content: string;
  time: string;
};

const starterMessages: Message[] = [
  {
    id: 1,
    sender: 'assistant',
    content:
      'Bonjour, je suis Nova. Je peux t’aider à rédiger, structurer une idée, générer du code, ou explorer une stratégie produit.',
    time: '09:12',
  },
  {
    id: 2,
    sender: 'assistant',
    content:
      'Essaie une requête comme: "Crée une landing page moderne pour une app de finance" ou "Aide-moi à concevoir un chatbot IA en React".',
    time: '09:12',
  },
];

const prompts = [
  'Rédige un message professionnel',
  'Génère une page d’accueil moderne',
  'Explique un concept simplement',
  'Corrige ce composant React',
];

function getTimeLabel() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createAssistantReply(input: string) {
  const cleaned = input.trim();
  if (!cleaned) {
    return 'Pose-moi une demande précise et je te répondrai avec une structure claire.';
  }

  if (/react|jsx|tsx|frontend/i.test(cleaned)) {
    return 'Je peux te proposer une architecture React propre, une interface accessible et un composant prêt à intégrer.';
  }

  if (/design|ui|ux|interface/i.test(cleaned)) {
    return 'Je partirais sur une interface sombre, lisible, avec hiérarchie nette, zones respirantes et actions visibles au premier regard.';
  }

  if (/code|dévelop|develop|component|composant/i.test(cleaned)) {
    return 'Voici une direction utile: découper en composants, isoler l’état du chat, puis styliser le panneau de conversation et la barre de saisie.';
  }

  return 'Compris. Je peux reformuler la demande, proposer un plan d’action, puis te donner un résultat concret et exploitable.';
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const canSend = useMemo(() => prompt.trim().length > 0 && !isThinking, [prompt, isThinking]);

  function sendMessage(content: string) {
    const nextUserMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content,
      time: getTimeLabel(),
    };

    setMessages((current) => [...current, nextUserMessage]);
    setIsThinking(true);
    setPrompt('');

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: createAssistantReply(content),
        time: getTimeLabel(),
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsThinking(false);
    }, 650);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) {
      return;
    }

    sendMessage(prompt);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">N</div>
          <div>
            <p className="eyebrow">AI Chat Interface</p>
            <h1>Nova Chat</h1>
          </div>
        </div>

        <div className="sidebar-card">
          <span className="status-dot" />
          <div>
            <p className="card-title">Assistant actif</p>
            <p className="card-subtitle">Réponses instantanées, ton clair, UX minimaliste.</p>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-label">Suggestions</p>
          <div className="suggestion-list">
            {prompts.map((item) => (
              <button key={item} type="button" className="suggestion-chip" onClick={() => sendMessage(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <p>Conçu pour un usage type ChatGPT: lecture rapide, contraste fort, composition stable.</p>
        </div>
      </aside>

      <main className="chat-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Conversation</p>
            <h2>Assistant IA conversationnel</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => setMessages(starterMessages)}>
            Réinitialiser
          </button>
        </header>

        <section className="chat-stream" aria-live="polite">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`message-row ${message.sender === 'user' ? 'message-row-user' : 'message-row-assistant'}`}
            >
              <div className={`avatar ${message.sender === 'user' ? 'avatar-user' : 'avatar-assistant'}`}>
                {message.sender === 'user' ? 'U' : 'N'}
              </div>
              <div className="message-card">
                <div className="message-meta">
                  <span>{message.sender === 'user' ? 'Vous' : 'Nova'}</span>
                  <time>{message.time}</time>
                </div>
                <p>{message.content}</p>
              </div>
            </article>
          ))}

          {isThinking ? (
            <article className="message-row message-row-assistant">
              <div className="avatar avatar-assistant">N</div>
              <div className="message-card thinking-card">
                <span className="typing-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <p>Nova réfléchit...</p>
              </div>
            </article>
          ) : null}
        </section>

        <section className="composer-card">
          <form className="composer" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="chat-input">
              Saisir un message
            </label>
            <textarea
              id="chat-input"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Écris ta demande ici..."
              rows={1}
            />
            <button type="submit" className="send-button" disabled={!canSend}>
              Envoyer
            </button>
          </form>
          <p className="composer-hint">
            Astuce: demande un plan, un texte, une correction de code ou une idée d’interface.
          </p>
        </section>
      </main>
    </div>
  );
}
