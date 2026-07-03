export function formatAction(markdown) {
  let formatted = markdown;
  
  // Add a nice header if missing
  if (!formatted.startsWith('#')) {
    formatted = '# My Project\n\n' + formatted;
  }
  
  // Ensure proper spacing around headers
  formatted = formatted.replace(/([^\n])(\n#{1,6} )/g, '$1\n\n$2');
  
  // Ensure proper spacing around code blocks
  formatted = formatted.replace(/```(\w+)\n([\s\S]*?)```/g, (match) => {
    return '\n' + match + '\n';
  });
  
  // Remove extra blank lines (more than 2)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted;
}