declare module 'conventional-changelog-conventionalcommits' {
    import type { Options as ParserOptions } from 'conventional-commits-parser';

    export interface ConventionalChangelogConventionalCommits {
        conventionalChangelog: ConventionalChangelog;
        parserOpts: ParserOptions;
        recommendedBumpOpts: RecommendedBumpOpts;
        writerOpts: WriterOpts;
    }

    export interface ConventionalChangelog {
        parserOpts: ParserOptions;
        writerOpts: WriterOpts;
    }

    export interface WriterOpts {
        commitGroupsSort: string;
        commitPartial: string;
        commitsSort: string[];
        footerPartial: string;
        groupBy: string;
        headerPartial: string;
        mainTemplate: string;
        noteGroupsSort: string;
        transform?: (commit: Commit, context: unknown) => Commit | undefined;
    }

    export interface Commit {
        header: string | null;
        notes: CommitNote[];
        [key: string]: unknown;
    }

    export interface CommitNote {
        title?: string;
        text: string;
    }

    export interface RecommendedBumpOpts {
        parserOpts: ParserOptions;
        whatBump?: (commits: Commit[], options: unknown) => WhatBumpResult;
    }

    export interface WhatBumpResult {
        level: number;
        reason: string;
    }

    declare function conventionalChangelogConventionalCommits(
        parameter: (err: null, result: ConventionalChangelogConventionalCommits) => void,
    ): void;

    declare function conventionalChangelogConventionalCommits(
        parameter?: object,
    ): Promise<ConventionalChangelogConventionalCommits>;

    export default conventionalChangelogConventionalCommits;
}
