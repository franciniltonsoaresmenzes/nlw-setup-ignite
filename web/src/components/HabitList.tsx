import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import dayjs from 'dayjs'

interface HabitListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface HabitInfo {
  possibleHabit: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function HabitList({ date, onCompletedChanged }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitInfo>()
  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data))
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits.filter((id) => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabit: habitsInfo!.possibleHabit,
      completedHabits,
    })
    onCompletedChanged(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabit.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group"
        >
          <div className="h-8 w-8 transition-all rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  )
}
