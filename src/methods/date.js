import dayjs from "dayjs";

export function date(time) {
    // 格式為 yyyy/mm/dd
   return dayjs(time*1000).format('YYYY/MM/DD')
}


