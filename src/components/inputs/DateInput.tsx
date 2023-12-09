import { DatePicker } from "antd"
import type { Moment } from "moment"
import momentGenerateConfig from "rc-picker/lib/generate/moment"
import { Dispatch, SetStateAction } from "react"
import { locale } from "@/tools/locale"

const MyDatePicker = DatePicker.generatePicker<Moment>(momentGenerateConfig)

export { MyDatePicker as DatePicker }

import antdLocale from "antd/es/date-picker/locale/en_US"

export default function DateInput({ date, setDate, error, setError, label }: { date: Date | undefined; setDate: Dispatch<SetStateAction<Date | undefined>>; error?: string; setError?: Dispatch<SetStateAction<string>>; label?: string }) {
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""
    function disabledDate(current: Moment) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return current && current.valueOf() < yesterday.valueOf()
    }
    return (
        <label>
            {errorHtml || label}
            <MyDatePicker
                className={`!border-2 !block cursor-pointer !shadow-none ${error ? "!border-red-500" : "!border-gray-200"} !focus:border-primary`}
                onChange={(e) => {
                    setDate(e?.toDate() as Date)
                }}
                onFocus={() => {
                    if (setError) setError("")
                }}
                disabledDate={disabledDate}
                locale={{
                    ...antdLocale,
                    lang: {
                        ...antdLocale.lang,
                        today: "Danas",
                        shortWeekDays: locale.rs.shortWeekDays,
                    },
                }}
                placeholder="Datum"
            />
        </label>
    )
}
