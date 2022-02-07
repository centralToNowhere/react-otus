import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RegistrationForm } from "@/components/RegistrationForm/RegistrationForm";
import { l10n } from "@/l10n/ru";
import userEvent from "@testing-library/user-event/dist";
import { defaultPlayer } from "@/player/Player";

describe("PlayerRegistrationForm tests", () => {
  it("should render player registration form", () => {
    const { asFragment } = render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={jest.fn()}
        loginPending={false}
        loginError=""
      />
    );

    const input = screen.getByLabelText(l10n.registerPlayerLabel);
    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onPlayerRegistration on button click", async () => {
    const onPlayerRegistration = jest.fn();

    render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={onPlayerRegistration}
        loginPending={false}
        loginError=""
      />
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(onPlayerRegistration).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onPlayerRegistration on button enter", async () => {
    const onPlayerRegistration = jest.fn();

    render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={onPlayerRegistration}
        loginPending={false}
        loginError=""
      />
    );

    const button = screen.getByRole("button");

    userEvent.type(button, "{enter}", {
      skipClick: true,
    });

    await waitFor(() => {
      expect(onPlayerRegistration).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onPlayerRegistration on enter keydown", async () => {
    const onPlayerRegistration = jest.fn();

    render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={onPlayerRegistration}
        loginPending={false}
        loginError=""
      />
    );

    const input = screen.getByLabelText(l10n.registerPlayerLabel);

    userEvent.type(input, "{enter}");

    await waitFor(() => {
      expect(onPlayerRegistration).toHaveBeenCalledTimes(1);
    });
  });

  it("should render spinner on loginPending", () => {
    render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={jest.fn()}
        loginPending={true}
        loginError=""
      />
    );

    const spinner = screen.queryByRole("status");

    expect(spinner).toBeVisible();
  });

  it("should not render spinner when loginPending = false", () => {
    render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={jest.fn()}
        loginPending={false}
        loginError=""
      />
    );

    const spinner = screen.queryByRole("status");

    expect(spinner).toBeNull();
  });

  it("should render error message", () => {
    render(
      <RegistrationForm
        player={defaultPlayer}
        onPlayerRegistration={jest.fn()}
        loginPending={false}
        loginError="something went wrong"
      />
    );

    const error = screen.queryByRole("alert");

    expect(error).toHaveTextContent("something went wrong");
  });
});
