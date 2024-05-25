export function findNameByIndex(items, index) {
    for (const item of items) {
        if (item.index === index) {
            return item.name; // 找到匹配项，返回name
        }
        // 如果有子项，递归查找
        if (item.children && item.children.length) {
            const name = findNameByIndex(item.children, index);
            if (name) {
                return name; // 在子项中找到匹配，返回name
            }
        }
    }
    return null; // 如果没有找到匹配项，返回null
}