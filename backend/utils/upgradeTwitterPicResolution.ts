export const upgradeTwitterPicResolution = (url: string): string => {
    if (!url.includes('pbs.twimg.com/profile_images/')) {
        return url;
    }

    return url.replace('_normal', '_400x400');
}