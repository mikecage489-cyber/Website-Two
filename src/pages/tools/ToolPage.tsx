import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { WebApplicationSchema, BreadcrumbSchema, FAQSchema } from '../../components/seo/SchemaMarkup';
import Ad from '../../components/ads/Ad';
import ToolCard from '../../components/common/ToolCard';
import CategoryIcon from '../../components/common/CategoryIcon';
import { getToolById, getRelatedTools, categoryInfo } from '../../config/tools';

// Import all tool components
import WordCounter from '../../components/tools/WordCounter';
import CharacterCounter from '../../components/tools/CharacterCounter';
import CaseConverter from '../../components/tools/CaseConverter';
import TextCleaner from '../../components/tools/TextCleaner';
import RemoveDuplicateLines from '../../components/tools/RemoveDuplicateLines';
import SortLines from '../../components/tools/SortLines';
import ReverseText from '../../components/tools/ReverseText';
import LoremIpsumGenerator from '../../components/tools/LoremIpsumGenerator';
import PalindromeChecker from '../../components/tools/PalindromeChecker';
import WordFrequencyCounter from '../../components/tools/WordFrequencyCounter';
import PercentageCalculator from '../../components/tools/PercentageCalculator';
import AgeCalculator from '../../components/tools/AgeCalculator';
import BMICalculator from '../../components/tools/BMICalculator';
import TipCalculator from '../../components/tools/TipCalculator';
import DiscountCalculator from '../../components/tools/DiscountCalculator';
import CompoundInterestCalculator from '../../components/tools/CompoundInterestCalculator';
import GradeCalculator from '../../components/tools/GradeCalculator';
import GPACalculator from '../../components/tools/GPACalculator';
import DateCalculator from '../../components/tools/DateCalculator';
import UnitConverter from '../../components/tools/UnitConverter';
import RGBToHEX from '../../components/tools/RGBToHEX';
import HEXToRGB from '../../components/tools/HEXToRGB';
import BinaryDecimalConverter from '../../components/tools/BinaryDecimalConverter';
import TimestampConverter from '../../components/tools/TimestampConverter';
import RomanNumeralConverter from '../../components/tools/RomanNumeralConverter';
import JSONFormatter from '../../components/tools/JSONFormatter';
import Base64Encoder from '../../components/tools/Base64Encoder';
import URLEncoder from '../../components/tools/URLEncoder';
import HTMLEncoder from '../../components/tools/HTMLEncoder';
import MD5HashGenerator from '../../components/tools/MD5HashGenerator';
import UUIDGenerator from '../../components/tools/UUIDGenerator';
import ColorPicker from '../../components/tools/ColorPicker';
import CSSMinifier from '../../components/tools/CSSMinifier';
import JavaScriptMinifier from '../../components/tools/JavaScriptMinifier';
import MetaTagChecker from '../../components/tools/MetaTagChecker';
import SlugGenerator from '../../components/tools/SlugGenerator';
import KeywordDensityChecker from '../../components/tools/KeywordDensityChecker';
import OpenGraphGenerator from '../../components/tools/OpenGraphGenerator';
// PDF Tools
import MergePDF from '../../components/tools/MergePDF';
import SplitPDF from '../../components/tools/SplitPDF';
import RemovePDFPages from '../../components/tools/RemovePDFPages';
import ExtractPDFPages from '../../components/tools/ExtractPDFPages';
import OrganizePDF from '../../components/tools/OrganizePDF';
import ScanToPDF from '../../components/tools/ScanToPDF';
import CompressPDF from '../../components/tools/CompressPDF';
import RepairPDF from '../../components/tools/RepairPDF';
import OCRPDF from '../../components/tools/OCRPDF';
import JPGToPDF from '../../components/tools/JPGToPDF';
import WordToPDF from '../../components/tools/WordToPDF';
import PowerPointToPDF from '../../components/tools/PowerPointToPDF';
import ExcelToPDF from '../../components/tools/ExcelToPDF';
import HTMLToPDF from '../../components/tools/HTMLToPDF';
import PDFToJPG from '../../components/tools/PDFToJPG';
import PDFToWord from '../../components/tools/PDFToWord';
import PDFToPowerPoint from '../../components/tools/PDFToPowerPoint';
import PDFToExcel from '../../components/tools/PDFToExcel';
import PDFToPDFA from '../../components/tools/PDFToPDFA';
import RotatePDF from '../../components/tools/RotatePDF';
import AddPageNumbers from '../../components/tools/AddPageNumbers';
import AddWatermark from '../../components/tools/AddWatermark';
import CropPDF from '../../components/tools/CropPDF';
import EditPDF from '../../components/tools/EditPDF';
import UnlockPDF from '../../components/tools/UnlockPDF';
import ProtectPDF from '../../components/tools/ProtectPDF';
import SignPDF from '../../components/tools/SignPDF';
import RedactPDF from '../../components/tools/RedactPDF';
import ComparePDF from '../../components/tools/ComparePDF';

