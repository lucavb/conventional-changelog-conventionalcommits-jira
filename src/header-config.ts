export const allowedCommitTypes = [
    'build',
    'chore',
    'ci',
    'docs',
    'feat',
    'fix',
    'infra',
    'perf',
    'refactor',
    'revert',
    'style',
    'test',
] as const;

const commitTypesPattern = allowedCommitTypes.join('|');

export const breakingBangHeaderPattern = `^(?:[A-Z]{2,}-\\d{1,5}):? (${commitTypesPattern})(?:\\(([\\w-]+)\\))?!: (.+)$`;

export const headerConfig = {
    headerCorrespondence: ['ticketReference', 'type', 'scope', 'subject'],
    headerPattern: `^([A-Z]{2,}-\\d{1,5}):? (${commitTypesPattern})(?:\\(([\\w-]+)\\))?!?\\:? (.+)$`,
};
