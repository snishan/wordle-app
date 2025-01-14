# Wordle App

A modern, interactive Wordle game built with **React**, **Vite**, and **Ant Design**. Enjoy a seamless and responsive gaming experience with a clean and intuitive interface.

<img width="948" alt="wordle-app" src="https://github.com/user-attachments/assets/80a84add-df54-457c-bd09-fec72095e500" />

## 🌟 Features

- **Interactive Gameplay**: Guess the hidden word within a limited number of attempts.
- **Visual Feedback**: Get instant feedback on your guesses with color-coded tiles.
- **Confetti Celebration**: Celebrate your wins with a fun confetti animation.
- **Customizable Word List**: Easily add or modify the list of words to guess.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Ant Design
- **Styling**: Sass
- **TypeScript**: For enhanced type safety
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
├── src/                    # Source code
│   ├── assets/            # Static assets (images, styles)
│   ├── components/        # React components
│   ├── helper/            # Utility functions and data
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Entry point
├── public/                # Public assets
├── tests/                 # Test files
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🚀 Getting Started

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/your-username/wordle-app.git
   cd wordle-app
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the app.

4. To run tests:
   ```bash
   npm test
   ```

## 💻 Key Features

### Interactive Gameplay
- Guess a 5-letter word within 6 attempts.
- Receive instant feedback on each guess:
  - Green: Correct letter in the correct position.
  - Yellow: Correct letter in the wrong position.
  - Gray: Letter not in the word.

### Responsive Design
- Fully responsive layout optimized for:
  - Desktop (1024px and above)
  - Tablet (768px to 1023px)

### Confetti Celebration
- Celebrate your wins with a fun confetti animation powered by `react-confetti`.

### Customizable Word List
- Easily modify the list of words to guess by editing the `wordList` file.

## 🔑 Core Functionalities

- **Word Guessing**: Guess the hidden word within 6 attempts.
- **Feedback System**: Visual feedback for each guess.
- **Winning Animation**: Confetti animation for successful guesses.
- **Game Reset**: Start a new game with a new word.

## 🛠️ Future Improvements

- [ ] Add a scoring system.
- [ ] Implement a timer for timed gameplay.
- [ ] Add multiplayer functionality.
- [ ] Integrate a backend for persistent user data.
- [ ] Add support for multiple languages.
- [ ] Responsive design for mobile.

## 📱 Responsive Design

Fully responsive layout optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)

## Acknowledgments

- **React** team for the powerful frontend framework.
- **Vite** team for the fast build tool.
- **Ant Design** team for the beautiful UI components.
- **react-confetti** for the fun confetti animation.
- The open-source community for their contributions.

## LIVE LINK

[Wordle App Live Demo](#) *(Replace with your live link)*
