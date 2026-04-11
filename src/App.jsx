import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import InputSection from './components/InputSection';
import FormatSelector from './components/FormatSelector';
import AccountTypeSelector from './components/AccountTypeSelector';
import GenerateButton from './components/GenerateButton';
import OutputSection from './components/OutputSection';
import { fetchTranscript, generateTweets } from './utils/api';

function App() {
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' or 'text'
  const [videoUrl, setVideoUrl] = useState('');
  const [transcriptText, setTranscriptText] = useState('');
  const [outputFormat, setOutputFormat] = useState('single'); // 'single' or 'thread'
  const [accountType, setAccountType] = useState('free'); // 'free' or 'verified'
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [generatedTweets, setGeneratedTweets] = useState([]);

  const isInputValid = activeTab === 'youtube' ? videoUrl.trim() !== '' : transcriptText.trim() !== '';

  const handleGenerate = async () => {
    setError(null);
    setIsGenerating(true);
    setGeneratedTweets([]);

    try {
      let currentTranscript = transcriptText;

      if (activeTab === 'youtube') {
        // Fetch youtube transcript first
        currentTranscript = await fetchTranscript(videoUrl);
      }

      if (!currentTranscript || currentTranscript.trim() === '') {
        throw new Error('Transcript is empty. Please provide a valid URL with captions or paste text directly.');
      }

      // Generate tweets
      const tweets = await generateTweets(currentTranscript, outputFormat, accountType);
      setGeneratedTweets(tweets);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Header />
      
      <main>
        <InputSection 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          transcriptText={transcriptText}
          setTranscriptText={setTranscriptText}
        />

        <div className="options-container animate-in stagger-3">
          <FormatSelector 
            outputFormat={outputFormat} 
            setOutputFormat={setOutputFormat} 
          />
          <AccountTypeSelector 
            accountType={accountType} 
            setAccountType={setAccountType} 
          />
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <div className="animate-in stagger-3">
          <GenerateButton 
            isGenerating={isGenerating} 
            disabled={!isInputValid} 
            onClick={handleGenerate} 
          />
        </div>

        <OutputSection 
          tweets={generatedTweets} 
          format={outputFormat} 
          accountType={accountType}
        />
      </main>
    </>
  );
}

export default App;
