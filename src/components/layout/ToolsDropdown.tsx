import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Palette, Calculator, Network, Lock, FileText } from 'lucide-react';

const tools = [
  {
    icon: Code2,
    title: 'Code Formatter',
    description: 'Format and beautify your code',
    path: '/tools/code-formatter',
    color: 'text-blue-400'
  },
  {
    icon: Palette,
    title: 'Color Picker',
    description: 'Pick and convert colors',
    path: '/tools/color-picker',
    color: 'text-purple-400'
  },
  {
    icon: Calculator,
    title: 'Unit Converter',
    description: 'Convert between units',
    path: '/tools/unit-converter',
    color: 'text-green-400'
  },
  {
    icon: Network,
    title: 'IP Lookup',
    description: 'Look up IP information',
    path: '/tools/ip-lookup',
    color: 'text-cyan-400'
  },
  {
    icon: Lock,
    title: 'Password Generator',
    description: 'Generate secure passwords',
    path: '/tools/password-generator',
    color: 'text-red-400'
  },
  {
    icon: FileText,
    title: 'Text Tools',
    description: 'Various text utilities',
    path: '/tools/text-tools',
    color: 'text-yellow-400'
  }
];

export default function ToolsDropdown() {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-lg bg-gray-900/95 backdrop-blur-sm border border-gray-800 shadow-xl z-50"
         style={{ width: '1000px', maxWidth: 'calc(100vw - 4rem)' }}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="flex items-start p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
              >
                <Icon className={`w-6 h-6 ${tool.color} mr-3 mt-1 group-hover:scale-110 transition-transform`} />
                <div>
                  <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}