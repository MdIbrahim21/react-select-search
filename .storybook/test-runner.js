const { waitForPageReady } = require('@storybook/test-runner');

const { toMatchImageSnapshot } = require('jest-image-snapshot');

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

/** @type { import('@storybook/test-runner').TestRunnerConfig } */
module.exports = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },
    async postVisit(page, context) {
        // Waits for the page to be ready before taking a screenshot to ensure consistent results
        await waitForPageReady(page);

        // To capture a screenshot for different browsers, add page.context().browser().browserType().name() to get the browser name to prefix the file name
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            customSnapshotsDir,
            customSnapshotIdentifier: context.id,
        });
    },
};
