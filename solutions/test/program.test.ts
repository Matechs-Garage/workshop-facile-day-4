import * as P from "@app/Program";
import * as E from "@app/Either";
import * as App from "@app/App";
import { TurnLeft } from "@app/Domain/Command";
import { pipe } from "@app/Function";
import { East, North, South, West } from "@app/Domain/Orientation";
import { RoverState } from "@app/Domain/RoverState";

describe("Mars Rover", () => {
  it("should move left looking north ending up looking west", async () => {
    const programConfig = {
      ProgramConfig: {
        planet: {
          x: 5,
          y: 4,
        },
        initialState: {
          orientation: new North(),
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    };

    const result = await pipe(
      P.process(new TurnLeft()),
      App.chain(() => P.getRoverState),
      App.provideM(P.initialState),
      App.provide<P.ProgramConfig>(programConfig),
      App.unsafeRun
    );

    expect(result).toEqual(
      E.right<never, RoverState>({
        orientation: new West(),
        position: {
          x: 4,
          y: 0,
        },
      })
    );
  });
  it("should move left looking East ending up looking North", async () => {
    const programConfig = {
      ProgramConfig: {
        planet: {
          x: 5,
          y: 4,
        },
        initialState: {
          orientation: new East(),
          position: {
            x: 0,
            y: 3,
          },
        },
      },
    };

    const result = await pipe(
      P.process(new TurnLeft()),
      App.chain(() => P.getRoverState),
      App.provideM(P.initialState),
      App.provide<P.ProgramConfig>(programConfig),
      App.unsafeRun
    );

    expect(result).toEqual(
      E.right<never, RoverState>({
        orientation: new North(),
        position: {
          x: 0,
          y: 0,
        },
      })
    );
  });
  it("should move left looking South ending up looking East", async () => {
    const programConfig = {
      ProgramConfig: {
        planet: {
          x: 5,
          y: 4,
        },
        initialState: {
          orientation: new South(),
          position: {
            x: 4,
            y: 0,
          },
        },
      },
    };

    const result = await pipe(
      P.process(new TurnLeft()),
      App.chain(() => P.getRoverState),
      App.provideM(P.initialState),
      App.provide<P.ProgramConfig>(programConfig),
      App.unsafeRun
    );

    expect(result).toEqual(
      E.right<never, RoverState>({
        orientation: new East(),
        position: {
          x: 0,
          y: 0,
        },
      })
    );
  });
  it("should move left looking West ending up looking South", async () => {
    const programConfig = {
      ProgramConfig: {
        planet: {
          x: 5,
          y: 4,
        },
        initialState: {
          orientation: new West(),
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    };

    const result = await pipe(
      P.process(new TurnLeft()),
      App.chain(() => P.getRoverState),
      App.provideM(P.initialState),
      App.provide<P.ProgramConfig>(programConfig),
      App.unsafeRun
    );

    expect(result).toEqual(
      E.right<never, RoverState>({
        orientation: new South(),
        position: {
          x: 0,
          y: 3,
        },
      })
    );
  });
  it("should execute a batch of commands", async () => {
    const programConfig = {
      ProgramConfig: {
        planet: {
          x: 5,
          y: 4,
        },
        initialState: {
          orientation: new East(),
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    };

    const result = await pipe(
      P.move([new TurnLeft(), new TurnLeft()]),
      App.chain(() => P.getRoverState),
      App.provideM(P.initialState),
      App.provide<P.ProgramConfig>(programConfig),
      App.unsafeRun
    );

    expect(result).toEqual(
      E.right<never, RoverState>({
        orientation: new West(),
        position: {
          x: 4,
          y: 1,
        },
      })
    );
  });
});
