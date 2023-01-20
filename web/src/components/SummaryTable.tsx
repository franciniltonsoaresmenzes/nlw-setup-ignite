import { generatesDatesFromBenginnig } from '../utils/generates-dates-from-year-beginnig'
import { HabitDay } from './HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const SummaryDates = generatesDatesFromBenginnig()

const mininumSummaryDatesSize = 18 * 7
const amountOfDaysFill = mininumSummaryDatesSize - SummaryDates.length

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => (
          <div
            key={`${weekDay} - ${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {SummaryDates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}

        {amountOfDaysFill > 0 &&
          Array.from({ length: amountOfDaysFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40"
            />
          ))}
      </div>
    </div>
  )
}