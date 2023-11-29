import React from "react"
import type { PickerTimeProps } from "antd/es/date-picker/generatePicker"
import { min, type Moment } from "moment"

import { DatePicker } from "./DateInput"

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, "picker"> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => <DatePicker {...props} picker="time" mode={undefined} ref={ref} />)

TimePicker.displayName = "TimePicker"

import "./TimeInput.css"

import locale from "antd/es/date-picker/locale/en_US"
import { useEffect, useState } from "react"

const minuteOptions = [0, 15, 30, 45, 60]

const closest = (goal: number) => {
    return minuteOptions.reduce(function (prev, curr) {
        return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
    })
}

export default function TimeInput({ date, setDate, error, setError, label, disabledTime, disabled, title }: { date: string | undefined; setDate: React.Dispatch<React.SetStateAction<string | undefined>>; error?: string; setError?: React.Dispatch<React.SetStateAction<string>>; label?: string; disabledTime?: (date: Moment) => any; disabled?: boolean; title?: string }) {
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""
    const [value, setValue] = useState<Moment>()
    useEffect(() => {
        if (date == "") setValue(undefined)
    }, [date])

    const [prevHour, setPrevHour] = useState<undefined | number>(undefined)
    return (
        <label className="w-full" title={title}>
            {errorHtml || label}
            <TimePicker
                className={`!border-2 !block cursor-pointer !w-full !shadow-none ${error ? "!border-red-500" : "!border-gray-200"} !focus:border-primary`}
                onSelect={(moment) => {
                    const newHour = moment.toDate().getHours()
                    const newMinutes = moment.toDate().getMinutes()
                    if (newHour != prevHour && newMinutes != 0) {
                        // const newMoment = moment?.clone().set("minute", closest(newMinutes))
                        // setValue(newMoment)
                    }
                    setPrevHour(newHour)
                }}
                onChange={(moment) => {
                    let hour = moment?.toDate().getHours() as number
                    let minutes = moment?.toDate().getMinutes() as number
                    let steppedMinutes = closest(minutes)
                    let minutesForDate = closest(minutes)

                    if (disabledTime && disabledTime(moment as Moment).disabledMinutes && disabledTime(moment as Moment).disabledMinutes().length) {
                        let difference = minuteOptions.filter(
                            (x) =>
                                !disabledTime(moment as Moment)
                                    .disabledMinutes()
                                    .includes(x)
                        )

                        steppedMinutes = difference[0]
                        minutesForDate = difference[0]
                    }
                    if (steppedMinutes == 60) {
                        hour++
                    }
                    if (hour && (minutes || minutes == 0)) {
                        setDate(`${hour}:${steppedMinutes == 60 ? 0 : steppedMinutes}`)
                    } else {
                        setDate(undefined)
                    }

                    const newMoment = moment?.clone().set("minute", minutesForDate)
                    setValue(newMoment)
                }}
                value={value}
                format={"HH:mm"}
                minuteStep={15}
                onFocus={() => {
                    if (setError) setError("")
                }}
                disabled={disabled}
                disabledTime={disabledTime}
                hideDisabledOptions={true}
                locale={{
                    ...locale,
                    lang: {
                        ...locale.lang,
                        now: "Sada",
                        ok: "Ok",
                    },
                }}
                placeholder={label || ""}
            />
        </label>
    )
}
