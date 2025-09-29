# Wordle Clone

A clone of the popular word-guessing game **Wordle**, built with Angular.\
The goal of this project is to recreate the Wordle gameplay experience while practicing **state management**, **responsive design**, and **physical keyboard integration**.

---

## Description

This project is a web-based Wordle clone that works on both desktop and mobile devices.\
The game randomly selects a secret word, and the player has six attempts to guess it.\
After each guess, feedback is provided:

- **Green**: The letter is correct and in the correct position.
- **Yellow**: The letter exists in the word but in the wrong position.
- **Gray**: The letter does not exist in the word.

The project is developed in **Angular** using **TypeScript**, and it uses a `BehaviorSubject` to manage game state.\
The UI is should be responsive and adapt automatically to different screen sizes, featuring an on-screen keyboard for mobile users.

---

## Getting Started

### Dependencies

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or later recommended)
- **Angular CLI**
  ```bash
  npm install -g @angular/cli
  ```
- **Git** for cloning the repository

The project has been developed and tested on:

- Windows 11
- Firefox
- Visual Studio Code

---

### Installing

1. **Clone the repository from GitHub:**

   ```bash
   git clone https://github.com/jontan1337/Specialisterne_Academy.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

---

### Running the application

To run the project locally:

1. Start the Angular development server:

   ```bash
   ng serve
   ```

   Alternatively add `-o` as an argument to automatically open the page in your browser and skip step 2.

2. Open your browser and navigate to:

   ```bash
   http://localhost:4200
   ```

3. The game should now be running and ready to play.
---

## Help

**Issue:** PowerShell shows an error saying scripts cannot be run due to execution policy restrictions.

Run
```powershell
Get-ExecutionPolicy
```

It might say "Restricted"

**Solution:** Run PowerShell as administrator and execute:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## Authors

- **[Jontan1337]**\
  GitHub: [@jontan1337](https://github.com/jontan1337)

---

## Version History

- **0.1**

  - Created Wordle Clone.

---

## Acknowledgments

- [Wordle](https://www.nytimes.com/games/wordle/) for the original inspiration.
- [Angular](https://angular.io/) for the frontend framework.
- ChatGPT for tips and helping relearn Angular.

---

## Missing features / Future Improvements

- Random words everyday.
- Save guess history untill each new day.
- Word validation so you can't just spam gibberish.
- High contrast.
- Toast or some visual to show when the player won or lost.