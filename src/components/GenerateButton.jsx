const GenerateButton = ({ isGenerating, disabled, onClick }) => {
  return (
    <button 
      className="generate-button" 
      disabled={disabled || isGenerating}
      onClick={onClick}
    >
      {isGenerating ? (
        <>
          <span className="spinner"></span>
          Crafting...
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
          Generate ThreadCraft
        </>
      )}
    </button>
  );
};

export default GenerateButton;
