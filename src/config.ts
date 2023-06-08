import conventionalChangelogConventionalCommits, {
    ConventionalChangelogConventionalCommits,
} from 'conventional-changelog-conventionalcommits';
import { headerConfig } from './header-config';

const patchConfig = (config: ConventionalChangelogConventionalCommits) => {
    config.conventionalChangelog.parserOpts.headerCorrespondence = headerConfig.headerCorrespondence;
    config.conventionalChangelog.parserOpts.headerPattern = headerConfig.headerPattern;

    config.recommendedBumpOpts.parserOpts.headerCorrespondence = headerConfig.headerCorrespondence;
    config.recommendedBumpOpts.parserOpts.headerPattern = headerConfig.headerPattern;

    config.parserOpts.headerCorrespondence = headerConfig.headerCorrespondence;
    config.parserOpts.headerPattern = headerConfig.headerPattern;

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
