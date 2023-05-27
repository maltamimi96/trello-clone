interface Board {
  columns: Map<string, string>
}
type TypedColumn = "todo" | "inprogress" | "done"
