import { DatePicker } from "antd"
import type { Moment } from "moment"
import momentGenerateConfig from "rc-picker/lib/generate/moment"
import { Dispatch, SetStateAction } from "react"

const MyDatePicker = DatePicker.generatePicker<Moment>(momentGenerateConfig)

export { MyDatePicker as DatePicker }

import locale from "antd/es/date-picker/locale/en_US"

export default function DateInput({ date, setDate, error, setError, label }: { date: Date | undefined; setDate: Dispatch<SetStateAction<Date | undefined>>; error?: string; setError?: Dispatch<SetStateAction<string>>; label?: string }) {
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""
    return (
        <label>
            {errorHtml || label}
            <MyDatePicker
                className={`!border-2 !block cursor-pointer !shadow-none ${error ? "!border-red-500" : "!border-gray-200"} !focus:border-primary`}
                onChange={(e) => {
                    setDate(e?.toDate() as Date)
                    console.log(e?.toDate())
                }}
                onFocus={() => {
                    if (setError) setError("")
                }}
                locale={{
                    ...locale,
                    lang: {
                        ...locale.lang,
                        today: "Danas",
                    },
                }}
                placeholder="Datum"
            />
        </label>
    )
}
