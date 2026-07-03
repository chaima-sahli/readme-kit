import { TEMPLATES } from '../data/templates';

export function templateAction(markdown) {
  // Build template options string
  const options = Object.values(TEMPLATES).map(t => 
    `${t.id}: ${t.label} - ${t.description}`
  ).join('\n');
  
  const choice = prompt(
    `📝 Choose a template:\n\n${options}\n\nEnter the template ID:`,
    'complete'
  );
  
  if (choice && TEMPLATES[choice]) {
    return markdown + '\n\n' + TEMPLATES[choice].content;
  }
  
  return markdown;
}