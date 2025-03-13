export interface Note {
  id?: string
  title: string
  content: string
  color:
    | "white"
    | "blue"
    | "yellow"
    | "green"
    | "pink"
    | "red"
    | "lightblue"
    | "purple"
    | "lime"
    | "orange"
    | "gray"
    | "darkgray"
    | "brown"
  favorite: boolean
}
