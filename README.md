# 🍬 Interactive SVG Wrapper

  > An Interactive SVG Wrapper to view SVG Elements with features including Zoom-in, Zoom-out, and Panning.


### 🤖 Features:
  - Wrap a single or multiple SVG element(s) within the wrapper component.
  - **Operations Available**: Zoom-in, Zoom-out, and Panning.


## 📝 How to Wrap - React Code Example:
  - Single SVG Element:
    ```javascript
      <SVGViewer>
        <circle cx="50" cy="25" r="20" />
      </SVGViewer>
    ```
  - Multiple SVG Elements:
    ```javascript
      <SVGViewer>
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="25" r="20" />
        </svg>
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="55" r="20" fill="grey" />
        </svg>
      </SVGViewer>
    ```

## 📅 To Do:
  - Convert the project into a package.


## 🛠 Tech Stack

- React + TypeScript
- D3.js


## 🚀 Live Demo

[Check out the live version here.](https://interactive-svg-wrapper.netlify.app/)