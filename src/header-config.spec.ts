import { describe, expect, it } from 'vitest';
import { breakingBangHeaderPattern, headerConfig } from './header-config';

const parseHeader = (header: string) => {
    const match = header.match(new RegExp(headerConfig.headerPattern));

    if (!match) {
        return null;
    }

    return headerConfig.headerCorrespondence.reduce<Record<string, string>>((result, key, index) => {
        const value = match[index + 1];

        if (value !== undefined) {
            result[key] = value;
        }

        return result;
    }, {});
};

describe('headerConfig.headerPattern', () => {
    it('parses a standard Jira-prefixed commit', () => {
        expect(parseHeader('JIRA-1234 feat(package) some change')).toEqual({
            ticketReference: 'JIRA-1234',
            type: 'feat',
            scope: 'package',
            subject: 'some change',
        });
    });

    it('parses commits with an optional colon after the ticket', () => {
        expect(parseHeader('JIRA-1234: feat(package) some change')).toEqual({
            ticketReference: 'JIRA-1234',
            type: 'feat',
            scope: 'package',
            subject: 'some change',
        });
    });

    it('parses breaking-change commits with a bang before the colon', () => {
        expect(parseHeader('JIRA-1234 feat(package)!: breaking change')).toEqual({
            ticketReference: 'JIRA-1234',
            type: 'feat',
            scope: 'package',
            subject: 'breaking change',
        });
    });

    it('parses expanded commit types such as infra and chore', () => {
        expect(parseHeader('YA-7 infra(platform) rollout change')).toEqual({
            ticketReference: 'YA-7',
            type: 'infra',
            scope: 'platform',
            subject: 'rollout change',
        });
    });
});

describe('breakingBangHeaderPattern', () => {
    it('matches only breaking-change headers', () => {
        expect('JIRA-123 feat(scope)!: breaking change').toMatch(new RegExp(breakingBangHeaderPattern));
        expect('JIRA-123 feat(scope): regular change').not.toMatch(new RegExp(breakingBangHeaderPattern));
    });
});
