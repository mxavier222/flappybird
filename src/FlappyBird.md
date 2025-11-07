* Pseudocode for Storing Pipes in an Array

    Create an empty array called pipes

       In the update loop:
       For every pipe in pipes:
       Move pipe.x to the left (pipe.x -= speed)

       Draw top pipe using:
         height = pipe.topHeight

        Draw bottom pipe using:
          height = boardHeight - pipe.topHeight - pipe.gap

        If pipe.x + pipe.width < 0:
            Remove pipe from array 

* Decide When to Spawn a New Pipe

    Keep a timer variable
    timer += 1 (increment each frame)

    If timer is greater than some limit 
    Create a new pipe object with:
        x = boardWidth
        topHeight = random value
        gap = fixed gap size
    Add the pipe to the pipes array
    Reset timer to 0
