import conventionalChangelogConventionalCommits, {
    ConventionalChangelogConventionalCommits,
} from 'conventional-changelog-conventionalcommits';
import { headerConfig } from './header-config';
import { addJiraBangNotes } from './utils';

const patchConfig = (config: ConventionalChangelogConventionalCommits) => {
    config.conventionalChangelog.parserOpts.headerCorrespondence = headerConfig.headerCorrespondence;
    config.conventionalChangelog.parserOpts.headerPattern = headerConfig.headerPattern;

    config.recommendedBumpOpts.parserOpts.headerCorrespondence = headerConfig.headerCorrespondence;
    config.recommendedBumpOpts.parserOpts.headerPattern = headerConfig.headerPattern;

    config.parserOpts.headerCorrespondence = headerConfig.headerCorrespondence;
    config.parserOpts.headerPattern = headerConfig.headerPattern;

    const originalWhatBump = config.recommendedBumpOpts.whatBump;
    if (originalWhatBump) {
        config.recommendedBumpOpts.whatBump = (commits, options) => {
            commits.forEach(addJiraBangNotes);
            return originalWhatBump(commits, options);
        };
    }

    const originalTransform = config.writerOpts.transform;
    if (originalTransform) {
        config.writerOpts.transform = (commit, context) => {
            addJiraBangNotes(commit);
            return originalTransform(commit, context);
        };
    }

    return config;
};

export const conventionalCommitConfig = (
    parameter?: ((err: null, config: ConventionalChangelogConventionalCommits) => void) | object,
): void | Promise<ConventionalChangelogConventionalCommits> => {
    if (typeof parameter === 'function') {
        void conventionalChangelogConventionalCommits((err, result) => {
            parameter(err, patchConfig(result));
        });
    } else {
        return conventionalChangelogConventionalCommits(parameter).then(patchConfig);
    }
};
