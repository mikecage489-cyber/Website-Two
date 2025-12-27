import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import Ad from '../../components/ads/Ad';
import ToolCard from '../../components/common/ToolCard';
import { getToolById, getRelatedTools, categoryInfo } from '../../config/tools';

// Import all tool components
import WordCounter from '../../components/tools/WordCounter';
import CharacterCounter from '../../components/tools/CharacterCounter';
import CaseConverter from '../../components/tools/CaseConverter';
import TextCleaner from '../../components/tools/TextCleaner';
import PercentageCalculator from '../../components/tools/PercentageCalculator';
import AgeCalculator from '../../components/tools/AgeCalculator';
import BMICalculator from '../../components/tools/BMICalculator';
import UnitConverter from '../../components/tools/UnitConverter';
import JSONFormatter from '../../components/tools/JSONFormatter';
import Base64Encoder from '../../components/tools/Base64Encoder';

const toolComponents: Record<string, React.ComponentType> = {
  'word-counter': WordCounter,
  'character-counter': CharacterCounter,
  'case-converter': CaseConverter,
  'text-cleaner': TextCleaner,
  'percentage-calculator': PercentageCalculator,
  'age-calculator': AgeCalculator,
  'bmi-calculator': BMICalculator,
  'unit-converter': UnitConverter,
  'json-formatter': JSONFormatter,
  'base64-encoder': Base64Encoder,
};

