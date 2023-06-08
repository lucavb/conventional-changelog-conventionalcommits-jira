export const headerConfig = {
    headerPattern:
        '^([A-Z]{3,}-\\d{1,5}):? (build|ci|docs|feat|fix|perf|refactor|style|test)(?:\\(([\\w-]+)\\))?\\S* (.+)$',
    headerCorrespondence: ['ticketReference', 'type', 'scope', 'subject'],
};
