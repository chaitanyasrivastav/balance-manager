export type List = {
    id: number
    text: string
  }

export type GetActivityFn = (item: string) => void
export type AddActivityFn = () => void