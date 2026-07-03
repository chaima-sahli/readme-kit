const GREETINGS = [
  '\n\n> ✨ Welcome to the project! Feel free to contribute.',
  '\n\n> 🌟 Thanks for stopping by! Let\'s build something great.',
  '\n\n> 🚀 Happy coding! May your bugs be few.',
  '\n\n> 💡 Ideas? Feedback? Let\'s chat!',
  '\n\n> 🎯 Made with ❤️ and lots of ☕',
  '\n\n> 🌈 Open source, open heart.',
  '\n\n> 📖 Read the docs, write the code, ship the product.'
];

export function greetingAction(markdown) {
  const random = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  return markdown + random;
}