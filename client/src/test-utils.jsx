import { render } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router"

export function renderWithRouter(ui, route = "/") {
    const router = createMemoryRouter(
        [{ path: route, element: ui }],
        { initialEntries: [route] }
    );

    return render(<RouterProvider router={router} />);
}