const toolContent: Record<string, { instructions: string; example: string; faqs: Array<{q: string; a: string}> }> = {
  'word-counter': {
    instructions: 'Simply paste or type your text into the text area. The tool will automatically count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators who need to track text statistics.',
    example: 'Paste an article, essay, or any text to see instant statistics. Use it to meet word count requirements, analyze your writing, or track document length.',
    faqs: [
      { q: 'How accurate is the word count?', a: 'Our word counter uses advanced algorithms to accurately count words by splitting text on whitespace, similar to how Microsoft Word counts words.' },
      { q: 'Does it count hyphenated words?', a: 'Yes, hyphenated words are counted as single words, following standard word counting conventions.' },
      { q: 'What is reading time based on?', a: 'Reading time is calculated based on an average reading speed of 200 words per minute, which is the standard for most adults.' },
    ]
  },
  'character-counter': {
    instructions: 'Enter or paste your text to instantly see the total character count, characters without spaces, letters, numbers, and special characters. Ideal for social media posts, meta descriptions, and text with character limits.',
    example: 'Use this tool when writing tweets (280 characters), meta descriptions (155-160 characters), or any content with character restrictions.',
    faqs: [
      { q: 'Why count characters without spaces?', a: 'Some platforms and systems count characters excluding spaces. This metric is useful for SMS messages and certain form fields.' },
      { q: 'Does it count line breaks?', a: 'Yes, line breaks and all whitespace characters are included in the total character count.' },
      { q: 'What are special characters?', a: 'Special characters include punctuation, symbols, and any character that is not a letter or number.' },
    ]
  },
  'case-converter': {
    instructions: 'Paste your text and choose from multiple case conversion options: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, or snake_case. Perfect for formatting text, code variable names, and document titles.',
    example: 'Convert "hello world" to "Hello World" for titles, or "Hello World" to "helloWorld" for JavaScript variables.',
    faqs: [
      { q: 'What is Title Case?', a: 'Title Case capitalizes the first letter of each word, commonly used for headings and titles.' },
      { q: 'When should I use camelCase?', a: 'camelCase is commonly used in programming for variable and function names, especially in JavaScript, Java, and C#.' },
      { q: 'What is snake_case?', a: 'snake_case uses underscores between words and is popular in Python, Ruby, and database naming conventions.' },
    ]
  },
  'text-cleaner': {
    instructions: 'Paste messy text with extra spaces, line breaks, or formatting issues. Choose a cleaning option to remove extra spaces, extra line breaks, trim lines, or clean all at once.',
    example: 'Clean up text copied from PDFs, emails, or web pages that often contain unwanted formatting and extra whitespace.',
    faqs: [
      { q: 'What does "Remove Extra Spaces" do?', a: 'It replaces multiple consecutive spaces with a single space, making text more readable.' },
      { q: 'What is "Trim Each Line"?', a: 'This removes leading and trailing spaces from each line while preserving the line structure.' },
      { q: 'When should I use "Clean All"?', a: 'Use "Clean All" to apply all cleaning operations at once for the most thorough text cleanup.' },
    ]
  },
  'percentage-calculator': {
    instructions: 'Choose your calculation type: find what percentage X is of Y, increase a value by a percentage, or decrease a value by a percentage. Enter your numbers and click Calculate.',
    example: 'Calculate 15% tip on a $50 bill, find a 20% discount on $100, or determine what 75 is as a percentage of 100.',
    faqs: [
      { q: 'How do I calculate percentage increase?', a: 'Select "Increase by %" mode, enter the original value and the percentage to increase by. The result will show the new value after the increase.' },
      { q: 'Can I calculate discounts?', a: 'Yes, use the "Decrease by %" mode to calculate discounts. For example, a 20% discount on $100 gives you $80.' },
      { q: 'How accurate are the results?', a: 'Results are calculated to 2 decimal places, providing accurate results for most practical applications.' },
    ]
  },
  'age-calculator': {
    instructions: 'Select your birth date using the date picker and click Calculate Age. The tool will show your exact age in years, months, days, weeks, and total days.',
    example: 'Find out exactly how old you are, calculate age for birthdays, or determine someone\'s age from their birth date.',
    faqs: [
      { q: 'How is age calculated?', a: 'Age is calculated by comparing your birth date to today\'s date, accounting for leap years and varying month lengths.' },
      { q: 'Why does it show months and days?', a: 'This provides a more precise age calculation, especially useful for babies and young children.' },
      { q: 'Can I calculate age on a specific date?', a: 'Currently, the tool calculates age as of today. A future update may include custom date selection.' },
    ]
  },
  'bmi-calculator': {
    instructions: 'Choose between metric (kg, cm) or imperial (lbs, inches) units. Enter your weight and height, then click Calculate BMI to see your Body Mass Index and health category.',
    example: 'If you weigh 70 kg and are 170 cm tall, your BMI is 24.2, which falls in the "Normal Weight" category.',
    faqs: [
      { q: 'What is a healthy BMI?', a: 'A BMI between 18.5 and 24.9 is considered normal or healthy weight. However, BMI is just one indicator and doesn\'t account for muscle mass or body composition.' },
      { q: 'Is BMI accurate for everyone?', a: 'BMI is a general indicator and may not be accurate for athletes, bodybuilders, pregnant women, or elderly individuals. Consult a healthcare professional for personalized advice.' },
      { q: 'Should I use metric or imperial?', a: 'Use whichever unit system you\'re comfortable with. The calculator handles both and provides the same BMI result.' },
    ]
  },
  'unit-converter': {
    instructions: 'Select the conversion type (Length, Weight, or Temperature), enter a value, choose your source and target units, and see instant conversion results.',
    example: 'Convert 5 kilometers to miles, 10 pounds to kilograms, or 25°C to Fahrenheit.',
    faqs: [
      { q: 'How accurate are the conversions?', a: 'Conversions use standard conversion factors and are accurate to 6 decimal places, suitable for most practical applications.' },
      { q: 'Can I convert between metric and imperial?', a: 'Yes, the tool supports both metric and imperial units for length, weight, and temperature.' },
      { q: 'What units are supported?', a: 'Length: meter, kilometer, centimeter, millimeter, mile, yard, foot, inch. Weight: kilogram, gram, milligram, pound, ounce, ton. Temperature: Celsius, Fahrenheit, Kelvin.' },
    ]
  },
  'json-formatter': {
    instructions: 'Paste your JSON data into the input field. Use Format to beautify and indent JSON, Minify to remove whitespace, or Validate to check if your JSON is valid.',
    example: 'Format messy JSON from API responses, validate JSON configuration files, or minify JSON to reduce file size.',
    faqs: [
      { q: 'What does formatting do?', a: 'Formatting adds proper indentation and line breaks to make JSON easier to read and understand.' },
      { q: 'When should I minify JSON?', a: 'Minify JSON to reduce file size when sending data over the network or storing compact JSON.' },
      { q: 'What if my JSON is invalid?', a: 'The tool will show an error message indicating what\'s wrong with your JSON, helping you fix syntax issues.' },
    ]
  },
  'base64-encoder': {
    instructions: 'Select Encode or Decode mode. For encoding, enter plain text to convert to Base64. For decoding, enter a Base64 string to convert back to plain text.',
    example: 'Encode "Hello World" to get "SGVsbG8gV29ybGQ=", or decode Base64 strings from APIs and web services.',
    faqs: [
      { q: 'What is Base64 encoding?', a: 'Base64 is a way to represent binary data in ASCII text format, commonly used for encoding images, files, and data in APIs.' },
      { q: 'Is Base64 encryption?', a: 'No, Base64 is encoding, not encryption. It\'s easily reversible and provides no security. Don\'t use it for sensitive data without proper encryption.' },
      { q: 'Where is Base64 used?', a: 'Base64 is used in email attachments, data URLs, JWT tokens, and anywhere binary data needs to be transmitted as text.' },
    ]
  },
};

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  
  if (!toolId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
        <Link to="/tools" className="text-blue-600 hover:text-blue-700">View all tools</Link>
      </div>
    );
  }

  const tool = getToolById(toolId);
  const ToolComponent = toolComponents[toolId];
  const content = toolContent[toolId];
  
  if (!tool || !ToolComponent || !content) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
        <Link to="/tools" className="text-blue-600 hover:text-blue-700">View all tools</Link>
      </div>
    );
  }

  const relatedTools = getRelatedTools(toolId);
  const category = categoryInfo[tool.category];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: content.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    }
  };

  return (
    <>
      <SEO
        title={`${tool.name} - Free Online Tool`}
        description={tool.description}
        keywords={tool.keywords}
        structuredData={structuredData}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/category/${tool.category}`} className="text-blue-600 hover:text-blue-700">
              {category.name}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{tool.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{category.icon}</span>
              <h1 className="text-4xl font-bold text-gray-900">{tool.name}</h1>
            </div>
            <p className="text-xl text-gray-600">{tool.description}</p>
          </div>

          <Ad className="mb-8" />

          {/* Tool Component */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <ToolComponent />
          </div>

          <Ad className="mb-8" />

          {/* Instructions */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-gray-700 mb-4">{content.instructions}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Example</h3>
            <p className="text-gray-700">{content.example}</p>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <Ad className="mb-8" />

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedTools.map((relatedTool) => (
                  <ToolCard key={relatedTool.id} tool={relatedTool} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
