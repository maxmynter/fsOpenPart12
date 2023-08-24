import { Todo } from "./Todos/List"
import { render, screen } from "@testing-library/react"

it("displays the todo", () => {
  const todo = {
    _id: "64e72b2dd1b9aad8bccedb13",
    text: "Learn about containers",
    done: false,
  }
  const onClickComplete = () => {}
  const onClickDelete = () => {}
  render(
    <Todo
      todo={todo}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  )
  const element = screen.getByText("Learn about containers")
  expect(element).toBeDefined()
})
