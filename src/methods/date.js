export function date(time) {
    // 格式為 yyyy/mm/dd
    const localDate = new Date(time * 1000);
    return localDate.toLocaleDateString();
}