
// src/utils/projectMerge.ts

export const normalizeTitle = (title: string) => title.toLowerCase().trim().replace(/\s+/g, ' ');

export const mergeProjectsWithApi = (
    localMasterList: any[],
    apiProjects: any[],
    appendUnmatched: boolean = false
) => {
    const apiMap = new Map();
    const usedApiIds = new Set<any>();

    if (Array.isArray(apiProjects)) {
        apiProjects.forEach(p => {
            if (p && p.title) {
                // Use a normalized key for matching
                apiMap.set(normalizeTitle(p.title), p);
            }
        });
    }

    const merged = localMasterList.map(local => {
        const key = normalizeTitle(local.title);
        const apiMatch = apiMap.get(key);

        if (apiMatch) {
            usedApiIds.add(apiMatch.id);
            return {
                ...local,
                ...apiMatch,
                id: apiMatch.id,
                is_hardcoded: false
            };
        }

        return {
            ...local,
            is_hardcoded: true
        };
    });

    if (appendUnmatched && Array.isArray(apiProjects)) {
        // Filter out projects that were already matched
        const newItems = apiProjects.filter(p => !usedApiIds.has(p.id));
        return [...merged, ...newItems];
    }

    return merged;
};
