# The project was created with Vite + React + TypeScript.

1. Follow these steps to run the project locally:

- Clone the repository:
  git clone https://github.com/Vasyl-Zhyliakov/chat-app.git
- Navigate to the project directory:
  cd the_todo_app
- Install the dependencies (Make sure you have Node.js installed):
  npm install
- Start the development server:
  npm run dev
- You should see a local server link like:
  http://localhost:5173
  Open it in your browser to view the app.

2. Auto-scroll Implementation

- A reference to an empty block at the bottom of the message container was created using useRef:

  ```
  const chatRef = useRef<HTMLDivElement | null>(null);

  <div className="chat__messages">
    .....
    <div ref={chatRef}></div>
  </div>
  ```

- A smooth scroll to this element was implemented using the scrollIntoView method:
  ```
  const scrollCallback = () => {
  chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };
```
- In useEffect, the scrollCallback function is triggered whenever a new message from the user or bot appears:
```
  useEffect(() => {
  scrollCallback();
  }, [messages]);
```
3. Why I chose Redux

I chose Redux because it is more complex to implement, and i wanted to use it to enchance my state management skills.

4. The answers to the mandatory questions are in the AI-Reflection.md file.
