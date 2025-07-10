import React, { useState, useCallback } from 'react';
import { Shield, Copy, RefreshCw, Check, Eye, EyeOff } from 'lucide-react';

interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function App() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const generatePassword = useCallback(() => {
    let charset = '';
    if (options.includeLowercase) charset += LOWERCASE;
    if (options.includeUppercase) charset += UPPERCASE;
    if (options.includeNumbers) charset += NUMBERS;
    if (options.includeSymbols) charset += SYMBOLS;

    if (charset === '') {
      setPassword('');
      return;
    }

    // Utilise crypto.getRandomValues pour une meilleure sécurité
    const array = new Uint32Array(options.length);
    crypto.getRandomValues(array);
    
    let result = '';
    for (let i = 0; i < options.length; i++) {
      result += charset[array[i] % charset.length];
    }
    
    setPassword(result);
    setCopied(false);
  }, [options]);

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Échec de la copie du mot de passe:', err);
      }
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: 'Aucun mot de passe', color: 'bg-gray-300' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { strength: score, label: 'Faible', color: 'bg-red-500' };
    if (score <= 4) return { strength: score, label: 'Moyen', color: 'bg-yellow-500' };
    return { strength: score, label: 'Fort', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength();

  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* En-tête */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">SecurePass</h1>
          <p className="text-gray-600">Générez des mots de passe forts et sécurisés</p>
        </div>

        {/* Affichage du mot de passe */}
        <div className="space-y-3">
          <div className="relative">
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 min-h-[60px]">
              <div className="flex-1 font-mono text-lg tracking-wide overflow-hidden">
                {password ? (
                  <span className={showPassword ? 'text-gray-800' : 'text-gray-400'}>
                    {showPassword ? password : '•'.repeat(password.length)}
                  </span>
                ) : (
                  <span className="text-gray-400">Configurez les options et générez</span>
                )}
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={!password}
                title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
                disabled={!password}
                title="Copier dans le presse-papiers"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Force du mot de passe */}
          {password && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Force du mot de passe</span>
                <span className={`text-sm font-bold ${
                  strength.label === 'Faible' ? 'text-red-500' :
                  strength.label === 'Moyen' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {strength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${strength.color}`}
                  style={{ width: `${(strength.strength / 6) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longueur du mot de passe : {options.length}
            </label>
            <input
              type="range"
              min="8"
              max="20"
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8</span>
              <span>20</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Inclure les caractères</h3>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Lettres minuscules (a-z)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Lettres majuscules (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Chiffres (0-9)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Symboles (!@#$%^&*)</span>
            </label>
          </div>
        </div>

        {/* Bouton de génération */}
        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!options.includeLowercase && !options.includeUppercase && !options.includeNumbers && !options.includeSymbols}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Générer un nouveau mot de passe</span>
        </button>

        {/* Pied de page */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
          <p>Les mots de passe sont générés localement dans votre navigateur</p>
          <p>Aucune donnée n'est envoyée vers des serveurs externes</p>
          <p>Codé par thomasvcnh45</p>
        </div>
      </div>
    </div>
  );
}

export default App;