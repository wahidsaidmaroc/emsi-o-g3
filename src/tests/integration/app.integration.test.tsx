import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../../App';

describe('App integration', () => {
  it('sends a message and renders the assistant response', async () => {
    vi.useFakeTimers();

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Écris ta demande ici...'), {
      target: { value: 'Créer une interface React moderne' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));

    expect(screen.getByText('Nova réfléchit...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(650);
    });

    expect(screen.getByText('Je peux te proposer une architecture React propre, une interface accessible et un composant prêt à intégrer.')).toBeInTheDocument();

    vi.useRealTimers();
  });
});