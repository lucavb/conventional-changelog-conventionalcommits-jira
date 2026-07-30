import { breakingBangHeaderPattern } from './header-config';

interface CommitNote {
    title?: string;
    text: string;
}

interface CommitWithNotes {
    header: string | null;
    notes: CommitNote[];
}

export const addJiraBangNotes = (commit: CommitWithNotes): void => {
    if (!commit.header || commit.notes.length > 0) {
        return;
    }

    const match = commit.header.match(new RegExp(breakingBangHeaderPattern));

    if (match) {
        commit.notes.push({
            text: match[3] ?? '',
        });
    }
};
