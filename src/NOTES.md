NOTES — Bird Movement Plan

## Plan (Steps)
 1. Add **gravity** so the bird naturally falls down every frame.
 2. Add **jump input** (spacebar or click) to make the bird go up.
 3. Continuously **update** the bird’s position on the canvas using an animation loop.
 4. Redraw the **background, pipes, and bird** on every frame.

## Functions to Implement

* `draw()`
  - **Purpose:** Draw the current game state (bird, pipes, background) on the canvas.

* `update()`
  - **Purpose:** Update the bird’s position and speed based on gravity and jumps; then call `draw()` again for animation.

* `onInput()`
  - **Purpose:** Detect when the player presses a key or clicks, and make the bird “flap” (move up briefly).

* `resetGame()`
  - **Purpose:** Reset all positions and scores to restart the game when the player loses.