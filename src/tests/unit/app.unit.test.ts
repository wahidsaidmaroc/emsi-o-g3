import { describe, expect, it } from 'vitest';
import { createAssistantReply } from '../../App';

describe('createAssistantReply', () => {
  it('returns a prompt when the input is empty', () => {
    expect(createAssistantReply('   ')).toContain('Pose-moi une demande précise');
  });

  it('detects React-related requests', () => {
    expect(createAssistantReply('Help me build a React frontend')).toContain('architecture React');
  });

  it('detects UI-related requests', () => {
    expect(createAssistantReply('Need a better design for the interface')).toContain('interface sombre');
  });
});