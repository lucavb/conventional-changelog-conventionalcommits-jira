import { describe, expect, it } from 'vitest';
import { addJiraBangNotes } from './utils';

describe('addJiraBangNotes', () => {
    it('adds a breaking-change note for bang commit headers', () => {
        const commit = {
            header: 'JIRA-123 feat(api)!: remove legacy endpoint',
            notes: [] as { title?: string; text: string }[],
        };

        addJiraBangNotes(commit);

        expect(commit.notes).toEqual([{ text: 'remove legacy endpoint' }]);
    });

    it('supports two-letter ticket prefixes', () => {
        const commit = {
            header: 'YA-42 infra(platform)!: migrate cluster',
            notes: [] as { title?: string; text: string }[],
        };

        addJiraBangNotes(commit);

        expect(commit.notes).toEqual([{ text: 'migrate cluster' }]);
    });

    it('does nothing when the header is missing', () => {
        const commit = {
            header: null,
            notes: [] as { title?: string; text: string }[],
        };

        addJiraBangNotes(commit);

        expect(commit.notes).toEqual([]);
    });

    it('does nothing when notes already exist', () => {
        const commit = {
            header: 'JIRA-123 feat(api)!: remove legacy endpoint',
            notes: [{ text: 'existing note' }],
        };

        addJiraBangNotes(commit);

        expect(commit.notes).toEqual([{ text: 'existing note' }]);
    });

    it('does nothing for non-breaking commit headers', () => {
        const commit = {
            header: 'JIRA-123 feat(api): add endpoint',
            notes: [] as { title?: string; text: string }[],
        };

        addJiraBangNotes(commit);

        expect(commit.notes).toEqual([]);
    });
});