const toolComponents: Record<string, React.ComponentType> = {
  'word-counter': WordCounter,
  'character-counter': CharacterCounter,
  'case-converter': CaseConverter,
  'text-cleaner': TextCleaner,
  'remove-duplicate-lines': RemoveDuplicateLines,
  'sort-lines': SortLines,
  'reverse-text': ReverseText,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'palindrome-checker': PalindromeChecker,
  'word-frequency-counter': WordFrequencyCounter,
  'percentage-calculator': PercentageCalculator,
  'age-calculator': AgeCalculator,
  'bmi-calculator': BMICalculator,
  'tip-calculator': TipCalculator,
  'discount-calculator': DiscountCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'grade-calculator': GradeCalculator,
  'gpa-calculator': GPACalculator,
  'date-calculator': DateCalculator,
  'unit-converter': UnitConverter,
  'rgb-to-hex': RGBToHEX,
  'hex-to-rgb': HEXToRGB,
  'binary-decimal-converter': BinaryDecimalConverter,
  'timestamp-converter': TimestampConverter,
  'roman-numeral-converter': RomanNumeralConverter,
  'json-formatter': JSONFormatter,
  'base64-encoder': Base64Encoder,
  'url-encoder': URLEncoder,
  'html-encoder': HTMLEncoder,
  'md5-hash-generator': MD5HashGenerator,
  'uuid-generator': UUIDGenerator,
  'color-picker': ColorPicker,
  'css-minifier': CSSMinifier,
  'javascript-minifier': JavaScriptMinifier,
  'meta-tag-checker': MetaTagChecker,
  'slug-generator': SlugGenerator,
  'keyword-density-checker': KeywordDensityChecker,
  'open-graph-generator': OpenGraphGenerator,
  // PDF Tools
  'merge-pdf': MergePDF,
  'split-pdf': SplitPDF,
  'remove-pdf-pages': RemovePDFPages,
  'extract-pdf-pages': ExtractPDFPages,
  'organize-pdf': OrganizePDF,
  'scan-to-pdf': ScanToPDF,
  'compress-pdf': CompressPDF,
  'repair-pdf': RepairPDF,
  'ocr-pdf': OCRPDF,
  'jpg-to-pdf': JPGToPDF,
  'word-to-pdf': WordToPDF,
  'powerpoint-to-pdf': PowerPointToPDF,
  'excel-to-pdf': ExcelToPDF,
  'html-to-pdf': HTMLToPDF,
  'pdf-to-jpg': PDFToJPG,
  'pdf-to-word': PDFToWord,
  'pdf-to-powerpoint': PDFToPowerPoint,
  'pdf-to-excel': PDFToExcel,
  'pdf-to-pdfa': PDFToPDFA,
  'rotate-pdf': RotatePDF,
  'add-page-numbers': AddPageNumbers,
  'add-watermark': AddWatermark,
  'crop-pdf': CropPDF,
  'edit-pdf': EditPDF,
  'unlock-pdf': UnlockPDF,
  'protect-pdf': ProtectPDF,
  'sign-pdf': SignPDF,
  'redact-pdf': RedactPDF,
  'compare-pdf': ComparePDF,
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
  // New Text Tools Content
  'remove-duplicate-lines': {
    instructions: 'Paste text with duplicate lines and optionally enable case-sensitive matching. The tool will remove all duplicate lines while preserving unique content.',
    example: 'Clean up lists, log files, or any text data where duplicate lines need to be removed.',
    faqs: [
      { q: 'What is case-sensitive matching?', a: 'When enabled, "Hello" and "hello" are treated as different lines. When disabled, they are considered duplicates.' },
      { q: 'Does it preserve order?', a: 'Yes, the tool preserves the original order of lines while removing duplicates.' },
      { q: 'Can it handle large files?', a: 'Yes, the tool can process thousands of lines efficiently in your browser.' },
    ]
  },
  'sort-lines': {
    instructions: 'Enter text with multiple lines and choose sorting order (A-Z or Z-A) and case sensitivity options.',
    example: 'Sort lists, organize data, or arrange names alphabetically.',
    faqs: [
      { q: 'What is the difference between case-sensitive and case-insensitive?', a: 'Case-sensitive treats "Apple" and "apple" as different. Case-insensitive treats them the same.' },
      { q: 'Can I sort numbers?', a: 'Yes, but they will be sorted as text (e.g., "10" comes before "2").' },
      { q: 'Is the original text modified?', a: 'No, your original text remains unchanged. The sorted result appears in a separate output area.' },
    ]
  },
  'reverse-text': {
    instructions: 'Enter text and choose to reverse by characters, words, or lines.',
    example: 'Create palindromes, mirror text for artistic purposes, or reverse data for processing.',
    faqs: [
      { q: 'What does reverse by characters do?', a: 'It reverses the entire text character by character: "Hello" becomes "olleH".' },
      { q: 'What about reverse by words?', a: 'It reverses word order: "Hello World" becomes "World Hello".' },
      { q: 'When would I use reverse by lines?', a: 'Useful for reversing the order of list items or paragraphs.' },
    ]
  },
  'lorem-ipsum-generator': {
    instructions: 'Select the number of paragraphs you need (1-10) and click generate to create Lorem Ipsum placeholder text.',
    example: 'Perfect for designers and developers who need dummy text for mockups, templates, and testing.',
    faqs: [
      { q: 'What is Lorem Ipsum?', a: 'Lorem Ipsum is dummy text used in publishing and design to fill space and demonstrate layout without relying on meaningful content.' },
      { q: 'Is this the original Lorem Ipsum?', a: 'Yes, it uses the classic Lorem Ipsum text that has been the industry standard since the 1500s.' },
      { q: 'Can I use this commercially?', a: 'Yes, Lorem Ipsum is public domain and can be used freely in any project.' },
    ]
  },
  'palindrome-checker': {
    instructions: 'Enter text and configure options to ignore spaces, punctuation, or case when checking for palindromes.',
    example: 'Check classic palindromes like "A man a plan a canal Panama" or "racecar".',
    faqs: [
      { q: 'What is a palindrome?', a: 'A palindrome is a word, phrase, or sequence that reads the same forwards and backwards.' },
      { q: 'Why ignore spaces and punctuation?', a: 'Many palindromic phrases contain spaces and punctuation that should be ignored for accurate detection.' },
      { q: 'Can I check multiple words?', a: 'Yes, you can check entire phrases and sentences for palindromic properties.' },
    ]
  },
  'word-frequency-counter': {
    instructions: 'Paste your text content and click analyze to see word frequency statistics sorted by occurrence.',
    example: 'Analyze content for SEO, find commonly used terms, or study writing patterns.',
    faqs: [
      { q: 'How is frequency calculated?', a: 'Frequency shows how many times each word appears as a percentage of total words.' },
      { q: 'Does it count short words?', a: 'By default, words with 2 or fewer characters are excluded to focus on meaningful content.' },
      { q: 'Can I use this for SEO?', a: 'Yes, it helps identify keyword usage and avoid overuse (keyword stuffing).' },
    ]
  },
  // New Calculator Tools Content
  'tip-calculator': {
    instructions: 'Enter the bill amount, select or enter a tip percentage, and optionally specify number of people to split the bill.',
    example: 'Calculate a 15% tip on a $50 bill, or split a $100 bill with 20% tip among 4 people.',
    faqs: [
      { q: 'What is a standard tip percentage?', a: 'In the US, 15-20% is standard for good service, 10-15% for average service.' },
      { q: 'Does it handle bill splitting?', a: 'Yes, enter the number of people and it will show the amount per person including tip.' },
      { q: 'Can I enter a custom tip percentage?', a: 'Yes, you can use preset buttons or enter any custom percentage.' },
    ]
  },
  'discount-calculator': {
    instructions: 'Enter the original price and discount percentage to calculate the final price and savings.',
    example: 'Calculate the final price of a $100 item with a 25% discount (answer: $75).',
    faqs: [
      { q: 'How is discount calculated?', a: 'Discount amount = Original Price × (Discount % / 100). Final Price = Original Price - Discount Amount.' },
      { q: 'Can I calculate multiple discounts?', a: 'For stacked discounts, apply them one at a time using the result as the new original price.' },
      { q: 'What if I know the final price?', a: 'You can work backwards by trying different percentages to find the discount rate.' },
    ]
  },
  'compound-interest-calculator': {
    instructions: 'Enter principal amount, annual interest rate, time period in years, and compounding frequency.',
    example: 'Calculate returns on a $10,000 investment at 5% annual interest compounded monthly over 10 years.',
    faqs: [
      { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods.' },
      { q: 'Which frequency is best?', a: 'More frequent compounding (daily or monthly) results in slightly higher returns than annual compounding.' },
      { q: 'Is this accurate for investments?', a: 'This calculator assumes fixed interest rates. Real investments have variable rates and other factors.' },
    ]
  },
  'grade-calculator': {
    instructions: 'Enter scores and their weights (e.g., exam 40%, homework 30%, project 30%). Add as many items as needed.',
    example: 'Calculate final grade from 3 exams with different weights to determine your overall score.',
    faqs: [
      { q: 'What is weighted grading?', a: 'Weighted grading gives different importance to different assignments based on their weight percentage.' },
      { q: 'Do weights need to add up to 100%?', a: 'No, the calculator handles any total weight and calculates proportionally.' },
      { q: 'What grade scale is used?', a: 'Standard A-F grading: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).' },
    ]
  },
  'gpa-calculator': {
    instructions: 'Enter letter grades and credit hours for each course. Select 4.0 or 5.0 GPA scale.',
    example: 'Calculate semester or cumulative GPA from multiple courses with different credit hours.',
    faqs: [
      { q: 'What is the difference between 4.0 and 5.0 scale?', a: '5.0 scale is weighted for honors/AP courses. 4.0 is standard unweighted scale.' },
      { q: 'What letter grades are supported?', a: 'A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, and F are all supported.' },
      { q: 'How do I calculate cumulative GPA?', a: 'Include all courses from all semesters to calculate your overall GPA.' },
    ]
  },
  'date-calculator': {
    instructions: 'Select start and end dates to calculate the difference in days, weeks, months, and years.',
    example: 'Find out how many days until your birthday, anniversary, or project deadline.',
    faqs: [
      { q: 'How is the calculation done?', a: 'The calculator accounts for varying month lengths and leap years for accurate results.' },
      { q: 'Can I calculate past dates?', a: 'Yes, you can calculate the difference between any two dates, past or future.' },
      { q: 'What is the maximum date range?', a: 'You can calculate differences spanning decades or even centuries.' },
    ]
  },
  // New Converter Tools Content
  'rgb-to-hex': {
    instructions: 'Enter RGB values (0-255 for each color channel) and convert to HEX color code.',
    example: 'Convert RGB(255, 0, 0) to #FF0000 (red) for use in CSS or design tools.',
    faqs: [
      { q: 'What is RGB?', a: 'RGB stands for Red, Green, Blue - the three primary colors used in digital displays.' },
      { q: 'What is HEX?', a: 'HEX is a hexadecimal color format commonly used in web design and CSS.' },
      { q: 'What range is valid for RGB?', a: 'Each color channel (R, G, B) accepts values from 0 to 255.' },
    ]
  },
  'hex-to-rgb': {
    instructions: 'Enter a HEX color code (with or without #) to convert to RGB values.',
    example: 'Convert #FF5733 to RGB(255, 87, 51) for use in design applications.',
    faqs: [
      { q: 'Do I need the # symbol?', a: 'No, you can enter with or without the # symbol. Both formats work.' },
      { q: 'Can I use 3-digit HEX codes?', a: 'Yes, shorthand HEX codes like #F00 are automatically expanded to #FF0000.' },
      { q: 'Where can I use RGB values?', a: 'RGB values are used in CSS, design software, and many programming languages.' },
    ]
  },
  'binary-decimal-converter': {
    instructions: 'Choose conversion mode and enter either a binary number (0s and 1s) or decimal number.',
    example: 'Convert binary 1010 to decimal 10, or decimal 42 to binary 101010.',
    faqs: [
      { q: 'What is binary?', a: 'Binary is a base-2 number system using only 0 and 1, the foundation of all digital computing.' },
      { q: 'What range of numbers can I convert?', a: 'You can convert any positive integer, though very large numbers may take a moment to process.' },
      { q: 'Why is binary important?', a: 'Binary is how computers store and process all information at the hardware level.' },
    ]
  },
  'timestamp-converter': {
    instructions: 'Convert Unix timestamps to readable dates or convert dates to Unix timestamps.',
    example: 'Convert 1640000000 to a readable date, or select a date to get its timestamp.',
    faqs: [
      { q: 'What is a Unix timestamp?', a: 'A Unix timestamp is the number of seconds since January 1, 1970 00:00:00 UTC.' },
      { q: 'Does it handle milliseconds?', a: 'Yes, the tool automatically detects and handles both second and millisecond timestamps.' },
      { q: 'What timezone is used?', a: 'The tool uses your local timezone for date display.' },
    ]
  },
  'roman-numeral-converter': {
    instructions: 'Convert between Roman numerals (I, V, X, L, C, D, M) and Arabic numbers (1-3999).',
    example: 'Convert 1994 to MCMXCIV or vice versa.',
    faqs: [
      { q: 'What is the valid range?', a: 'Roman numerals from 1 to 3999 are supported (I to MMMCMXCIX).' },
      { q: 'Are lowercase Roman numerals accepted?', a: 'Yes, both uppercase and lowercase Roman numerals are accepted for conversion.' },
      { q: 'How do subtractive combinations work?', a: 'IV = 4 (5-1), IX = 9 (10-1), XL = 40 (50-10), etc. The tool handles all standard combinations.' },
    ]
  },
  // New Developer Tools Content
  'url-encoder': {
    instructions: 'Select encode or decode mode. Paste URL or text to encode/decode special characters for safe transmission.',
    example: 'Encode "Hello World!" to "Hello%20World%21" for use in URLs.',
    faqs: [
      { q: 'When should I encode URLs?', a: 'Encode URLs when passing data in query strings or when URLs contain special characters.' },
      { q: 'What is percent encoding?', a: 'Percent encoding replaces unsafe characters with % followed by hexadecimal values.' },
      { q: 'Is this the same as Base64?', a: 'No, URL encoding is different from Base64. Use URL encoding for URLs, Base64 for data transmission.' },
    ]
  },
  'html-encoder': {
    instructions: 'Encode HTML special characters for safe display in browsers or decode HTML entities back to readable text.',
    example: 'Encode "<div>" to "&lt;div&gt;" to display HTML code on a web page.',
    faqs: [
      { q: 'What are HTML entities?', a: 'HTML entities are special character representations like &lt; for < and &amp; for &.' },
      { q: 'When should I encode HTML?', a: 'Always encode user input before displaying it in HTML to prevent XSS attacks.' },
      { q: 'Does it handle all special characters?', a: 'It handles common characters including <, >, &, ", and apostrophes.' },
    ]
  },
  'md5-hash-generator': {
    instructions: 'Enter text to generate a SHA-256 hash (displayed instead of MD5 for better security).',
    example: 'Generate hash for "password" to verify data integrity or create checksums.',
    faqs: [
      { q: 'Why SHA-256 instead of MD5?', a: 'MD5 is cryptographically broken. SHA-256 is secure and recommended for modern applications.' },
      { q: 'Can I reverse the hash?', a: 'No, hashing is one-way. You cannot recover the original text from a hash.' },
      { q: 'What is this used for?', a: 'Hashing is used for password storage, file integrity verification, and digital signatures.' },
    ]
  },
  'uuid-generator': {
    instructions: 'Specify how many UUIDs to generate (1-100) and click generate for Version 4 (random) UUIDs.',
    example: 'Generate unique identifiers for database records, API keys, or tracking codes.',
    faqs: [
      { q: 'What is a UUID?', a: 'UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information.' },
      { q: 'Are UUIDs guaranteed unique?', a: 'While not 100% guaranteed, UUID v4 collision probability is astronomically low in practice.' },
      { q: 'What format is used?', a: 'Standard UUID format: 8-4-4-4-12 hexadecimal digits (e.g., 550e8400-e29b-41d4-a716-446655440000).' },
    ]
  },
  'color-picker': {
    instructions: 'Use the color picker to select a color and instantly get HEX, RGB, and HSL values.',
    example: 'Pick a color and copy its code for use in CSS, design tools, or documentation.',
    faqs: [
      { q: 'What is HSL?', a: 'HSL (Hue, Saturation, Lightness) is a color model that is often more intuitive than RGB.' },
      { q: 'Can I enter a color code?', a: 'Yes, most browsers allow you to paste HEX codes directly into the color picker.' },
      { q: 'Which format should I use?', a: 'HEX is most common for CSS, RGB for JavaScript/design tools, HSL for dynamic color manipulation.' },
    ]
  },
  'css-minifier': {
    instructions: 'Paste CSS code and click minify to remove comments, whitespace, and compress the code.',
    example: 'Reduce CSS file size from 50KB to 35KB by removing unnecessary characters.',
    faqs: [
      { q: 'Why minify CSS?', a: 'Minification reduces file size, resulting in faster page load times and reduced bandwidth usage.' },
      { q: 'Will it break my CSS?', a: 'No, minification only removes unnecessary characters while preserving functionality.' },
      { q: 'Should I minify in production?', a: 'Yes, always minify CSS for production. Keep original files for development.' },
    ]
  },
  'javascript-minifier': {
    instructions: 'Paste JavaScript code and click minify to remove comments and excess whitespace.',
    example: 'Compress JavaScript files to improve website loading speed and performance.',
    faqs: [
      { q: 'Is this the same as uglifying?', a: 'This is basic minification. Uglification also renames variables for additional compression.' },
      { q: 'Will it affect functionality?', a: 'No, minification preserves all functionality while reducing file size.' },
      { q: 'Can I minify ES6+ code?', a: 'This basic minifier works with ES6+ but advanced optimizations may require specialized tools.' },
    ]
  },
  // New SEO Tools Content
  'meta-tag-checker': {
    instructions: 'Enter your page title and meta description to check their lengths against SEO best practices.',
    example: 'Optimize your meta tags to ensure they display correctly in search results.',
    faqs: [
      { q: 'What is the ideal title length?', a: 'Aim for 50-60 characters. Longer titles get truncated in search results.' },
      { q: 'What about meta descriptions?', a: 'Keep descriptions between 150-160 characters for optimal display in search results.' },
      { q: 'Why does length matter?', a: 'Search engines truncate long tags, potentially cutting off important information.' },
    ]
  },
  'slug-generator': {
    instructions: 'Enter a title or text and generate an SEO-friendly URL slug with customizable separators.',
    example: 'Convert "Best SEO Tips 2024!" to "best-seo-tips-2024" for use in URLs.',
    faqs: [
      { q: 'What is a URL slug?', a: 'A slug is the part of a URL that identifies a page in human-readable form, typically derived from the page title.' },
      { q: 'Should I use hyphens or underscores?', a: 'Google recommends hyphens (-) as word separators in URLs over underscores (_).' },
      { q: 'Can I edit the generated slug?', a: 'Yes, you can copy and modify the generated slug as needed for your specific use case.' },
    ]
  },
  'keyword-density-checker': {
    instructions: 'Paste your content to analyze keyword usage and density percentages for SEO optimization.',
    example: 'Check if you are over-using keywords (keyword stuffing) or under-utilizing important terms.',
    faqs: [
      { q: 'What is ideal keyword density?', a: 'Aim for 1-2% density for main keywords. Over 3% may be considered keyword stuffing by search engines.' },
      { q: 'Should I optimize for keyword density?', a: 'Focus on natural, readable content first. Use density as a guide, not a strict rule.' },
      { q: 'What about semantic variations?', a: 'Modern SEO values semantic variations and related terms over exact keyword matching.' },
    ]
  },
  'open-graph-generator': {
    instructions: 'Fill in your page details (title, description, image, etc.) to generate Open Graph meta tags for social media.',
    example: 'Create rich social media previews for Facebook, LinkedIn, and other platforms.',
    faqs: [
      { q: 'What is Open Graph?', a: 'Open Graph is a protocol that enables any web page to become a rich object in social media.' },
      { q: 'Do I need all fields?', a: 'Title and description are essential. Image, URL, and other fields are recommended for best results.' },
      { q: 'Will this work on Twitter?', a: 'Twitter uses its own Card tags, but Open Graph tags work as a fallback.' },
    ]
  },
  // PDF Tools Content
  'merge-pdf': {
    instructions: 'Upload two or more PDF files and click "Merge & Download" to combine them into a single document. Files will be merged in the order they appear.',
    example: 'Combine multiple reports, invoices, or documents into one PDF file for easier sharing and organization.',
    faqs: [
      { q: 'Can I change the order of files?', a: 'Yes, use the X button to remove files and re-upload them in your preferred order.' },
      { q: 'Is there a limit on file size?', a: 'Each file can be up to 50MB. You can merge as many files as needed.' },
      { q: 'Are my files uploaded to a server?', a: 'No, all processing happens in your browser. Your files never leave your device.' },
    ]
  },
  'split-pdf': {
    instructions: 'Upload a PDF file to split it into individual pages. Each page will be downloaded as a separate PDF file.',
    example: 'Extract individual pages from a large document, separate chapters, or create single-page PDFs from a multi-page file.',
    faqs: [
      { q: 'Will all pages be downloaded at once?', a: 'Yes, but downloads are staggered slightly to prevent browser issues with multiple downloads.' },
      { q: 'Can I split only specific pages?', a: 'This tool splits all pages. Use "Extract PDF Pages" to select specific pages.' },
      { q: 'What format are the output files?', a: 'Each output file is a valid PDF containing a single page from the original document.' },
    ]
  },
  'remove-pdf-pages': {
    instructions: 'Upload a PDF and specify which pages to remove. The tool will create a new PDF without those pages.',
    example: 'Remove cover pages, blank pages, or unwanted sections from your PDF documents.',
    faqs: [
      { q: 'Can I remove multiple pages at once?', a: 'Yes, you can select multiple pages to remove in a single operation.' },
      { q: 'Does this modify the original file?', a: 'No, a new PDF is created. Your original file remains unchanged.' },
      { q: 'Is the process reversible?', a: 'Keep your original file as a backup. Once pages are removed from the new file, they cannot be recovered from it.' },
    ]
  },
  'extract-pdf-pages': {
    instructions: 'Upload a PDF and select specific pages to extract into a new document.',
    example: 'Extract important pages, create excerpts, or pull out specific sections from a large PDF.',
    faqs: [
      { q: 'Can I extract non-consecutive pages?', a: 'Yes, you can select any pages you want, in any order.' },
      { q: 'How is this different from Split PDF?', a: 'Split creates individual files for each page. Extract creates one file with only your selected pages.' },
      { q: 'Will page numbers be preserved?', a: 'The extracted pages will be renumbered starting from 1 in the new document.' },
    ]
  },
  'organize-pdf': {
    instructions: 'Upload a PDF to reorder, rotate, or organize pages according to your needs.',
    example: 'Fix page order, rotate scanned documents, or rearrange sections in your PDF.',
    faqs: [
      { q: 'Can I rotate individual pages?', a: 'Yes, you can rotate each page independently or all pages at once.' },
      { q: 'Can I duplicate pages?', a: 'This tool focuses on reordering and rotation. Use Merge PDF to duplicate pages.' },
      { q: 'Will the file size change?', a: 'File size should remain similar unless you remove pages.' },
    ]
  },
  'scan-to-pdf': {
    instructions: 'Upload scanned images (JPG, PNG) to convert them into a PDF document. Multiple images can be combined into one PDF.',
    example: 'Convert scanned receipts, contracts, or photos into PDF format for digital storage.',
    faqs: [
      { q: 'What image formats are supported?', a: 'JPG, JPEG, and PNG formats are supported.' },
      { q: 'Will image quality be preserved?', a: 'Yes, images are embedded in the PDF without additional compression.' },
      { q: 'Can I combine multiple scans?', a: 'Yes, upload multiple images and they will be combined into a single multi-page PDF.' },
    ]
  },
  'compress-pdf': {
    instructions: 'Upload a PDF file to reduce its file size while maintaining reasonable quality. Ideal for sharing via email or uploading to websites.',
    example: 'Reduce a 10MB PDF to 5MB or less for easier sharing and faster uploads.',
    faqs: [
      { q: 'How much compression can I expect?', a: 'Compression results vary. PDFs with images typically compress 20-40%. Text-heavy PDFs may see less reduction.' },
      { q: 'Will quality be affected?', a: 'Some quality loss may occur, especially with images. The tool balances size reduction with quality preservation.' },
      { q: 'Can I compress already compressed PDFs?', a: 'Yes, but you may not see significant additional size reduction.' },
    ]
  },
  'repair-pdf': {
    instructions: 'Upload a corrupted or damaged PDF file to attempt recovery and repair.',
    example: 'Fix PDFs that won\'t open, have rendering issues, or were damaged during transfer.',
    faqs: [
      { q: 'Can all corrupted PDFs be repaired?', a: 'Not all damage can be repaired. Success depends on the type and extent of corruption.' },
      { q: 'What types of issues can be fixed?', a: 'Common fixes include header corruption, missing EOF markers, and structural inconsistencies.' },
      { q: 'Is my data safe?', a: 'Yes, repairs are attempted on a copy. Your original file is never modified.' },
    ]
  },
  'ocr-pdf': {
    instructions: 'Upload a scanned PDF to convert it to searchable text using Optical Character Recognition (OCR).',
    example: 'Make scanned documents searchable, convert scanned books to editable text, or digitize printed documents.',
    faqs: [
      { q: 'What languages are supported?', a: 'OCR typically supports major languages including English, Spanish, French, German, and more.' },
      { q: 'How accurate is OCR?', a: 'Accuracy depends on image quality. Clear, high-resolution scans yield best results.' },
      { q: 'Can I edit the recognized text?', a: 'The output PDF will have a searchable text layer. Use "PDF to Word" for full editing capability.' },
    ]
  },
  'jpg-to-pdf': {
    instructions: 'Upload JPG, JPEG, or PNG images to convert them into PDF format. Multiple images can be combined into one PDF or converted individually.',
    example: 'Convert photos, screenshots, or graphics to PDF for professional documents or portfolios.',
    faqs: [
      { q: 'What is the difference between JPG and PNG?', a: 'JPG is compressed (smaller files), PNG supports transparency. Both can be converted to PDF.' },
      { q: 'Will images be resized?', a: 'Images maintain their original dimensions and aspect ratio in the PDF.' },
      { q: 'Can I adjust image order?', a: 'Images are added in the order you select them. Remove and re-add to reorder.' },
    ]
  },
  'word-to-pdf': {
    instructions: 'Upload Word documents (.doc, .docx) to convert them to PDF format while preserving formatting.',
    example: 'Convert reports, resumes, or documents to PDF for professional sharing and printing.',
    faqs: [
      { q: 'Will formatting be preserved?', a: 'Basic formatting like fonts, colors, and layouts are preserved. Complex elements may need adjustment.' },
      { q: 'Are both .doc and .docx supported?', a: 'Yes, both older .doc and newer .docx formats are supported.' },
      { q: 'What about embedded images?', a: 'Images embedded in Word documents are included in the PDF output.' },
    ]
  },
  'powerpoint-to-pdf': {
    instructions: 'Upload PowerPoint presentations (.ppt, .pptx) to convert them to PDF format.',
    example: 'Share presentations as PDFs to ensure consistent viewing across all devices.',
    faqs: [
      { q: 'Will animations be preserved?', a: 'No, PDFs are static. Animations and transitions will not be included.' },
      { q: 'What about slide notes?', a: 'Typically only the slide content is exported. Speaker notes are not included by default.' },
      { q: 'Can I convert multiple presentations?', a: 'Upload one presentation at a time. Each creates a separate PDF.' },
    ]
  },
  'excel-to-pdf': {
    instructions: 'Upload Excel spreadsheets (.xls, .xlsx) to convert them to PDF format.',
    example: 'Share reports, charts, or data tables as PDFs for easy viewing without Excel.',
    faqs: [
      { q: 'Will all sheets be included?', a: 'Typically all visible sheets are converted. Hidden sheets may not be included.' },
      { q: 'How are large spreadsheets handled?', a: 'Large sheets may span multiple pages in the PDF.' },
      { q: 'Are formulas preserved?', a: 'Only the calculated values are shown. Formulas are not active in PDF format.' },
    ]
  },
  'html-to-pdf': {
    instructions: 'Upload HTML files to convert them to PDF format, preserving layout and styling.',
    example: 'Save web pages, HTML emails, or reports as PDFs for archiving or printing.',
    faqs: [
      { q: 'Will CSS styling be applied?', a: 'Yes, inline and embedded CSS is generally preserved in the conversion.' },
      { q: 'What about external resources?', a: 'External images and stylesheets may not load if not accessible from your device.' },
      { q: 'Can I convert live web pages?', a: 'This tool works with HTML files. Use browser "Print to PDF" for live web pages.' },
    ]
  },
  'pdf-to-jpg': {
    instructions: 'Upload a PDF to convert its pages to JPG, PNG, or other image formats.',
    example: 'Extract images from PDFs, create thumbnails, or convert documents to image format.',
    faqs: [
      { q: 'What image format should I choose?', a: 'JPG for photos/complex images (smaller files), PNG for text/diagrams (better quality).' },
      { q: 'What resolution will the images be?', a: 'Images are typically generated at screen resolution (96 DPI) or higher for quality.' },
      { q: 'Can I convert specific pages only?', a: 'All pages are converted. Use "Extract PDF Pages" first if you need specific pages.' },
    ]
  },
  'pdf-to-word': {
    instructions: 'Upload a PDF to convert it to an editable Word document (.docx).',
    example: 'Convert PDFs to Word for editing text, updating content, or reusing document content.',
    faqs: [
      { q: 'Will formatting be perfect?', a: 'Basic formatting is preserved. Complex layouts may require manual adjustment.' },
      { q: 'Can scanned PDFs be converted?', a: 'For best results, use OCR PDF first to make scanned documents searchable.' },
      { q: 'What about images?', a: 'Images are typically included in the Word document.' },
    ]
  },
  'pdf-to-powerpoint': {
    instructions: 'Upload a PDF to convert it to an editable PowerPoint presentation (.pptx).',
    example: 'Convert PDF presentations back to PowerPoint for editing or repurposing.',
    faqs: [
      { q: 'How are pages mapped to slides?', a: 'Typically each PDF page becomes one PowerPoint slide.' },
      { q: 'Can I edit the converted presentation?', a: 'Yes, the output is a fully editable PowerPoint file.' },
      { q: 'Will text be editable?', a: 'Text editability depends on the original PDF. Scanned PDFs may convert as images.' },
    ]
  },
  'pdf-to-excel': {
    instructions: 'Upload a PDF containing tables to convert it to an Excel spreadsheet (.xlsx).',
    example: 'Extract data tables from PDF reports for analysis in Excel.',
    faqs: [
      { q: 'Does it work with all PDFs?', a: 'Best results with PDFs containing clear table structures. Complex layouts may need manual cleanup.' },
      { q: 'Will formulas be recreated?', a: 'No, only values are extracted. You will need to recreate formulas in Excel.' },
      { q: 'What if my PDF has multiple tables?', a: 'Multiple tables may be placed on separate sheets or require manual separation.' },
    ]
  },
  'pdf-to-pdfa': {
    instructions: 'Upload a PDF to convert it to PDF/A format, an ISO-standardized version for long-term archiving.',
    example: 'Create archive-compliant PDFs for legal documents, records, or long-term storage.',
    faqs: [
      { q: 'What is PDF/A?', a: 'PDF/A is a specialized PDF format designed for electronic document archiving and long-term preservation.' },
      { q: 'Why use PDF/A?', a: 'PDF/A ensures documents remain readable for decades by embedding all necessary resources.' },
      { q: 'Are there different PDF/A levels?', a: 'Yes, PDF/A-1, PDF/A-2, and PDF/A-3 exist. This tool typically creates PDF/A-2.' },
    ]
  },
  'rotate-pdf': {
    instructions: 'Upload a PDF and choose a rotation angle (90°, 180°, or 270°) to rotate all pages.',
    example: 'Fix scanned documents that are sideways, correct orientation, or prepare documents for printing.',
    faqs: [
      { q: 'Can I rotate individual pages?', a: 'This tool rotates all pages by the same amount. Use "Organize PDF" for individual page rotation.' },
      { q: 'Is rotation permanent?', a: 'The rotation is saved in the new PDF. Your original file is not modified.' },
      { q: 'Which rotation should I choose?', a: '90° for portrait to landscape (or vice versa), 180° to flip upside down, 270° for counter-rotation.' },
    ]
  },
  'add-page-numbers': {
    instructions: 'Upload a PDF to add customizable page numbers with options for position, format, and starting number.',
    example: 'Add page numbers to reports, manuscripts, or documents for professional presentation.',
    faqs: [
      { q: 'Can I choose where numbers appear?', a: 'Yes, typically you can place numbers at top/bottom and left/center/right positions.' },
      { q: 'Can I start numbering from a specific page?', a: 'Yes, you can choose which page to start numbering and what number to start with.' },
      { q: 'What number formats are available?', a: 'Common formats include: 1,2,3 | i,ii,iii | a,b,c | Page 1 of N.' },
    ]
  },
  'add-watermark': {
    instructions: 'Upload a PDF to add text or image watermarks for copyright protection or document identification.',
    example: 'Add "CONFIDENTIAL", "DRAFT", company logos, or copyright notices to your PDFs.',
    faqs: [
      { q: 'Can watermarks be removed?', a: 'Watermarks can be difficult to remove completely, especially when applied properly.' },
      { q: 'Will watermarks affect readability?', a: 'You can adjust opacity and position to minimize impact on document readability.' },
      { q: 'Can I use my logo?', a: 'Yes, you can upload an image file to use as a watermark.' },
    ]
  },
  'crop-pdf': {
    instructions: 'Upload a PDF to crop pages and remove unwanted margins or content around the edges.',
    example: 'Remove white space, trim pages to size, or crop to specific dimensions for printing.',
    faqs: [
      { q: 'Can I crop each page differently?', a: 'Tools vary. Some apply the same crop to all pages, others allow per-page cropping.' },
      { q: 'Will cropped content be recoverable?', a: 'No, cropped areas are removed from the new PDF and cannot be recovered.' },
      { q: 'How do I specify the crop area?', a: 'Typically by dragging corners or entering specific dimensions/margins.' },
    ]
  },
  'edit-pdf': {
    instructions: 'Upload a PDF to edit text, images, and other content directly in your browser.',
    example: 'Correct typos, update information, or modify content without converting to another format.',
    faqs: [
      { q: 'Can I edit all PDFs?', a: 'Scanned PDFs (images) cannot be edited directly. Use OCR first to make them editable.' },
      { q: 'What can I edit?', a: 'You can typically edit text, add/remove images, and modify existing content.' },
      { q: 'Are changes permanent?', a: 'Changes are saved to a new PDF. Keep your original as a backup.' },
    ]
  },
  'unlock-pdf': {
    instructions: 'Upload a password-protected PDF and enter the password to remove restrictions and create an unlocked version.',
    example: 'Remove password protection from your own documents for easier access.',
    faqs: [
      { q: 'Can this crack PDF passwords?', a: 'No, you must know the correct password. This tool removes protection after verification.' },
      { q: 'What is the difference between open and permissions passwords?', a: 'Open passwords prevent viewing. Permissions passwords restrict editing/printing. This handles both.' },
      { q: 'Is this legal?', a: 'Only remove protection from PDFs you own or have permission to modify.' },
    ]
  },
  'protect-pdf': {
    instructions: 'Upload a PDF to add password protection and encryption for security and privacy.',
    example: 'Protect sensitive documents, financial records, or confidential information with encryption.',
    faqs: [
      { q: 'What types of passwords can I add?', a: 'You can add an open password (required to view) and/or permissions password (restricts editing/printing).' },
      { q: 'How secure is PDF encryption?', a: 'Modern PDF encryption (128-bit or 256-bit AES) is quite secure when using strong passwords.' },
      { q: 'Can I recover a forgotten password?', a: 'No, password recovery is not possible. Store your passwords securely.' },
    ]
  },
  'sign-pdf': {
    instructions: 'Upload a PDF to add your digital signature for authentication and verification.',
    example: 'Sign contracts, agreements, forms, or documents electronically without printing.',
    faqs: [
      { q: 'Is a digital signature legally binding?', a: 'In many jurisdictions, yes. Check local laws for specific requirements.' },
      { q: 'Can I draw my signature?', a: 'Yes, most tools allow drawing, typing, or uploading an image of your signature.' },
      { q: 'Can signatures be verified?', a: 'Digital signatures can include verification data to confirm authenticity.' },
    ]
  },
  'redact-pdf': {
    instructions: 'Upload a PDF to permanently remove sensitive information by redacting (blacking out) specific content.',
    example: 'Remove personal information, SSNs, confidential data, or classified information from documents.',
    faqs: [
      { q: 'Is redaction permanent?', a: 'Yes, properly redacted content is permanently removed and cannot be recovered.' },
      { q: 'What is the difference between redaction and highlighting?', a: 'Redaction permanently removes content. Highlighting only covers it temporarily (data still exists underneath).' },
      { q: 'Can I redact specific words?', a: 'Yes, you can select text, areas, or use search to find and redact specific content.' },
    ]
  },
  'compare-pdf': {
    instructions: 'Upload two PDF files to compare them side-by-side and identify differences.',
    example: 'Compare document versions, track changes, or verify document modifications.',
    faqs: [
      { q: 'What types of changes are detected?', a: 'Text changes, added/removed content, and formatting differences are typically highlighted.' },
      { q: 'Can I compare scanned documents?', a: 'Text-based comparison requires searchable PDFs. Scanned PDFs may need OCR first.' },
      { q: 'How are differences displayed?', a: 'Usually with color coding (red for removed, green for added) or side-by-side highlighting.' },
    ]
  }
};

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  
  if (!toolId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
        <Link to="/tools" className="text-primary-600 hover:text-primary-700">View all tools</Link>
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
        <Link to="/tools" className="text-primary-600 hover:text-primary-700">View all tools</Link>
      </div>
    );
  }

  const relatedTools = getRelatedTools(toolId);
  const category = categoryInfo[tool.category];

  const baseUrl = window.location.origin;
  const toolUrl = `${baseUrl}${tool.path}`;

  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${tool.category}` },
    { name: tool.name, url: tool.path }
  ];

  return (
    <>
      <SEO
        title={tool.metaTitle || `${tool.name} - Free Online Tool`}
        description={tool.metaDescription || tool.description}
        keywords={tool.keywords}
        canonicalUrl={toolUrl}
      />
      
      {/* Schema Markup */}
      <WebApplicationSchema
        name={tool.name}
        url={toolUrl}
        description={tool.description}
        featureList={[
          'Free to use',
          'No registration required',
          'Works offline',
          'Fast and secure'
        ]}
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {content.faqs && content.faqs.length > 0 && (
        <FAQSchema 
          questions={content.faqs.map(faq => ({
            question: faq.q,
            answer: faq.a
          }))}
        />
      )}

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm font-sans">
            <Link to="/" className="text-primary-600 hover:text-primary-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/category/${tool.category}`} className="text-primary-600 hover:text-primary-700">
              {category.name}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{tool.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-primary-600">
                <CategoryIcon iconName={category.icon} className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-heading font-bold text-gray-900">{tool.name}</h1>
            </div>
            <p className="text-xl font-sans text-gray-600">{tool.description}</p>
          </div>

          <Ad className="mb-8" />

          {/* Tool Component */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <ToolComponent />
          </div>

          <Ad className="mb-8" />

          {/* Instructions */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-gray-700 font-sans mb-4">{content.instructions}</p>
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Example</h3>
            <p className="text-gray-700 font-sans">{content.example}</p>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 font-sans">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <Ad className="mb-8" />

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Related Tools</h2>
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
